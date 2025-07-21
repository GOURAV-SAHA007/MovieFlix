const API_KEY = api_key;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("query");

async function fetchMovies(searchQuery) {
    if (!searchQuery) {
        document.getElementById("search-heading").innerText = "No search query provided.";
        return;
    }

    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`);
    const data = await response.json();

    const searchHeading = document.getElementById("search-heading");
    searchHeading.innerHTML = `Search Results for "<span style="color:#ff4d4d;">${searchQuery}</span>"`;

    const movieContainer = document.getElementById("movies");
    movieContainer.innerHTML = "";

    if (data.results.length === 0) {
        movieContainer.innerHTML = "<p>No movies found.</p>";
        return;
    }

    
    data.results.forEach(movie => {
        if (!movie.poster_path) return; 
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}" onclick="openMovieDetails(${movie.id})">
            <h3>${movie.title}</h3>
            <p>⭐ ${movie.vote_average.toFixed(1)}</p>
        `;
        movieContainer.appendChild(movieElement);
    });
}

function goHome() {
    window.location.href = "index.html";
}

function openMovieDetails(movieId) {
    window.open(`movieDetails.html?id=${movieId}`, '_blank');
}

fetchMovies(query);
