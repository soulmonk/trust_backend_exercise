'use strict'

module.exports = function (fastify, opts, next) {
  fastify.get('/status', async () => {
    return { status: 'ok' }
  })

  next()
}
