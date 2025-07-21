const API_KEY = api_key;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

let currentPage = 1; 
let isLoading = false; 
let selectedGenre = ""; 

async function fetchTrendingMovies() {
    if (isLoading) return;
    isLoading = true;

    try {
        const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${currentPage}`);
        const data = await response.json();
        displayMovies(data.results, 'trending-movies');
        currentPage++;
    } catch (error) {
        console.error("Error fetching trending movies:", error);
    }

    isLoading = false;
}

async function filterByGenre(genreId) {
    selectedGenre = genreId;
    currentPage = 1;
    document.getElementById("movies").innerHTML = ""; 
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${currentPage}`);
        const data = await response.json();
        displayMovies(data.results, 'movies');
        currentPage++; 
    } catch (error) {
        console.error("Error fetching genre movies:", error);
    }
}

// document.getElementById("theme-toggle").addEventListener("click", function() {
//     document.body.classList.toggle("light-theme");

//     if (document.body.classList.contains("light-theme")) {
//         this.innerText = "🌙 Dark Mode";
//     } else {
//         this.innerText = "☀️ Light Mode";
//     }
// });

function displayMovies(movies, containerId) {
    const movieContainer = document.getElementById(containerId);
    if (!movieContainer) return;

    movies.forEach(movie => {
        if (!movie.poster_path) return;

        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `
            <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}" onclick="openMovieDetails(${movie.id})">
            <h3>${movie.title}</h3>
        `;
        movieContainer.appendChild(movieDiv);
    });
}

function openMovieDetails(movieId) {
    window.location.href = `movieDetails.html?id=${movieId}`;
}

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        // if (!selectedGenre) { 
            fetchTrendingMovies(); 
        // }
    }
});


function searchMovies() {
    const query = document.getElementById("search-box").value.trim();
    if (query) {
        window.open(`searchResults.html?query=${encodeURIComponent(query)}`, '_blank');
    }
}

fetchTrendingMovies();
