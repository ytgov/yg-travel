module.exports = {
  staging: {
    client: 'postgresql',
    connection: {
      host : 'dbpostgres',
      user : 'postgres',
      password : 'itsallgood',
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
