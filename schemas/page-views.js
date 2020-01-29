'use strict'
const S = require('fluent-schema')

const find = {
  response: {
    200: S.object()
      .prop('data', S.array().items(S.object()))
  }
}

module.exports = {
  find
}
