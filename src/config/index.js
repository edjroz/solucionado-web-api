/**
 * Require module dependencies.
 */

import fs from 'fs'
import * as dotenv from 'dotenv'

/**
 * Export configuration.
 */

if (fs.existsSync('.env')) {
  dotenv.load();
}

export const app = {
  apiKey: process.env.API_KEY || 'testKey',
  apiSecret: process.env.API_SECRET || 'testSecret'
}

export const db = {
  uri: process.env.MONGO_URI || 'mongodb://127.0.0.1',
  dbName: process.env.MONGO_DB_NAME || 'solucionado'
}

export const http = {
  port: process.env.PORT || process.env.NODE_PORT || 3000
}

export const notification = {
  serverKey: process.env.FCM_SERVER_KEY_PATH || './fcm-server-key.json'
}
