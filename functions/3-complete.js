// domain/.netlify/functions/3-complete
// domain/api/3-complete

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
  try {
    const { records } = await airtable.list()
    const products = records.map((product) => {
      const { id } = product
      const { name, image, price } = product.fields
      const url = image[0].url

      return { id, name, url, price }
      //   console.log(
      //     product.id,
      //     product.fields.name,
      //     product.fields.image[0].url,
      //     product.fields.price
      //   )
    })
    return {
      statusCode: 200,
      body: JSON.stringify(products),
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
