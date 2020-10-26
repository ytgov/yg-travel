process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const environment = process.env.NODE_ENV || 'staging'
const config = require('./config/knexfile.js')[environment]
const knex = require('knex')(config)
const mail = require('./emailer')

exports.getCommunities = function(req, res) {
  knex('communities')
  .select('name')
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.getCommunityGroups = function(req, res) {
  knex('communityGroups')
  .select('name')
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.getDepartments = function(req, res) {
  knex('departments')
  .select('name')
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.createNotice = function(req, res) {
  const destinationArray = req.body.destination
  req.body.destination = toArrayString(req.body.destination)
  knex('travelNotices')
  .insert(req.body)
  .then(sqlResults => {
    emailCommunitiesImmediate(destinationArray, req.body, true)
    emailDepartmentImmediate(req.body.department, req.body, true)
    mail.sendSuccessfulSubmit(req.body.email, req.body.code)
    res.send(sqlResults)
  })
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.updateNotice = function(req, res) {
  const destinationArray = req.body.destination
  req.body.destination = toArrayString(req.body.destination)
  knex('travelNotices')
  .where('code','=',req.body.code)
  .update(req.body)
  .returning('*')
  .then(sqlResults => {
    emailCommunitiesImmediate(destinationArray, req.body, false)
    emailDepartmentImmediate(req.body.department, req.body, false)
    mail.sendSuccessfulUpdate(req.body.email, req.body.code)
    res.send(sqlResults)
  })
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.deleteNotice = function(req, res) {
  knex('travelNotices')
  .where('id','=',req.body.id)
  .del()
  .returning('*')
  .then(sqlResults =>res.send(sqlResults))
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.flagNotice = function(req, res) {
  knex('travelNotices')
  .where('id','=',req.body.id)
  .update({
    requireAssistance: req.body.requireAssistance,
  })
  .returning('*')
  .then(sqlResults =>res.send(sqlResults))
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.getNotice = function(req, res) {
  knex('travelNotices')
  .select('*')
  .where('code','=',req.params.code)
  .then(sqlResults => {
    sqlResults.map(result => {return parseDestination(result)})
    res.send(sqlResults)
  })
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.getNotices = function(req, res) {
  knex('travelNotices')
  .select('*')
  .then(sqlResults => {
    sqlResults.map(result => {return parseDestination(result)})
    res.send(sqlResults)
  })
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.getNoticesByCommunity = function(req, res){
  knex('travelNotices')
  .select('*')
  .whereRaw('replace(replace(replace(replace(lower(destination), \'\'\'\', \'\'), \',\', \'\'), \' \', \'-\'), \'&\', \'and\') like ?', ['%"'+req.params.community.toLowerCase()+'"%'])
  .then(sqlResults => {
    sqlResults.map(result => {return parseDestination(result)})
    res.send(sqlResults)
  })
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.getNoticesByDepartment = function(req, res){
  knex('travelNotices')
  .select('*')
  .whereRaw('replace(replace(replace(replace(lower(department), \'\'\'\', \'\'), \',\', \'\'), \' \', \'-\'), \'&\', \'and\') like ?', [req.params.department.toLowerCase()])
  .then(sqlResults => {
    sqlResults.map(result => {return parseDestination(result)})
    res.send(sqlResults)
  })
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.getEmails = function(req, res){
  knex('emails')
  .select('*')
  .then(sqlResults => {res.send(sqlResults)})
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.getEmailsByCommunity = function(req, res){
  knex('emails')
  .select('*')
  .whereRaw('replace(replace(replace(replace(lower(value), \'\'\'\', \'\'), \',\', \'\'), \' \', \'-\'), \'&\', \'and\') like ?', [req.params.community.toLowerCase()])
  .then(sqlResults => {res.send(sqlResults)})
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')

  })
}

exports.getEmailsByDepartment = function(req, res){
  knex('emails')
  .select('*')
  .whereRaw('replace(replace(replace(replace(lower(value), \'\'\'\', \'\'), \',\', \'\'), \' \', \'-\'), \'&\', \'and\') like ?', [req.params.department.toLowerCase()])
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.createEmail = function(req, res){
  knex('emails')
  .insert(req.body)
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.updateEmail = function(req, res){
  knex('emails')
  .where('email','=',req.body.email)
  .update(req.body)
  .returning('*')
  .then(sqlResults =>res.send(sqlResults))
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')

  })
}

exports.deleteEmail = function(req, res){
  knex('emails')
  .where('id','=',req.body.id)
  .del()
  .returning('*')
  .then(sqlResults =>res.send(sqlResults))
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

function emailCommunitiesImmediate(destinationArray, form, newNotice){
  destinationArray.forEach(destination => {
    knex('emails')
    .select('email')
    .where('value', '=', destination)
    .andWhere(function() {
      this.where('frequency', '=', 'Immediately').orWhere('frequency', '=', 'Both')
    })
    .then(sqlResults => {
      sqlResults.forEach( email => {
        if(newNotice) mail.sendEmail(email.email, 'A travel notice for your community has been created', mail.createSingleReportForEmail(form))
        else mail.sendEmail(email.email, 'A travel notice for your community has been updated', mail.createSingleReportForEmail(form))
      })
    })
    .catch(function(e){
      console.log(e)
    })
  })
}

function emailDepartmentImmediate(department, form, newNotice){
  knex('emails')
  .select('email')
  .where('value', '=', department)
  .andWhere(function() {
    this.where('frequency', '=', 'Immediately').orWhere('frequency', '=', 'Both')
  })
  .then(sqlResults => {
    sqlResults.forEach( email => {
      if(newNotice) mail.sendEmail(email.email, 'A travel notice for your department has been created', mail.createSingleReportForEmail(form))
      else mail.sendEmail(email.email, 'A travel notice for your department has been updated', mail.createSingleReportForEmail(form))
    })
  })
  .catch(function(e){
    console.log(e)
  })
}

function toArrayString(arr) {
  //this is really stupid, but it's because knex converts an array to an object and then puts that as a string in the db,
  //which can't be parsed, so I'm just beeting it to it.
  var result = '['
  arr.forEach(slice => {
    result += '"'+slice+'",'
  })
  result = result.slice(0, -1)+"]"
  if( result == ']' ) result = '[]'
  return result
}

function parseDestination(form) {
  form.destination = JSON.parse(form.destination)
  return form
}
