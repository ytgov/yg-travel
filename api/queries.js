const Pool = require('pg').Pool
const nodemailer = require('nodemailer');
const pool = new Pool({
  user: 'postgres',
  host: 'dbpostgres',
  database: 'postgres',
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

const getDepartments = (request, response) => {
  pool.query('SELECT * FROM departments', (error, results) => {
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
  pool.query('SELECT * FROM travelnotices where code=\''+request.params.code+'\'', (error, results) => {
    if (error) {
      console.log(error)
    }
    response.status(200).json(results.rows)
  })
}

const createNotice = (request, response) => {
  const { name, email, phone, destination, department, purpose, travellers, arrivalDate, returnDate, requireAssistance, contactedFN, contactedMuni, contactedOther, otherContact, code } = request.body
  pool.query(
    'insert into travelnotices (name, email, phone, destination, purpose, travellers, returndate, arrivaldate, requireassistance, code, department, fnContact, muContact, otherContact, otherContactInfo) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
    [name, email, phone, destination, purpose, travellers, returnDate, arrivalDate, requireAssistance, code, department, contactedFN, contactedMuni, contactedOther, otherContact],
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
  getDepartments,
  createNotice,
  getNotices,
  getNotice
}
