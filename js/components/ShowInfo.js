const showInfo = (
    poster_path, 
    name, 
    vote_average, 
    last_air_date, 
    overview, 
    genres, 
    homepage, 
    number_of_episodes, 
    last_episode_to_air, 
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
  <p class="text-muted">Last Air Date: ${last_air_date}</p>
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
<h2>Show Info</h2>
<ul>
  <li><span class="text-secondary">Number of Episodes:</span> ${number_of_episodes}</li>
  <li><span class="text-secondary">Last Episode to Air:</span> ${last_episode_to_air.name}</li>
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

export default showInfo;