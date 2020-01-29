'use strict'

const schema = require('../schemas/event')

async function eventService (fastify, opts) {
  fastify.get('/', {
    handler: onEvent,
    schema: schema.event
  })

  async function onEvent (req, repl) {
    await this.pageViewsRepository.addEvent(req.userInfo, req.query)

    return { status: 'ok' }
  }
}

eventService.autoPrefix = '/event'

module.exports = eventService
