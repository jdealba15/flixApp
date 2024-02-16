const showCard = (id, poster_path, name, first_air_date) =>`
<a href="tv-details.html?id=${id}">
  ${
    poster_path
      ? `<img
    src="https://image.tmdb.org/t/p/w500${poster_path}"
    class="card-img-top"
    alt="${name}"
  />`
      : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${name}"
/>`
  }
</a>
<div class="card-body">
  <h5 class="card-title">${name}</h5>
  <p class="card-text">
    <small class="text-muted">Air Date: ${first_air_date}</small>
  </p>
</div>
`;


export default showCard;

