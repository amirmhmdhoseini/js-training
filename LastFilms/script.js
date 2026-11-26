const API_KEY = 'YOUR_API_KEY'

const form = document.getElementById("movie-form")
const input = document.getElementById("movie-search")
const message = document.getElementById('message')
const moviesContainer = document.getElementById('movies-container')

form.addEventListener('submit', (event)=> {
    event.preventDefault()

    const searchValue = input.value

    async function getData() {
        const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`

        try{
            const response = await fetch(url)
            const jsonResponse = await response.json()

            moviesContainer.innerHTML = ''

            if (jsonResponse.Response === 'True'){

                jsonResponse.Search.forEach(movie => {

                    const movieCard = document.createElement('div')
                    movieCard.classList.add('movie-card')

                    const poster = document.createElement('img')
                    poster.src = movie.Poster
                    poster.alt = movie.Title

                    const movieInfo = document.createElement('div')
                    movieInfo.classList.add('movie-info')

                    const title = document.createElement('h3')
                    title.textContent = movie.Title

                    const year = document.createElement('p')
                    year.textContent = movie.Year

                    movieInfo.appendChild(title)
                    movieInfo.appendChild(year)

                    movieCard.appendChild(poster)
                    movieCard.appendChild(movieInfo)

                    moviesContainer.appendChild(movieCard)
                })

            } else{
                message.textContent = jsonResponse.Error
            }
        }
        catch(error){
            console.error(error.message)
        }
    }

    getData()
})
