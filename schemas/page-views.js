'use strict'
const S = require('fluent-schema')

const eventSchemaData = S.object()
  .prop('page_id', S.number())
  .prop('user_id', S.number())
  .prop('browser', S.string())
  .prop('country', S.string())
  .prop('ts', S.string())
  .prop('rate', S.number())
  .prop('views', S.number())

const find = {
  response: {
    200: S.object()
      .prop('data', S.array().items(eventSchemaData))
  },
  querystring: S.object()
    .prop('page_id', S.number())
    .prop('browser', S.string())
    .prop('country', S.string())
    .prop('aggregate', S.string().enum(['viewsPerCountry', 'rate', 'browser', 'country']))

}

module.exports = {
  find
}
