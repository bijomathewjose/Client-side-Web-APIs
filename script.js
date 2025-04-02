async function getMovies(page = 1) {
    try {
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&&page=${page}`;
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
        const card = Card({
            title: movie.title,
            year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
            genre: movie.genre_ids.join(', '), // or use a map if you want names,
            id: movie.id,
            imagePath: movie.poster_path
        });
        container.appendChild(card);
    });
    addPagination(movies.total_pages, movies.page)

}

async function getPage() {
    const params = new URLSearchParams(window.location.search);
    return params.get('page');
}

async function setUI() {
    let page = await getPage()
    if (!page) page = 1
    const movies = await getMovies(page);
    if (movies) renderMovies(movies);
}

window.onload = setUI;

function Card({ title, year, genre, id, imagePath }) {
    const card = document.createElement('a');
    card.className = 'card';
    const isProd = window.location.hostname === 'bijomathewjose.github.io';
    const BASE_PATH = isProd ? '/Client-side-Web-APIs' : '';
    card.href = `${BASE_PATH}/movie/index.html?id=${id}`;  // ← Correct path
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

function addPagination(numberOfPages, currentPage) {
    let num = numberOfPages > 10 ? 10 : numberOfPages
    const container = document.getElementById('pagination');
    container.innerHTML = '';

    // Line 1: "Page [ currentPage ]"
    const topLine = document.createElement('div');
    topLine.style.marginBottom = '10px';
    topLine.style.display = 'flex';
    topLine.style.alignItems = 'center';
    topLine.style.gap = '10px';

    const label = document.createElement('span');
    label.textContent = 'Page';

    const input = document.createElement('input');
    input.type = 'number';
    input.min = 1;
    input.max = num;
    input.value = currentPage;
    input.style.width = '60px';

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const page = parseInt(input.value);
            if (!isNaN(page) && page >= 1 && page <= num) {
                goToPage(page);
            } else {
                alert(`Enter a number between 1 and ${num}`);
            }
        }
    });

    topLine.appendChild(label);
    topLine.appendChild(input);
    container.appendChild(topLine);

    // Line 2: First 2 buttons ... last 2 buttons
    const bottomLine = document.createElement('div');
    bottomLine.style.display = 'flex';
    bottomLine.style.alignItems = 'center';
    bottomLine.style.gap = '10px';

    const goToPage = (page) => {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page);
        window.location.href = url.toString();
    };

    const createButton = (page) => {
        const btn = document.createElement('button');
        btn.textContent = page;
        if (page === currentPage) btn.classList.add('active');
        btn.addEventListener('click', () => goToPage(page));
        return btn;
    };

    // First 2 pages
    for (let i = 1; i <= Math.min(2, num); i++) {
        bottomLine.appendChild(createButton(i));
    }

    // Add ellipsis if enough space between first and last
    if (num > 4) {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        bottomLine.appendChild(ellipsis);
    }

    // Last 2 pages
    for (let i = num - 1; i <= num; i++) {
        if (i > 2) bottomLine.appendChild(createButton(i));
    }

    container.appendChild(bottomLine);
}
