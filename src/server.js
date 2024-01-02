import express from 'express'
import { CONNECT_DB, GET_DB } from './config/mongodb'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 3000

  app.get('/', async (req, res) => {
    // eslint-disable-next-line no-console
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://${hostname}:${port}/`)
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
