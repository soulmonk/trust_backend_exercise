'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const PageViews = require('../../plugins/page-views')
const PageViewsRepository = require('../../repositories/page-views')
const fp = require('fastify-plugin')

test('page Views Repository works standalone', async (t) => {
  const fastify = Fastify()
  const fakePlugin = (_, __, done) => { done() }
  fastify.register(fp(fakePlugin, { name: 'fastifyPostgres' }))
  fastify.register(PageViews, {})

  await fastify.ready()
  t.type(fastify.pageViewsRepository, PageViewsRepository)
})
