import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let databaseInstance = null

const mongoclientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    depracationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongoclientInstance.connect()
  databaseInstance = mongoclientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!databaseInstance) {
    throw new Error('Must connect to database first!')
  }
  return databaseInstance
}

export const DISCONNECT_DB = async () => {
  await mongoclientInstance.close()
}
