import promise from 'bluebird'
import pg from 'pg-promise'

export default function initDB (options) {
  const pgOptions = {
    promiseLib: promise
  }

  const pgp = pg(pgOptions)
  // const connectionString = config.postgresURI[environment]
  const init = pgp({
    host: process.env['DB_HOST'],
    port: process.env['DB_PORT'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DATABASE']

  })
  // const databaseName = connectionString.split('/')

  // if (environment === 'development') {
    // console.log('Connected to database: ' + databaseName[databaseName.length - 1])
  // }

  return init
}
