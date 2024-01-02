const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.DATABASE_NAME

import { MongoClient, ServerApiVersion } from 'mongodb'

let databaseInstance = null

const mongoclientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    depracationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongoclientInstance.connect()
  databaseInstance = mongoclientInstance.db(MONGODB_DB)
}

export const GET_DB = () => {
  if (!databaseInstance) {
    throw new Error('Must connect to database first!')
  }
  return databaseInstance
}
