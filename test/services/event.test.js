'use strict'

const { test } = require('tap')
const { build, countOfEvents } = require('../helper')

test('event collector without parameters', async (t) => {
  const app = await build(t)

  const count = await countOfEvents(app)

  let res = await app.inject({
    method: 'GET',
    url: '/event'
  })
  t.strictEqual(res.statusCode, 200)
  t.deepEqual(JSON.parse(res.payload), { status: 'ok' })

  const countAfter = await countOfEvents(app)
  t.equal(count, countAfter - 1)

  res = await app.inject({
    method: 'GET',
    url: '/page-views',
    headers: {
      Authorization: 'Bearer 6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu'
    },
    query: {
      page_id: 0 // if not provided
    }
  })
  const payload = JSON.parse(res.payload)
  t.equal(payload.data[0].page_id, 0)
  t.equal(payload.data[0].user_id, 0)
})

test('event collector', async (t) => {
  const app = await build(t)

  let res = await app.inject({
    method: 'GET',
    url: '/event',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
    },
    query: {
      timestamp: Date.now(),
      user_id: 99,
      page_id: 25
    }
  })
  t.strictEqual(res.statusCode, 200)
  t.deepEqual(JSON.parse(res.payload), { status: 'ok' })

  res = await app.inject({
    method: 'GET',
    url: '/page-views',
    headers: {
      Authorization: 'Bearer 6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu'
    },
    query: {
      page_id: 25
    }
  })
  const payload = JSON.parse(res.payload)
  t.equal(payload.data[0].browser, 'chrome')
})
