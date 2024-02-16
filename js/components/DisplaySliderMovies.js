const displaySliderMovies = (id, poster_path, title, vote_average) => `
<a href="movie-details.html?id=${id}">
  <img src="https://image.tmdb.org/t/p/w500${poster_path}">
  ${title}
</a>
<h4 class="swiper-rating">
  <i class="fas fa-star text-secondary"></i> ${vote_average.toFixed(1)} / 10
</h4>`;

export default displaySliderMovies;