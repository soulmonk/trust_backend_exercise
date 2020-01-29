'use strict'

const schemas = require('../schemas/page-views')

async function pageViewsService (fastify, opts) {
  fastify.addHook('onRequest', fastify.authenticate)

  fastify.get('/', {
    handler: onFind,
    schema: schemas.find
  })

  async function onFind (req, repl) {
    return { data: [] }
  }
}

pageViewsService.autoPrefix = '/page-views'

module.exports = pageViewsService
