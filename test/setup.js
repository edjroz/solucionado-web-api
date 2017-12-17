import * as app from '../src'
import MongoInMemory from 'mongo-in-memory'

const dbName = 'test-solucionado'

export const beforeEach = async function () {
  // Start up db instance and http service
  const mongod = new MongoInMemory()
  const dbUri = mongod.getMongouri(dbName)

  this.mongod = mongod
  this.dbConnection = await app.CreateDbConnection({ uri: dbUri, dbName })
  this.services = await app.CreateServices(this.dbConnection)
  this.httpServer = await app.RunHttpService({
    port: 0, // Use port 0 to get any available port
    services: this.services
  })
}

export const afterEach = async function () {
  // Close db instance and http service
  this.mongod.stop()
  await app.shutdown()
}
