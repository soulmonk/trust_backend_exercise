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

test('return page views by pageId', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'GET',
    url: '/page-views',
    headers: {
      Authorization: 'Bearer 6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu'
    },
    query: {
      pageId: 3
    }
  })

  t.strictEqual(res.statusCode, 200)
  const payload = JSON.parse(res.payload)
  t.equal(payload.data.length, 2)
})

test('return page views by country', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'GET',
    url: '/page-views',
    headers: {
      Authorization: 'Bearer 6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu'
    },
    query: {
      country: 'US'
    }
  })

  t.strictEqual(res.statusCode, 200)
  const payload = JSON.parse(res.payload)
  t.equal(payload.data[0].views, 3)
})

test('return page rate', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'GET',
    url: '/page-views',
    headers: {
      Authorization: 'Bearer 6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu'
    },
    query: {
      aggregate: 'rate'
    }
  })

  t.strictEqual(res.statusCode, 200)
  const payload = JSON.parse(res.payload)

  let data = payload.data.find(row => row.page_id === 1)
  t.equal(data.rate, 1)

  data = payload.data.find(row => row.page_id === 2)
  t.equal(data.rate, 0.5)

  data = payload.data.find(row => row.page_id === 3)
  t.equal(data.rate, 0)
})
