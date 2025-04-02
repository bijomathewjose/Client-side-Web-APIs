
async function getMovie(id) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzE3NjkyZmM0MjZiYzhjYzczN2UxYmU5ZmE0YzExZSIsIm5iZiI6MTc0MzU5NTE0NC4yNjIsInN1YiI6IjY3ZWQyNjg4MzVmNWI3MGUzYWNlN2FkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vRMuaG_ZsqifFSuydBoY0R1WqwZ59W69uZFGfAUa9gg'
            }
        };
        const res = await fetch(url, options)
        return await res.json()
    } catch (error) {
        console.log(error)
    }
}
async function getId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}
async function loadUI() {
    const id = await getId()
    console.log(id)
    const movie = await getMovie(id)
    document.getElementById('poster').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    document.getElementById('title').textContent = movie.title;
    document.getElementById('tagline').textContent = movie.tagline;
    document.getElementById('overview').textContent = movie.overview;
    document.getElementById('release-date').textContent = movie.release_date;
    document.getElementById('genres').textContent = movie.genres.map(g => g.name).join(', ');
    document.getElementById('runtime').textContent = movie.runtime;
    document.getElementById('rating').textContent = movie.vote_average;
    document.getElementById('language').textContent = movie.spoken_languages.map(l => l.english_name).join(', ');
    document.getElementById('country').textContent = movie.production_countries.map(c => c.name).join(', ');
    document.getElementById('production').textContent = movie.production_companies.map(p => p.name).join(', ');
}

window.onload = loadUI