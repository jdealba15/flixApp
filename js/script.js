import movieCard from '/js/components/MovieCard.js';
import showCard from '/js/components/ShowCard.js';
import movieDetails from '/js/components/MovieDetails.js';
import showInfo from '/js/components/ShowInfo.js';
import displaySearch from '/js/components/DisplaySearch.js';
import displaySliderMovies from '/js/components/DisplaySliderMovies.js';

const global = {
    currentPage: window.location.pathname,
    search: {
      term: '',
      type: '',
      page: 1,
      totalPages: 1,
      totalResults: 0
    },
  };

const generateBaseUrl = () => {
    return 'https://flixx-api-4ea54960865d.herokuapp.com/'
}

const fetchFromTMBD = async (endpoint) => {
  showSpinner(); 
  const baseUrl = generateBaseUrl();
  const url = `${baseUrl}resource/${endpoint}`;
  const resp = await fetch(url)
  const data = await resp.json();
  hideSpinner();
  return data;

};


  // Display 20 most popular movies
async function displayPopularMovies() {
  const { results } = await fetchFromTMBD('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = movieCard(movie.title, movie.release_date, movie.id, movie.poster_path);
    document.querySelector('#popular-movies').appendChild(div);
  });
}
  
  // Display 20 most popular tv shows
  async function displayPopularShows() {
    const { results } = await fetchFromTMBD('tv/popular');
  
    results.forEach((show) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = showCard(show.id, show.poster_path, show.name, show.first_air_date, show.genres);
  
      document.querySelector('#popular-shows').appendChild(div);
    });
  }
  
  // Display Movie Details
  async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1];
  
    const movie = await fetchFromTMBD(`movie/${movieId}`);
  
    // Overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path);
  
    const div = document.createElement('div'); 
    div.innerHTML = movieDetails(
      movie.poster_path, 
      movie.title, 
      movie.vote_average, 
      movie.release_date, 
      movie.overview, 
      movie.genres, 
      movie.homepage, 
      movie.budget, 
      movie.revenue, 
      movie.runtime, 
      movie.status, 
      movie.production_companies
    );
                              
  
  document.querySelector('#movie-details').appendChild(div);
  }
  async function displayShowDetails() {
    const showId = window.location.search.split('=')[1];
  
    const show = await fetchFromTMBD(`tv/${showId}`);
  
    // Overlay for background image
    displayBackgroundImage('tv', show.backdrop_path);
    const div = document.createElement('div');
    div.innerHTML = showInfo(
      show.poster_path, 
      show.name, 
      show.vote_average, 
      show.last_air_date, 
      show.overview, 
      show.genres, 
      show.homepage, 
      show.number_of_episodes, 
      show.last_episode_to_air, 
      show.status, 
      show.production_companies
      );
  
  document.querySelector('#show-details').appendChild(div);
  }
  
  
  // Display Backdrop On Details Pages
  function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';
  
    if (type === 'movie') {
      document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
      document.querySelector('#show-details').appendChild(overlayDiv);
    }
  }

// Search Movies/Shows

async function search() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    global.search.type = urlParams.get('type');
    global.search.term = urlParams.get('search-term');

    if (global.search.term !== '' && global.search.term !== null) {
      const { results, total_pages, page, total_results } = await searchAPIData();

      global.search.page = page;
      global.search.totalPages = total_pages;
      global.search.totalResults = total_results;

      if (results.length === 0) {
        showAlert('No results found');
        return
      }

      displaySearchResults(results);

      document.querySelector('#search-term').value = '';

    } else {
      showAlert('Please enter a search term', 'error');
    }
}

function displaySearchResults(results) {
  // Clear previous results
  document.querySelector('#search-results').innerHTML ='';
  document.querySelector('#search-results-heading').innerHTML ='';
  document.querySelector('#pagination').innerHTML ='';
  
  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = displaySearch(global.search.type, result.id, result.poster_path, global.search.type, result.title, result.name, result.release_date, result.first_air_date);

    document.querySelector('#search-results-heading').innerHTML = `
            <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>
    `;

    document.querySelector('#search-results').appendChild(div);
  });

  displayPagination();
}

// Create & Display Pagination For Search

function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
    <div class="pagination">
      <button class="btn btn-primary" id="prev">Prev</button>
      <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`;
 
    document.querySelector('#pagination').appendChild(div);

  // Disable prev button if on first page
  if(global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }

  // Disable next button if on last page
  if(global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  // Next page
  document.querySelector('#next').addEventListener('click', async () => 
  {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });

   // Previous page
   document.querySelector('#prev').addEventListener('click', async () => 
   {
     global.search.page--;
     const { results, total_pages } = await searchAPIData();
     displaySearchResults(results);
   });
 }


// Display Slider Movies
async function displaySlider() {
  const { results } = await fetchFromTMBD('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = displaySliderMovies(movie.id, movie.poster_path, movie.title, movie.vote_average);
    
    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
    });

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      500: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      },
    }
  })
}
}
  
  function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
  }
  
  function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
  }
  
  // Highlight active link
  function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      if (link.getAttribute('href') === global.currentPage) {
        link.classList.add('active');
      }
    });
  }

  // Show Alert
  function showAlert(message, className = 'error') {
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);

    setTimeout(() => alertEl.remove(), 3000);
  }
  
  function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  // Init App
  function init() {
    switch (global.currentPage) {
      case '/':
      case '/index.html':
        displaySlider();
        displayPopularMovies();
        break;
      case '/shows.html':
        displayPopularShows();
        break;
      case '/movie-details.html':
        displayMovieDetails();
        break;
      case '/tv-details.html':
        displayShowDetails();
        break;
      case '/search.html':
        search();
        break;
    }
  
    highlightActiveLink();
  }
  
  document.addEventListener('DOMContentLoaded', init);
  