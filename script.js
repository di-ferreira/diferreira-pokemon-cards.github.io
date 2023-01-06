const typeColor = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#74b9ff",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
};

const url = " https://pokeapi.co/api/v2/pokemon/";

const cardContainer = document.getElementById("card");

const btn = document.getElementById("btn");

const input = document.getElementById('Input')

const addZero = (data, totalZeros) => {
    return String(data).padStart(totalZeros, '0');
}

const getPokeData = async (PokeID) => {
    let cards = cardContainer.getElementsByClassName('card');

    if (cards.length <= 1) {
        cardContainer.style.justifyContent = 'center';
    } else {
        cardContainer.removeAttribute(style);
    }

    if (PokeID == '') {
        const finalUrl = url + '?limit=150';
        const response = await fetch(finalUrl);
        const data = await response.json();
        const Pokemons = data.results;

        Pokemons.forEach(Pokemon => {
            getPokeData(Pokemon.name)
        })
    }
    else {
        const finalUrl = url + PokeID;
        const response = await fetch(finalUrl);
        const data = await response.json();
        generateCard(data, cardContainer)
    }
};

let generateCard = (data, container) => {
    const hp = data.stats[0].base_stat;
    const num = data.id;
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;

    const themeColor = typeColor[data.types[0].type.name];

    let card = document.createElement("article");
    card.classList.add('card');
    card.innerHTML = `
        <figure class="card-image"></figure>
        <h2 class="card-name">
            ${pokeName}
        </h2>
        <span class="card-num">${'#' + addZero(num, 3)}</span>

        <div class="card-types"></div>

        <div class="card-stats">
            <div class="stat">
                <div class="value">${hp}</div>
                <div class="type">hp</div>
            </div>
            <div class="stat">
                <div class="value">${statAttack}</div>
                <div class="type">Attack</div>
            </div>
            <div class="stat">
                <div class="value">${statDefense}</div>
                <div class="type">Defense</div>
            </div>
            <div class="stat">
                <div class="value">${statSpeed}</div>
                <div class="type">Speed</div>
            </div>
        </div>
  `;

    let Pokeimage = card.querySelector('.card-image');
    Pokeimage.style.background = `url(${imgSrc}) no-repeat center`;
    container.appendChild(card);
    appendTypes(data.types, card);
    styleCard(themeColor, card);
};

let appendTypes = (types, card) => {
    types.forEach((item) => {
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;
        span.style.backgroundColor = typeColor[item.type.name];
        card.querySelector(".card-types").appendChild(span);
    });
};

let styleCard = (color, card) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
    let cardStats = card.querySelector(".card-stats");
    cardStats.style.backgroundColor = color;
};

btn.addEventListener("click", () => {
    let cards = cardContainer.getElementsByClassName('card');
    for (let i = cards.length - 1; i >= 0; i--) {
        cards[i].remove();
    }
    getPokeData(input.value.toLowerCase())
});


window.addEventListener("load", getPokeData(''));
