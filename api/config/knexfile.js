require('dotenv').config()

module.exports = {
  staging: {
    client: 'postgresql',
    connection: {
      host : process.env.DB_HOST,
      user : 'postgres',
      password : 'itsallgood',
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
