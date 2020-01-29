'use strict'

const fp = require('fastify-plugin')

const PageViewsRepository = require('../repositories/page-views')

async function pageViewsRepositoryPlugin (fastify, opts) {
  fastify.decorate('pageViewsRepository', {})

  fastify.pageViewsRepository = new PageViewsRepository(fastify.pg)
}

module.exports = fp(pageViewsRepositoryPlugin, {
  dependencies: ['fastifyPostgres']
})
