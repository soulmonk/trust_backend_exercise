'use strict'

const schemas = require('../schemas/page-views')

async function pageViewsService (fastify, opts) {
  fastify.addHook('onRequest', fastify.authenticate)

  fastify.get('/', {
    handler: onFind,
    schema: schemas.find
  })

  async function onFind (req, repl) {
    // todo overloaded endpoint
    let data = []

    if (typeof req.query.page_id !== 'undefined') {
      data = await this.pageViewsRepository.findByPageId(req.query.page_id)
    } else if (req.query.browser) {
      data = await this.pageViewsRepository.findByBrowser(req.query.browser.toLowerCase())
    } else if (req.query.country) {
      data = await this.pageViewsRepository.findByCountry(req.query.country.toLowerCase())
    } else if (req.query.aggregate) {
      data = await this.pageViewsRepository.aggregate(req.query.aggregate)
    }

    return { data }
  }
}

pageViewsService.autoPrefix = '/page-views'

module.exports = pageViewsService
