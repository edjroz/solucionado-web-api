import * as app from '../src'
import MongoInMemory from 'mongo-in-memory'

const ctx = {}
const dbName = 'test-solucionado'

export const beforeEach = async () => {
  // Start up db instance and http service
  const mongod = new MongoInMemory()
  const dbUri = mongod.getMongouri(dbName)

  ctx.mongod = mongod
  ctx.dbConnection = await app.CreateDbConnection({ uri: dbUri, dbName })
  ctx.services = await app.CreateServices(ctx.dbConnection)
  ctx.httpServer = await app.RunHttpService({
    port: 0, // Use port 0 to get any available port
    services: ctx.services
  })
}

export const afterEach = async () => {
  // Close db instance and http service
  ctx.mongod.stop()
  await app.shutdown()
}
