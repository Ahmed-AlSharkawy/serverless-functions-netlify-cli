// domain/.netlify/functions/3-product
// domain/api/3-product

require('dotenv').config()

const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app4sJa4lf0RohIHJ')
  .table('products')

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters
  if (id) {
    try {
      const product = await airtable.retrieve(id)

      if (product.error)
        return {
          statusCode: 404,
          body: JSON.stringify({
            error: {
              title: 'Not Found',
              message: `We don't have any product with id: ${id}`,
            },
          }),
        }

      return {
        statusCode: 200,
        body: JSON.stringify(product),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: {
            title: error.name,
            message: error.message,
          },
        }),
        //   body: error.name + '\n' + error.message,
      }
    }
  }
  return {
    statusCode: 400,
    body: JSON.stringify({
      error: {
        title: 'Bad Request',
        message: 'You must enter a valid id to proceed',
      },
    }),
  }
}
