const result = document.querySelector('.result')

const fetchData = async (url) => {
  try {
    const { data } = await axios.get(url)
    result.innerHTML = data
      .map((item) => {
        const { id, url, name, price } = item
        return `<a href="product.html?id=${id}" class="product">
      <img
        src="${url}"
        alt="${name}"
      />
      <div class="info">
        <h5>${name}</h5>
        <h5 class="price">$${price}</h5>
      </div>
    </a>`
      })
      .join('')
  } catch (error) {
    result.innerHTML = `<h2 style='margin-top:20vh' class="error multiline text-center ">${error.response.data}</h2>`
    result.classList = ''
  }
}

fetchData('/api/3-complete')
