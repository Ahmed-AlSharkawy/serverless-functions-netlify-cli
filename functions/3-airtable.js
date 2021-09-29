// domain/.netlify/functions/1-hello
// domain/api/1-hello

const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: 'key36zZ2ECEIHQxTu' })
  .base('app4sJa4lf0RohIHJ')
  .table('products')

exports.handler = async (event, context, cb) => {
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
