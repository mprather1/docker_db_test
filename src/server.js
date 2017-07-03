import config from './_config'
import express from 'express'
import bodyParser from 'body-parser'
import httpervert from 'httpervert'
import helmet from 'helmet'
import morgan from 'morgan'
import winston from 'winston-color'
import getRouter from './routes'
import {init} from './queries'

const options = {
  app: express(),
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  logger: winston,
  config: config
}

options.db = init(options)
const { app, environment } = options

app.use(helmet())

const server = httpervert(options)
const router = getRouter(options)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

if (environment !== 'test') {
  app.use(morgan('dev'))
}

app.use('/api', router)

const serverConfig = {
  server: server,
  options: options
}

export default serverConfig
