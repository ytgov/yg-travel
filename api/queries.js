var environment = process.env.NODE_ENV || 'staging'
var config = require('./config/knexfile.js')[environment]
const knex = require('knex')(config)

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
  req.body.destination = toArrayString(req.body.destination)
  knex('travelNotices')
  .insert(req.body)
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    console.log(e)
    res.sendStatus(404).send('Not found')
  })
}

exports.updateNotice = function(req, res) {
  req.body.destination = toArrayString(req.body.destination)
  knex('travelNotices')
  .where('code','=',req.body.code)
  .update(req.body)
  .returning('*')
  .then(sqlResults =>res.send(sqlResults))
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
  .whereRaw('replace(replace(replace(replace(lower(department), \'\'\'\', \'\'), \',\', \'\'), \' \', \'-\'), \'&\', \'and\') like ?', ['%'+req.params.department.toLowerCase()+'%'])
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
    res.sendStatus(404).send('Not found')
    console.log(e)
  })
}

exports.getEmailsByCommunity = function(req, res){
  knex('emails')
  .select('*')
  .whereRaw('replace(replace(replace(replace(lower(community), \'\'\'\', \'\'), \',\', \'\'), \' \', \'-\'), \'&\', \'and\') like ?', [req.params.community.toLowerCase()])
  .then(sqlResults => {res.send(sqlResults)})
  .catch(function(e){
    res.sendStatus(404).send('Not found')
    console.log(e)
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
    res.sendStatus(404).send('Not found')
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
  return result
}

function parseDestination(form) {
  form.destination = JSON.parse(form.destination)
  return form
}
