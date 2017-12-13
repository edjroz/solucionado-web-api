/**
 * Require module dependencies
 */
import * as http from 'http'
import { MongoClient } from 'mongodb'
import debug from 'debug'

import * as config from './config'
import api from './api'

// Require services

import createSolutionsService from './core/services/solutions'

// Require repositories

import createSolutionsRepository from './adapters/repository/solutions'

let dbConnection, services = {}, httpServer

// Create db connection

export const CreateDbConnection = async (dbUri) => {
  if (!dbUri) {
    throw new Error('Invalid mongo connection uri')
  }
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUri, (err, connection) => {
      if (err) {
        return reject(err)
      }
      debug('app:log')('Database ready')
      dbConnection = connection
      return resolve(connection)
    })
  })
}

// Instantiate core services

export const CreateServices = async (db) => {
  services.solutions = createSolutionsService(createSolutionsRepository(db))
  return services
}

// Create an instance of http API.

export const RunHttpService = async (options) => {
  if (!options.port && (process.env.NODE_ENV === 'test' && options.port !== 0)) {
    throw new Error('The server must be started with an available port.')
  }
  if (!options.services) {
    throw new Error('The server must be started with a valid core services')
  }
  httpServer = http.createServer(api(services))
  httpServer.listen(options.port)
  return await (new Promise((resolve, reject) => {
    httpServer.on('error', reject)
    httpServer.on('listening', () => { 
      debug('app:log')(`Http service running on port: ${httpServer.address().port}`)
      resolve(httpServer)
    })
  }))
}

// Graceful shutdown.

const shutdown = async () => {
  const date = new Date();
  debug('app:info')('\nOh, good bye!, starting graceful shutdown')

  if (dbConnection) {
    dbConnection.close()
  }

  if (httpServer) {
    await (new Promise(resolve => {
      httpServer.close(() => resolve())
    }));
  }
  
  debug('app:info')(`Graceful shutdown ends [${ Date.now() - date.getTime()}ms]`)
  
  return Promise.resolve();
};

if (process.env.NODE_ENV !== 'test') {
  CreateDbConnection(config.db.uri)
  .then(CreateServices)
  .then(services => RunHttpService({
    port: config.http.port,
    services
  }))
  .then(() => {
    debug('app:log')('Application Boot ready')
  })
  .catch(err => {
    debug('app:error')('Error booting application', err)
  })

  process.on('SIGTERM', () => shutdown().then(() => process.exit(0)))
  process.on('SIGINT', () => shutdown().then(() => process.exit(0)))
}
