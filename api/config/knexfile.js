require('dotenv').config()

module.exports = {
  staging: {
    client: 'postgresql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
    },
    connectionTimeout: 20000,
    pool: {
      min: 10,
      max: 50
    }
  }
}
