'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('required authentications', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'GET',
    url: '/page-views'
  })
  t.strictEqual(res.statusCode, 401)
})

test('return all', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'GET',
    url: '/page-views',
    headers: {
      Authorization: 'Bearer 6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu'
    }
  })

  t.strictEqual(res.statusCode, 200)
  t.deepEqual(JSON.parse(res.payload), { ok: true })
})

test('return page view by pageId', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'GET',
    url: '/page-views',
    headers: {
      Authorization: 'Bearer 6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu'
    },
    query: {
      pageId: 1
    }
  })

  t.strictEqual(res.statusCode, 200)
  const payload = JSON.parse(res.payload)
  t.equal(payload.data.length, 1)
})
