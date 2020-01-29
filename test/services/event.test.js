'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('event collector', async (t) => {
  const app = await build(t)

  const countQuery = 'Select count(1) as count from "event"'

  const { rows: [{ count }] } = await app.pg.query(countQuery)

  const res = await app.inject({
    method: 'GET',
    url: '/event',
    query: {
      timestamp: Date.now(),
      userId: 1,
      pageId: 1
    }
  })
  t.strictEqual(res.statusCode, 200)
  t.deepEqual(JSON.parse(res.payload), { status: 'ok' })

  const { rows: [{ count: countAfter }] } = await app.pg.query(countQuery)
  t.equal(count, countAfter - 1)
})
