'use strict'
const S = require('fluent-schema')

const event = {
  response: {
    200: S.object()
      .prop('status', S.string().enum(['ok']))
  },
  querystring: S.object()
    .prop('timestamp', S.string())
    .prop('user_id', S.string())
    .prop('page_id', S.string())
}

module.exports = {
  event
}
