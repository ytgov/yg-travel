process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

var environment = process.env.NODE_ENV || 'staging'
var config = require('./config/knexfile.js')[environment]
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
    console.log(destinationArray)
    //emailCommunitiesImmediate(destinationArray, req.body)
    mail.sendSuccessfulSubmit('maxrparker@gmail.com', req.body.code)
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
    console.log(destinationArray)
    //emailCommunitiesImmediate(destinationArray, req.body)
    mail.sendSuccessfulUpdate('maxrparker@gmail.com', req.body.code)
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

// exports.getPastWeekNoticesByCommunity = function(email){
//   knex('travelNotices')
//   .select('*')
//   .whereRaw('replace(replace(replace(replace(lower(destination), \'\'\'\', \'\'), \',\', \'\'), \' \', \'-\'), \'&\', \'and\') like ? and current_date - INTERVAL \'1 week\' <= "noticeCreated" OR current_date - INTERVAL \'1 week\' <= "noticeUpdated"', ['%"'+email.value.toLowerCase()+'"%'])
//   .then(sqlResults => {
//     sqlResults.map(result => {return parseDestination(result)})
//     return sqlResults
//   })
//   .catch(function(e){
//     console.log(e)
//     return null
//   })
// }

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

// exports.getPastWeekNoticesByDepartment = function(email){
//   knex('travelNotices')
//   .select('*')
//   .whereRaw('replace(replace(replace(replace(lower(department), \'\'\'\', \'\'), \',\', \'\'), \' \', \'-\'), \'&\', \'and\') like ? and current_date - INTERVAL \'1 week\' <= "noticeCreated" OR current_date - INTERVAL \'1 week\' <= "noticeUpdated"', [email.value.toLowerCase()])
//   .then(sqlResults => {
//     sqlResults.map(result => {return parseDestination(result)})
//     return sqlResults
//   })
//   .catch(function(e){
//     console.log(e)
//     return null
//   })
// }

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

function emailCommunitiesImmediate(destinationArray, form){
  var emails = []
  destinationArray.forEach(destination => {
    knex('emails')
    .select('email')
    .where('community', '=', destination)
    .then(sqlResults => {
      sqlResults.forEach( email => {
        mail.sendSingleReport(email.email, form)
      })
    })
    .catch(function(e){
      console.log(e)
      res.sendStatus(404).send('Not found')
    })
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
  return result
}

function parseDestination(form) {
  form.destination = JSON.parse(form.destination)
  return form
}
