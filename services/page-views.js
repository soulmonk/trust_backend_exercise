'use strict'

async function pageViewsService (fastify, opts) {
  fastify.get('/', {
    handler: onFind,
    // schema: schemas.history,
    onRequest: fastify.authenticate
  })

  async function onFind (req, repl) {
    return { ok: true }
  }
}

pageViewsService.autoPrefix = '/page-views'

module.exports = pageViewsService
