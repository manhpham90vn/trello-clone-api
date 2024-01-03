/* eslint-disable no-console */
import exitHook from 'async-exit-hook'
import express from 'express'

import { env } from '~/config/environment'
import { CONNECT_DB, DISCONNECT_DB } from '~/config/mongodb'
import { APIs_V1 } from '~/routes/v1'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Server running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

  exitHook(() => {
    console.log('Disconnecting from database server...')
    DISCONNECT_DB()
  })
}

;(async () => {
  try {
    console.log('Connecting to database server...')
    CONNECT_DB()
    console.log('Connected successfully to database server')
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
