const API_KEY = "e5a91b5296f48cc249f827c90b5a4f87";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

function goHome() {
    window.location.href = "index.html";
}

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

async function fetchMovieDetails() {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits,watch/providers`);
    const data = await response.json();

    document.getElementById("movie-title").innerText = data.title;
    document.getElementById("poster").src = IMG_PATH + data.poster_path;
    document.getElementById("rating").innerText = data.vote_average.toFixed(1);
    document.getElementById("duration").innerText = data.runtime;
    document.getElementById("genres").innerText = data.genres.map(genre => genre.name).join(", ");
    document.getElementById("overview").innerText = data.overview;

    const castMembers = data.credits.cast.slice(0, 5).map(actor => actor.name).join(", ");
    document.getElementById("cast").innerText = castMembers || "Not available";

    const trailer = data.videos.results.find(video => video.type === "Trailer");

    if (trailer) {
        const videoContainer = document.getElementById("video-container");
        videoContainer.innerHTML = `
             <iframe width="560" height="315" 
            src="https://www.youtube.com/embed/${trailer.key}" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
        `;
    } else {
        document.getElementById("video-container").innerHTML = "<p>No trailer available</p>";
    }

    fetchWatchProviders(movieId);
}

async function fetchWatchProviders(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`);
    const data = await response.json();
    const providers = data.results.IN || data.results.US || data.results.GB; 

    const watchProvidersContainer = document.getElementById("watch-providers");
    watchProvidersContainer.innerHTML = "";

    if (providers && providers.flatrate) {
        providers.flatrate.forEach(provider => {
            const providerLink = document.createElement("a");
            providerLink.href = `https://www.google.com/search?q=${provider.provider_name}+${document.getElementById("movie-title").innerText}+watch+online`;
            providerLink.target = "_blank";
            providerLink.classList.add("watch-link");
            providerLink.innerText = `▶ ${provider.provider_name}`;
            watchProvidersContainer.appendChild(providerLink);
        });
    } else {
        watchProvidersContainer.innerHTML = "<p>Not available for streaming.</p>";
    }
}

fetchMovieDetails();
