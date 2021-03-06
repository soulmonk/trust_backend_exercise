'use strict'

const { config } = require('./helper')
const pg = require('pg')

async function run () {
  console.log('Start', new Date())

  const pool = new pg.Pool(config().db)

  await pool.query('truncate table "event" restart identity;')
  await pool.query(`INSERT INTO "event" (id, page_id, user_id, browser, country, ts)
                    VALUES (DEFAULT, 1, 1, 'chrome', 'ua', now()),
                           (DEFAULT, 1, 1, 'chrome', 'ua', now()),
                           (DEFAULT, 1, 2, 'chrome', 'uk', now()),
                           (DEFAULT, 1, 2, 'chrome', 'de', now()),
                           (DEFAULT, 3, 3, 'chrome', 'de', now()),
                           (DEFAULT, 3, 2, 'firefox', 'us', now()),
                           (DEFAULT, 2, 1, 'chrome', 'uk', now()),
                           (DEFAULT, 2, 2, 'firefox', 'us', now()),
                           (DEFAULT, 2, 2, 'firefox', 'us', now());`)

  await pool.end()

  // await new Promise(resolve => pool.end(resolve))

  console.log('Done', new Date())
}

run()
  .catch(err => {
    console.error(err)
    return -1
  })
  .then(process.exit)
