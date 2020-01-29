'use strict'

const { test } = require('tap')
const { build, countOfEvents } = require('../helper')

test('event collector', async (t) => {
  const app = await build(t)

  const count = await countOfEvents(app)

  const res = await app.inject({
    method: 'GET',
    url: '/event',
    query: {
      timestamp: Date.now(),
      userId: 99,
      pageId: 22
    }
  })
  t.strictEqual(res.statusCode, 200)
  t.deepEqual(JSON.parse(res.payload), { status: 'ok' })

  const countAfter = await countOfEvents(app)
  t.equal(count, countAfter - 1)
})
