'use strict'

const fp = require('fastify-plugin')
const geoip = require('geoip-lite')

async function userInfoPlugin (fastify, opts) {
  fastify.decorateRequest('userInfo', '')

  fastify.addHook('preHandler', async (req, reply) => {
    const userAgent = req.headers['user-agent']
    let info = geoip.lookup(req.ip)
    if (!info) {
      info = { country: 'WW' }
    }
    req.userInfo = {
      userAgent,
      country: info.country
    }
  })
}

module.exports = fp(userInfoPlugin)
