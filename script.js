document.getElementById("fetchButton").addEventListener("click", fetchData);

async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        
        
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        
        displayData(data, speciesData);
    } catch (error) {
        console.error(error);
        document.getElementById("result").textContent = "Error: " + error.message;
        document.getElementById("pokemonImage").style.display = "none";
    }
}

function displayData(data, speciesData) {
    const resultElement = document.getElementById("result");
    
    
    const flavorTextEntries = speciesData.flavor_text_entries;
    const englishDescription = flavorTextEntries.find(entry => entry.language.name === "en").flavor_text;

    
    resultElement.innerHTML = `
        <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
        <p>${englishDescription}</p>
    `;

    const pokemonImage = document.getElementById("pokemonImage");
    pokemonImage.src = data.sprites.front_default;
    pokemonImage.alt = data.name;
    pokemonImage.style.display = "block";
}
