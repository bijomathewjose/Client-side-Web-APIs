async function getMovies() {
    try {
        const url = 'https://freetestapi.com/api/v1/movies';
        const options = { method: 'GET', headers: { accept: 'application/json', mode: 'no-cors' } };
        const res = await fetch(url, options)
        const json = await res.json()
        return json
    } catch (error) {
        console.log(error)
    }


}

async function setUI() {
    const movies = await getMovies()
    console.log(movies)
}
window.onload = setUI
