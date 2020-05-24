require('dotenv').config()

module.exports = {
  staging: {
    client: 'postgresql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
