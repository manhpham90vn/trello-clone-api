import exitHook from 'async-exit-hook'

import express from 'express'
import { env } from '~/config/environment'
import { CONNECT_DB, DISCONNECT_DB } from '~/config/mongodb'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

  exitHook(() => {
    // eslint-disable-next-line no-console
    console.log('Disconnecting from database server...')
    DISCONNECT_DB()
  })
}

;(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('Connecting to database server...')
    CONNECT_DB()
    // eslint-disable-next-line no-console
    console.log('Connected successfully to database server')
    START_SERVER()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    process.exit(1)
  }
})()
