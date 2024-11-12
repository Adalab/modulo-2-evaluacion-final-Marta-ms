"use strict"


const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");
const reset = document.querySelector(".js-reset");
const favouritesList = document.querySelector(".js-favourites");
const results = document.querySelector(".js-list");
let listElement = [];
let listFavourites = [];
let listSelectFavourites = document.querySelector(".js-favourites");


//PRIMERO

//Pintar las paletas en el hatml
function renderSeries() {
    for (const series of listElement) {
        let image = series.images.jpg.image_url;

        if (image === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            // console.log("que pasa");
            image = "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256";

        }

        //lista de mi html
        results.innerHTML += `
            <li class="style-fav js-anime" id=${series.mal_id}>
            <h1>${series.title}</h1>
            <img src="${image}" alt="${series.title}" />
            </li>
            `

        
        //recoger TODAS las series
        const animes = document.querySelectorAll(".js-anime"); //me devuelve un array
        for (const anime of animes) {
            anime.addEventListener("click", handleAddFavourites);
        }
    }
}


//cuando haga click, coger datos de la api para buscar lo que escriba en el input
//función manejadora del click del botón buscar
function handleClick(event) { 
    event.preventDefault();
    const inputValue = input.value; //recojo el valor del input
    //console.log(listElement);
    fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then(response => response.json())
    .then(info => {
        listElement = info.data;
        renderSeries(); //datos obtenidos
        // console.log("ha hecho click");
    })
}
button.addEventListener("click", handleClick);

//SEGUNDO
/*Seleccionar las series favoritas
    -seleccionar elementos html
    -cuando la usuaira haga click
        -recoger las series seleccionadas
        -pintar series en la lista de favoritos

*/

function handleAddFavourites(event) {
    console.log("click en anime");
    const seriesId = event.currentTarget.id;
    

    //buscar las portadas clicadas
    const seriesSelect = listElement.find(series => series.mal_id === parseInt(seriesId));
    //console.log(seriesSelect);

    //añadir a lista de favoritos
    listFavourites.push(seriesSelect);
    //console.log(listFavourites);
    
    
    //añadir lista de favoritos al localStoreage
    localStorage.setItem("favourites", JSON.stringify(listFavourites));
    

    //pintar desde localstoreage
    listSelectFavourites.innerHTML +="";
    //añadir clase cuando sea seleccionada
    listSelectFavourites.classList.toggle("favourites"); 
    localFavourites();
}

//añadir a la lista de fav
function localFavourites() { 
    for (const selection of listFavourites) {
        listSelectFavourites.innerHTML += `
        <li class="style-fav" id=${selection.mal_id}>
        <h1>${selection.title}</h1>
        <img src="${selection.images.jpg.image_url}" alt="${selection.title}" />
        </li>
        `
    }
}

//TERCERO
//recoger lista de fav en localstoreage
const localStoreageFav = JSON.parse(localStorage.getItem("favourites"));
//console.log(localStoreageFav);


if (localStoreageFav !== null) {
    listFavourites = localStoreageFav;
    localFavourites(localStoreageFav);
}



//RESET
function handleReset(event) {
    event.preventDefault();
    listSelectFavourites.innerHTML = "";
    results.innerHTML = "";
    input.value = "";
    localStorage.clear();
    listFavourites = [];
}

//escucho el boton reset
reset.addEventListener("click", handleReset);
