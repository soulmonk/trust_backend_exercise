'use strict'

const fp = require('fastify-plugin')
const postgres = require('fastify-postgres')

async function fastifyPostgres (fastify, opts) {
  fastify.register(postgres, opts.db)
}

module.exports = fp(fastifyPostgres)
