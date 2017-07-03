import promise from 'bluebird'
import pg from 'pg-promise'

export default function initDB (options) {
  const {environment, config} = options

  const pgOptions = {
    promiseLib: promise
  }

  const pgp = pg(pgOptions)
  const connectionString = config.postgresURI[environment]
  const init = pgp(connectionString)
  const databaseName = connectionString.split('/')

  if (environment === 'development') {
    console.log('Connected to database: ' + databaseName[databaseName.length - 1])
  }

  return init
}
