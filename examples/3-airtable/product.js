const result = document.querySelector('.result')

const fetchData = async (url) => {
  result.innerHTML = '<h2 class="text-center">Loading...</h2>'
  try {
    const id = window.location.search
    const {
      data: { fields },
    } = await axios.get(`${url}${id}`)
    const { name, image, desc, price } = fields
    result.innerHTML = `<h1 class="title">${name}</h1>
  <article class="product">
    <img class="product-img"
    src=${image[0].url}
    alt=${name}
    />
    <div class="product-info">
      <h5 class="title">${name}</h5>
      <h5 class="price">$${price}</h5>
      <p class="desc">${desc}</p>
    </div>
  </article>`
  } catch (error) {
    console.log(error.response.data)
    result.innerHTML = `<h2 style='margin-top:20vh' class="error multiline text-center ">${
      error.response.data.error
        ? error.response.data.error.title +
          '<br/>' +
          error.response.data.error.message
        : error.response.data
    }</h2>`
    result.classList = ''
  }
}

fetchData('/api/3-complete')
