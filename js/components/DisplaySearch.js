const displaySearch = (search, id, poster_path, title, name, release_date, first_air_date) => `
<a href="${search}-details.html?id=${id}">
  ${
    poster_path
      ? `<img
    src="https://image.tmdb.org/t/p/w500/${poster_path}"
    class="card-img-top"
    alt="${search === 'movie' ? title : name}"
  />`
      : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${search === 'movie' ? title : name}"
/>`
  }
</a>
<div class="card-body">
  <h5 class="card-title">${search === 'movie' ? title : name}</h5>
  <p class="card-text">
    <small class="text-muted">Release: ${search === 'movie' ? release_date : first_air_date}</small>
  </p>
</div>
`;

export default displaySearch;