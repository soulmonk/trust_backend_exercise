'use strict'

class PageViewsRepository {
  constructor (client) {
    this.client = client
  }

  async findByPageId (id) {
    const query = 'SELECT * from event WHERE page_id = $1'

    const result = await this.client.query(query, [id])
    return result.rows
  }

  async aggregate (type) {
    if (type === 'rate') {
      return this._aggregateRate()
    }
    return this._aggregateViews()
  }

  async _aggregateRate () {
    const query = `with a as (select distinct page_id, count(DISTINCT user_id) as unique_users from event group by 1),
     b as (select distinct page_id, user_id, count(1) as views from event group by 1, 2),
     c as (select distinct page_id, count(user_id) as returned_users from b where views > 1 group by 1)
select a.page_id,
       (case when returned_users is null then 0 else returned_users::decimal / unique_users end) as rate
from a full join c on a.page_id = c.page_id;`

    const result = await this.client.query(query)
    return result.rows
  }

  async _aggregateViews () {
    const query = `select distinct country, count(1) as views
                   from event
                   group by 1`

    const result = await this.client.query(query)
    return result.rows
  }

  async findByBrowser (browser) {
    const query = `select distinct browser, count(1) as views
                   from event
                   where browser = $1
                   group by 1 `

    const result = await this.client.query(query, [browser])
    return result.rows
  }

  async findByCountry (cc) {
    const query = `select distinct country, count(1) as views
                   from event
                   where country = $1
                   group by 1 `

    const result = await this.client.query(query, [cc])
    return result.rows
  }

  async addEvent (userInfo, data) {
    const query = `INSERT INTO "event" (id, page_id, user_id, browser, country, ts)
                   VALUES (DEFAULT, $1, $2, $3, $4, $5)`
    return this.client.query(query,
      [
        data.page_id ? data.page_id : 0,
        data.user_id ? data.user_id : 0,
        (userInfo.browser ? userInfo.browser : 'unknown').toLowerCase(),
        userInfo.country.toLowerCase(),
        new Date(data.timestamp ? +data.timestamp : Date.now())
      ]
    )
  }
}

module.exports = PageViewsRepository
