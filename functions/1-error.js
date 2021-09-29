// domain/.netlify/functions/1-error
// domain/api/1-error

exports.handler = async (event, context, cb) => {
  return {
    statusCode: 404,
    body: '404\nData Not Found',
  }
}
