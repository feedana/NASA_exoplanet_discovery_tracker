// 1. Read ID from URL
const urlParams = new URLSearchParams(window.location.search);
const planetId = urlParams.get("id");

// 2. Select container
const planetBox = document.getElementById("planetDetails");

// 3. Fetch data from JSON Server
fetch(`http://localhost:3000/exoplanets/${planetId}`)
    .then(res => res.json())
    .then(planet => {
        if (!planet.id) {
            planetBox.innerHTML = "<h2>Planet not found</h2>";
            return;
        }

        // 4. Render dynamic content
        planetBox.innerHTML = `
            <img src="${planet.image}" class="planet-img" alt="${planet.name}">
            
            <h2>${planet.name}</h2>

            <div class="info-box">
                <p><strong>Distance:</strong> ${planet.distance}</p>
                <p><strong>Discovery Year:</strong> ${planet.year}</p>
                <p><strong>Type:</strong> ${planet.type}</p>
                <p><strong>Mass:</strong> ${planet.mass}</p>
                <p><strong>Radius:</strong> ${planet.radius}</p>
                <p><strong>Orbit Period:</strong> ${planet.orbit_period}</p>
                <p><strong>Discovery Method:</strong> ${planet.discovery_method}</p>
            </div>

            <p class="description">${planet.description}</p>
        `;
    })
    .catch(err => {
        planetBox.innerHTML = "<h3>Error loading planet data.</h3>";
    });
