// PEGANDO OS ELEMENTOS DA PAGINA
const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('.form');
const input = document.querySelector('.buscar');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let pokemonAtual = 1;

// FUNÇÃO QUE IRÁ FAZER REQUISIÇÃO NA API
async function buscarPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    
    // realizando a requisição e obtendo a uma resposta
    const response = await fetch(url);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    }

}
// função que irá renderizar o pokemon na pagina
async function renderPokemon(pokemon) {
    pokemonName.innerText = "Carregando...";
    pokemonNumber.innerText = "";
    
    const data = await buscarPokemon(pokemon);
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerText = data.name;
        pokemonNumber.innerText = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
        ['animated']['front_default'];
        input.value = '';
        pokemonAtual = data.id;
    }
    else {
        pokemonName.innerText = "Não encontrado :(";
        pokemonNumber.innerText = "";
        pokemonImage.style.display = 'none';
    }
}

// evento de submit do formulario
form.addEventListener('submit', (e) => {
    //impede a pégina de dar o 'reload'
    e.preventDefault();
    //chamando a função renderPokemon passando value digitado no input
    renderPokemon(input.value.toLowerCase());
})

// botao para passar para o proximo ou o anterior
btnNext.addEventListener('click',() => {
    pokemonAtual++;
    renderPokemon(pokemonAtual);
})
btnPrev.addEventListener('click',() => {
    if (pokemonAtual > 1) {
        pokemonAtual--;
        renderPokemon(pokemonAtual);
    }
})


renderPokemon(pokemonAtual);
