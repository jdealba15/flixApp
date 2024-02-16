import addCommasToNumber from '/js/utilities/AddCommasToNumber.js';

const movieDetails = (
    poster_path, 
    name, 
    vote_average, 
    release_date, 
    overview, 
    genres, 
    homepage, 
    budget, 
    revenue, 
    runtime, 
    status, 
    production_companies
  ) =>`
<div class="details-top">
<div>
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
</div>
<div>
  <h2>${name}</h2>
  <p>
    <i class="fas fa-star text-primary"></i>
    ${vote_average.toFixed(1)} / 10
  </p>
  <p class="text-muted">Last Air Date: ${release_date}</p>
  <p>
    ${overview}
  </p>
  <h5>Genres</h5>
  <ul class="list-group">
    ${genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    
  </ul>
  <a href="${
    homepage
  }" target="_blank" class="btn">Visit show Homepage</a>
</div>
</div>
<div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
        budget
      )}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
        revenue
      )}</li>
      <li><span class="text-secondary">Runtime:</span> ${
        runtime
      } minutes</li>
      <li><span class="text-secondary">Status:</span> ${status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
    </div>
  </div>
`;

export default movieDetails;