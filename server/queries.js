const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'travel',
  password: 'itsallgood',
  port: 5432,
})

const getCommunities = (request, response) => {
  pool.query('SELECT * FROM travel."communities"', (error, results) => {
    if (error) {
      console.log(error)
    }
    response.status(200).json(results.rows)
  })
}

const getCommunityGroups = (request, response) => {
  pool.query('SELECT * FROM travel."communityGroups"', (error, results) => {
    if (error) {
      console.log(error)
    }
    response.status(200).json(results.rows)
  })
}

const getNotices = (request, response) => {
  pool.query('SELECT * FROM travel."travelNotices"', (error, results) => {
    if (error) {
      console.log(error)
    }
    response.status(200).json(results.rows)
  })
}

const createNotice = (request, response) => {
  const { name, email, phone, destination, purpose, travellers, arrivalDate, returnDate, requireAssistance, contactedCommunity } = request.body
  pool.query(
    'insert into travel."travelNotices" (name, email, phone, destination, purpose, travellers, "returnDate", "arrivalDate", "requireAssistance", "contactedCommunity") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
    [name, email, phone, destination, purpose, travellers, returnDate, arrivalDate, requireAssistance, contactedCommunity],
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
  getNotices
}
