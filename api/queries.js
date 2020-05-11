var environment = process.env.NODE_ENV || 'staging';
var config = require('./config/knexfile.js')[environment];
const knex = require('knex')(config)

exports.getCommunities = function(req, res) {
  knex('communities')
  .select('name')
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.status(404).send('Not found');
    console.log(e);
  })
}
exports.getCommunityGroups = function(req, res) {
  knex('communitygroups')
  .select('name')
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.status(404).send('Not found');
    console.log(e);
  })
}

exports.getDepartments = function(req, res) {
  knex('departments')
  .select('name')
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.status(404).send('Not found');
    console.log(e);
  })
}

exports.getNotices = function(req, res) {
  knex('travelnotices')
  .select('*')
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.status(404).send('Not found');
    console.log(e);
  })
}

exports.getReports = function(req, res) {
  knex('travelnotices')
  .select('*')
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.status(404).send('Not found');
    console.log(e);
  })
}

exports.getCommunityGroups = function(req, res) {
  knex('communitygroups')
  .select('name')
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.status(404).send('Not found');
    console.log(e);
  })
}

exports.getNotice = function(req, res) {
  knex('travelNotices')
  .select('*')
  .where('code','=',req.params.code)
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.status(404).send('Not found');
    console.log(e);
  })
}

exports.createNotice = function(req, res) {
  knex('travelNotices').insert(req.body)
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.status(404).send('Not found');
    console.log(e);
  })
}

exports.updateNotice = function(req, res) {
  knex('travelNotices').update(request.body)
  .where('code','=',request.body.code)
  .then(sqlResults => res.send(sqlResults))
  .catch(function(e){
    res.status(404).send('Not found');
    console.log(e);
  })
}

// const getWhitehorse = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Whitehorse\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getCarmacks = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Carmacks\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getDawsonCity = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Dawson City\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getBeaverCreek = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Beaver Creek\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getBurwashLanding = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Burwash Landing\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getTagish = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Tagish\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getCarcross = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Carcross\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getFaro = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Faro\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getHainesJunction = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Haines Junction\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getMayo = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Mayo\\', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getMounteLourne = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Mounte Lourne\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getOldCrow = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Old Crow\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getPellyCrossing = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Pelly Crossing\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getRossRiver = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Ross River\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getTeslin = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Teslin\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const getWatsonLake = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where destination=\'Watson Lake\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
//
// const getNotice = (request, response) => {
//   pool.query('SELECT * FROM travelnotices where code=\''+request.params.code+'\'', (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).json(results.rows)
//   })
// }
//
// const createNotice = (request, response) => {
//   const { name, email, phone, destination, department, purpose, travellers, arrivalDate, returnDate, requireAssistance, mucontact, fncontact, othercontact, otherContactInfo, code } = request.body
//   pool.query(
//     'insert into travelnotices (name, email, phone, destination, purpose, travellers, returndate, arrivaldate, requireassistance, code, department, muContact, fnContact, otherContact, otherContactInfo) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
//     [name, email, phone, destination, purpose, travellers, returnDate, arrivalDate, requireAssistance, code, department, mucontact, fncontact, othercontact, otherContactInfo],
//     (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).send(`Created notice`)
//   })
// }
//
// const updateNotice = (request, response) => {
//   const { name, email, phone, destination, department, purpose, travellers, arrivalDate, returnDate, requireAssistance, mucontact, fncontact, othercontact, otherContactInfo, code } = request.body
//   pool.query(
//     'update travelnotices  set (name, email, phone, destination, purpose, travellers, returndate, arrivaldate, requireassistance, department, mucontact, fnContact, otherContact, otherContactInfo) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) where code=\''+request.params.code+'\'',
//     [name, email, phone, destination, purpose, travellers, returnDate, arrivalDate, requireAssistance, department, mucontact, fncontact, othercontact, otherContactInfo],
//     (error, results) => {
//     if (error) {
//       console.log(error)
//     }
//     response.status(200).send(`Created notice`)
//   })
// }
