const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input-search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

let searchPokemon = 1;
// recebe um pokémon como parâmetro, busca e retorna as informações relativas ao pokémon
const fetchPokemon = async (pokemon) =>{
    const apiResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if (apiResponse.status === 200) {
        const data = await apiResponse.json()
        return data
    }

}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Loading";
    pokemonNumber.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default']
        inputSearch.value = ""
        searchPokemon = data.id;
    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :C';
        pokemonNumber.innerHTML = "";
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());
    
})

prev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon)  
    }
})

next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)    
})

renderPokemon(searchPokemon)