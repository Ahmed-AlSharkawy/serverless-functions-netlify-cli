// domain/.netlify/functions/2-basic-api
// domain/api/2-basic-api

const data = require('../assets/data')

exports.handler = async (event, context, cb) => {
  return {
    /* Access-Control-Allow-Origin is used to 
      make functions accessable for external resources */
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
