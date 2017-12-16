import test from 'ava'

import {RunHttpService} from '../../src/'

process.env.NODE_ENV = 'test'

const suite = (msg, t) => {
  test(`Api Service ${msg}`, t)
}

suite('should require a port to start', async t => {
  try {
    await RunHttpService({
      services: {}
    })
    t.fail()
  } catch (err) {
    t.true(/port/.test(err.message))
    t.pass()
  }
})

suite('should require a valid core services to start', async t => {
  try {
    await RunHttpService({
      port: 5001
    })
    t.fail()
  } catch (err) {
    t.true(/services/.test(err.message))
    t.pass()
  }
})

suite('should start up the http service', async t => {
  const server = await RunHttpService({
    port: 0,
    services: {}
  })
  server.close()
})
