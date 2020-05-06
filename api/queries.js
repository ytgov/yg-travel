const Pool = require('pg').Pool
const nodemailer = require('nodemailer');
const pool = new Pool({
  user: 'postgres',
  host: 'dbpostgres',
  database: 'travel',
  password: 'itsallgood',
  port: 5432,
})

const getCommunities = (request, response) => {
  pool.query('SELECT * FROM communities', (error, results) => {
    if (error) {
      console.log(error)
    }
    response.status(200).json(results.rows)
  })
}

const getCommunityGroups = (request, response) => {
  pool.query('SELECT * FROM communitygroups', (error, results) => {
    if (error) {
      console.log(error)
    }
    response.status(200).json(results.rows)
  })
}

const getNotices = (request, response) => {
  pool.query('SELECT * FROM travelnotices', (error, results) => {
    if (error) {
      console.log(error)
    }
    response.status(200).json(results.rows)
  })
}

const getNotice = (request, response) => {
  pool.query('SELECT * FROM "travelNotices" where code=\''+request.params.code+'\'', (error, results) => {
    if (error) {
      console.log(error)
    }
    response.status(200).json(results.rows)
  })
}


const createNotice = (request, response) => {
  const { name, email, phone, destination, department, purpose, travellers, arrivalDate, returnDate, requireAssistance, contactedCommunity, code } = request.body
  console.log(request.body)
  pool.query(
    'insert into "travelNotices" (name, email, phone, destination, purpose, travellers, "returnDate", "arrivalDate", "requireAssistance", "contactedCommunity", code, department) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
    [name, email, phone, destination, purpose, travellers, returnDate, arrivalDate, requireAssistance, contactedCommunity, code, department],
    (error, results) => {
    if (error) {
      console.log(error)
    }
    response.status(200).send(`Created notice`)
  })
}

module.exports = {
  getCommunities,
  getCommunityGroups,
  createNotice,
  getNotices,
  getNotice
}
