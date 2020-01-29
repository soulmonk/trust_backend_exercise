'use strict'

const fp = require('fastify-plugin')
const geoip = require('geoip-lite')
const uaParser = require('ua-parser-js')

async function userInfoPlugin (fastify, opts) {
  fastify.decorateRequest('userInfo', '')

  fastify.addHook('preHandler', async (req, reply) => {
    const userAgent = uaParser(req.headers['user-agent'])
    let info = geoip.lookup(req.ip)
    if (!info) {
      info = { country: 'WW' }
    }
    req.userInfo = {
      browser: userAgent.browser.name,
      country: info.country
    }
  })
}

module.exports = fp(userInfoPlugin)
