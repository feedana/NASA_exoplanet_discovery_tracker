// Modal open/close
const modal = document.getElementById("modal");
const table = document.getElementById("planet-table");

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === modal) closeModal();
};

function loadPlanets() {
  fetch("http://localhost:3000/exoplanets")
    .then(res => res.json())
    .then(planets => {
      table.innerHTML = "";
      planets.forEach(planet => {
        table.innerHTML += `
          <tr>
            <td>${planet.id}</td>
            <td>${planet.name}</td>
            <td>${planet.distance}</td>
            <td>
              <button class="delete-btn" onclick="deletePlanet(${planet.id})">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

loadPlanets();

// Save new 
function savePlanet() {
  const newPlanet = {
    name: document.getElementById("name").value,
    distance: document.getElementById("distance").value,
    description: document.getElementById("description").value
  };

  fetch("http://localhost:3000/exoplanets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPlanet)
  })
  .then(() => {
    closeModal();
    loadPlanets();
  });
}

// Delete
function deletePlanet(id) {
  fetch(`http://localhost:3000/exoplanets/${id}`, {
    method: "DELETE"
  })
  .then(() => loadPlanets());
}
