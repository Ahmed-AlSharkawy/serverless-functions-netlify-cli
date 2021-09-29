const result = document.querySelector('.result')
const errorEle = document.querySelector('.error')

const fetchData = async (url) => {
  try {
    const { data } = await axios.get(url)
    result.textContent = data
  } catch (error) {
    errorEle.textContent = error.response.data
  }
}

// fetchData('/.netlify/functions/1-hello')
fetchData('/api/1-hello')

const clickHandler = async () => fetchData('/api/1-error')
