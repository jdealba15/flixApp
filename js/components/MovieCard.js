const movieCard = (title, release_date, id, poster_path) => `
<a href="movie-details.html?id=${id}">
  ${
    poster_path
      ? `<img
    src="https://image.tmdb.org/t/p/w500${poster_path}"
    class="card-img-top"
    alt="${title}"
  />`
      : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${title}"
/>`
  }
</a>
<div class="card-body">
  <h5 class="card-title">${title}</h5>
  <p class="card-text">
    <small class="text-muted">Release: ${release_date}</small>
  </p>
</div>
`;


export default movieCard;