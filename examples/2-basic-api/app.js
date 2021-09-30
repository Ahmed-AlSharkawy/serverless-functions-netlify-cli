const result = document.querySelector('.result')

const fetchData = async (url) => {
  try {
    const { data } = await axios.get(url)
    result.innerHTML = data
      .map((item) => {
        const {
          image: { url },
          name,
          price,
        } = item
        return `<article class="product">
      <img
        src="${url}"
        alt="${name}"
      />
      <div class="info">
        <h5>${name}</h5>
        <h5 class="price">$${price}</h5>
      </div>
    </article>`
      })
      .join('')
  } catch (error) {
    result.innerHTML = `<h2 class="error multiline text-center ">${error.response.data}</h2>`
    result.classList = ''
  }
}

fetchData('/api/2-basic-api')
