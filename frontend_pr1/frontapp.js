
fetch("http://localhost:3000/exoplanets")
  .then(res => res.json())
  .then(data => {
    console.log(data); 
    const container = document.getElementById("exoplanet-list");
    data.forEach(planet => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${planet.name}</h3>
        <p>${planet.short_description}</p>
        <button onclick="showDetails(${planet.id})">Read More</button>
      `;
      container.appendChild(div);
    });
  });

function showDetails(id) {
  fetch(`http://localhost:3000/exoplanets/${id}`)
    .then(res => res.json())
    .then(planet => {
      alert(`Details for ${planet.name}:\n${planet.description}`);
    });
}
