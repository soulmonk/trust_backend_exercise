'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('event collector', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'GET',
    url: '/event'
  })
  t.strictEqual(res.statusCode, 200)
  t.deepEqual(JSON.parse(res.payload), { status: 'ok' })
})