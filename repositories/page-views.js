'use strict'

class PageViewsRepository {
  constructor (client) {
    this.client = client
  }

  async get (id) {

  }

  async find (id) {

  }

  async addEvent (userInfo, data) {
    const query = `INSERT INTO "event" (id, page_id, user_id, browser, country, ts)
                   VALUES (DEFAULT, $1, $2, $3, $4, $5)`
    return this.client.query(query,
      [
        data.pageId ? data.pageId : 0,
        data.userId ? data.userId : 0,
        data.browser ? userInfo.browser : 'unknown',
        userInfo.country,
        new Date(data.timestamp ? +data.timestamp : Date.now())
      ]
    )
  }
}

module.exports = PageViewsRepository
