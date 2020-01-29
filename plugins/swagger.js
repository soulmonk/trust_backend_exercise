'use strict'

const fp = require('fastify-plugin')

async function fastifySwagger (fastify, opts) {
  fastify.register(require('fastify-swagger'), {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'REST API documentation',
        description: 'REST API documentation via swagger api',
        version: '0.1.0'
      },
      host: 'localhost:51234',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  })
}

module.exports = fp(fastifySwagger)
