'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const PageViews = require('../../plugins/page-views')
const PageViewsRepository = require('../../repositories/page-views')

test('page Views Repository works standalone', async (t) => {
  const fastify = Fastify()
  fastify.register(PageViews, {})

  await fastify.ready()
  t.type(fastify.pageViewsRepository, PageViewsRepository)
})
