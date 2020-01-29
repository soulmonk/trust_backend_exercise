'use strict'

const fp = require('fastify-plugin')
const bearerAuthPlugin = require('fastify-bearer-auth').internals.factory

const keys = new Set(['6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu'])

async function authPlugin (fastify, opts) {
  fastify.decorate('authenticate', bearerAuthPlugin({ keys }))
}

module.exports = fp(authPlugin)
