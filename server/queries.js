const Pool = require('pg').Pool
const nodemailer = require('nodemailer');
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

const getNotice = (request, response) => {
  pool.query('SELECT * FROM travel."travelNotices" where code=\''+request.params.code+'\'', (error, results) => {
    if (error) {
      console.log(error)
    }
    response.status(200).json(results.rows)
  })
}


const createNotice = (request, response) => {
  const { name, email, phone, destination, purpose, travellers, arrivalDate, returnDate, requireAssistance, contactedCommunity, code } = request.body
  console.log(request.body)
  pool.query(
    'insert into travel."travelNotices" (name, email, phone, destination, purpose, travellers, "returnDate", "arrivalDate", "requireAssistance", "contactedCommunity", code) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
    [name, email, phone, destination, purpose, travellers, returnDate, arrivalDate, requireAssistance, contactedCommunity, code],
    (error, results) => {
    if (error) {
      console.log(error)
    }
    response.status(200).send(`Created notice`)
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'maxparkeremailer@gmail.com',
        pass: 'ygemailer'
      }
    });

    var mailOptions = {
      from: 'maxparkeremailer@gmail.com',
      to: email,
      subject: 'Your travel notice has been created',
      text: 'To update your travel plans visit '+code
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  })
}

module.exports = {
  getCommunities,
  getCommunityGroups,
  createNotice,
  getNotices,
  getNotice
}
