'use strict'

async function eventsService (fastify, opts) {
  fastify.get('/', {
    handler: onEvent
  })

  async function onEvent (req, repl) {
    return { status: 'ok' }
  }
}

eventsService.autoPrefix = '/event'

module.exports = eventsService
