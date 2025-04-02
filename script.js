async function getMovies() {
    try {
        const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzE3NjkyZmM0MjZiYzhjYzczN2UxYmU5ZmE0YzExZSIsIm5iZiI6MTc0MzU5NTE0NC4yNjIsInN1YiI6IjY3ZWQyNjg4MzVmNWI3MGUzYWNlN2FkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vRMuaG_ZsqifFSuydBoY0R1WqwZ59W69uZFGfAUa9gg'
            }
        };
        const res = await fetch(url, options)
        const json = await res.json()
        return json
    } catch (error) {
        console.log(error)
    }
}

function renderMovies(movies) {
    const container = document.getElementById('movie-container');
    movies.results.forEach(movie => {
        console.log(movie)
        const card = Card({
            title: movie.title,
            year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
            genre: movie.genre_ids.join(', '), // or use a map if you want names,
            id: movie.id,
            imagePath: movie.poster_path
        });
        container.appendChild(card);
    });
}



async function setUI() {
    const movies = await getMovies();
    if (movies) renderMovies(movies);
}

window.onload = setUI;

function Card({ title, year, genre, id, imagePath }) {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = `/movie/index.html?id=${id}`;
    const h3 = document.createElement('h3');
    h3.textContent = title;
    const image = document.createElement('img')
    image.src = `https://image.tmdb.org/t/p/w500${imagePath};`
    const pYear = document.createElement('p');
    pYear.textContent = `Year: ${year}`;

    const pGenre = document.createElement('p');
    pGenre.textContent = `Genre: ${genre}`;


    card.appendChild(h3);
    card.appendChild(pYear);
    card.appendChild(pGenre);
    card.appendChild(image);

    return card;
}
