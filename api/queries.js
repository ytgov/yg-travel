var environment = process.env.NODE_ENV || 'staging';
var config = require('./config/knexfile.js')[environment];
const knex = require('knex')(config)

exports.getCommunities = function(req, res) {
  knex('communities')
  .select('name')
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.sendStatus(404).send('Not found');
    console.log(e);
  })
}
exports.getCommunityGroups = function(req, res) {
  knex('communityGroups')
  .select('name')
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.sendStatus(404).send('Not found');
    console.log(e);
  })
}

exports.getDepartments = function(req, res) {
  knex('departments')
  .select('name')
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.sendStatus(404).send('Not found');
    console.log(e);
  })
}

exports.getNotices = function(req, res) {
  knex('travelNotices')
  .select('*')
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.sendStatus(404).send('Not found');
    console.log(e);
  })
}

exports.getReports = function(req, res) {
  knex('travelNotices')
  .select('*')
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.sendStatus(404).send('Not found');
    console.log(e);
  })
}

exports.getNotice = function(req, res) {
  knex('travelNotices')
  .select('*')
  .where('code','=',req.params.code)
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.sendStatus(404).send('Not found');
    console.log(e);
  })
}

exports.getReport = function(req, res){
  knex('travelNotices')
  .select('*')
  .where('destination','=',req.params.community.replace('-', ' ').toProperCase())
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.sendStatus(404).send('Not found');
    console.log(e);
  })
}

exports.createNotice = function(req, res) {
  knex('travelNotices').
  insert(req.body)
  .then(sqlResults => {
    res.send(sqlResults)
    console.log(sqlResults)
  })
  .catch(function(e){
    res.sendStatus(404).send('Not found');
    console.log(e);
  })
}

exports.updateNotice = function(req, res) {
  knex('travelNotices')
  .where('code','=',req.body.code)
  .update(req.body)
  .returning('*')
  .then(sqlResults =>res.send(sqlResults))
  .catch(function(e){
    res.sendStatus(404).send('Not found');
    console.log(e);
  })
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
