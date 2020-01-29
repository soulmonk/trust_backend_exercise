'use strict'

// This file contains code that we reuse
// between our tests.

const Fastify = require('fastify')
const fp = require('fastify-plugin')
const App = require('../app')

// Fill in this config with all the configurations
// needed for testing the application
function config () {
  return {
    db: {
      connectionString: 'postgres://localhost/trust_backend_exercise',
      user: 'test',
      password: 'toor-test'
    }
  }
}

// automatically build and tear down our instance
async function build (t, opts) {
  const app = Fastify()

  if (!opts) {
    opts = config()
  }

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  app.register(fp(App), opts)

  // tear down our app after we are done
  t.tearDown(app.close.bind(app))

  await app.ready()

  return app
}

async function countOfEvents (app) {
  const countQuery = 'SELECT count(1) as count FROM "event"'

  const { rows: [{ count }] } = await app.pg.query(countQuery)

  return +count
}

module.exports = {
  config,
  build,
  countOfEvents
}
