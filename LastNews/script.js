// use th liove server extension to run the program

const API_KEY = 'YOUR_API_KEY'

let news = []

const categorySelect = document.getElementById('category-select')
const searchButton = document.getElementById('search-btn')
const loading = document.getElementById('loading')
const errorMessage = document.getElementById('error-message')
const newsContainer = document.getElementById('news-container')

async function getData() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&category=${categorySelect.value}`

    loading.style.display = 'block'
    errorMessage.textContent = ''
    newsContainer.innerHTML = ''

    try {
        const response = await fetch(url)
        const jsonResponse = await response.json()

        if (jsonResponse.status === 'ok') {
            news = jsonResponse.articles
            renderNews()
        }
        else {
            errorMessage.textContent = jsonResponse.message
        }
    }
    catch (error) {
        errorMessage.textContent = 'Something went wrong. Please try again.'
        console.log(error)
    }

    loading.style.display = 'none'
}

function renderNews() {
    newsContainer.innerHTML = ''

    if (news.length === 0) {
        errorMessage.textContent = 'No news found.'
        return
    }

    for (let i = 0; i < news.length; i++) {
        const article = news[i]

        const card = document.createElement('div')
        card.className = 'news-card'

        const image = document.createElement('img')
        image.src = article.urlToImage || 'https://placehold.co/600x400?text=No+Image'
        image.alt = article.title || 'News image'

        const content = document.createElement('div')
        content.className = 'news-content'

        const title = document.createElement('h2')
        title.textContent = article.title || 'No title available'

        const description = document.createElement('p')
        description.textContent = article.description || 'No description available.'

        const meta = document.createElement('div')
        meta.className = 'news-meta'

        const source = document.createElement('span')
        source.textContent = article.source.name || 'Unknown source'

        const date = document.createElement('span')
        date.textContent = article.publishedAt
            ? new Date(article.publishedAt).toLocaleDateString()
            : 'Unknown date'

        meta.appendChild(source)
        meta.appendChild(date)

        const link = document.createElement('a')
        link.href = article.url
        link.textContent = 'Read More'
        link.target = '_blank'
        link.rel = 'noopener noreferrer'

        content.appendChild(title)
        content.appendChild(description)
        content.appendChild(meta)
        content.appendChild(link)

        card.appendChild(image)
        card.appendChild(content)

        newsContainer.appendChild(card)
    }
}

searchButton.addEventListener('click', () => {
    getData()
})

getData()
