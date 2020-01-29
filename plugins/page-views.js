'use strict'

const fp = require('fastify-plugin')

const PageViewsRepository = require('../repositories/page-views')

async function pageViewsRepository (fastify, opts) {
  fastify.decorate('pageViewsRepository', {})

  fastify.pageViewsRepository = new PageViewsRepository()
}

module.exports = fp(pageViewsRepository)
