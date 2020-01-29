'use strict'

const schemas = require('../schemas/page-views')

async function pageViewsService (fastify, opts) {
  fastify.addHook('onRequest', fastify.authenticate)

  fastify.get('/', {
    handler: onFind,
    schema: schemas.find
  })

  async function onFind (req, repl) {
    let data = []

    if (req.query.pageId) {
      data = await this.pageViewsRepository.findByPageId(req.query.pageId)
    } else if (req.query.browser) {
      data = await this.pageViewsRepository.findByBrowser(req.query.browser)
    } else if (req.query.country) {
      data = await this.pageViewsRepository.findByCountry(req.query.country)
    } else if (req.query.aggregate) {
      data = await this.pageViewsRepository.aggregate(req.query.aggregate)
    }

    return { data }
  }
}

pageViewsService.autoPrefix = '/page-views'

module.exports = pageViewsService
