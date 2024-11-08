"use strict"

/*Cuando la usuaria haga click en el buscardor pido los datos al servidor

-seleccionar los elementos del html: input, boton buscar, reset
-recoger lo que ha escrito la usuaria en el input 
-concatenarlo a la direccion del api
*/

const inputSearch = document.querySelector('.js-input-search');
const buttonSearch = document.querySelector('.js-btn-search');
const resetButton = document.querySelector('.js-btn-reset');
// const formElement =document.querySelector('.js-form');
const resultsList = document.querySelector('.js-list-results');
const favourites = document.querySelector('.js-list-favourites');
let seriesList = []; // lista de series que se van a mostrar en el html
let seriesFavourites = [];



// const series = info.data; //objeto accedo y guardo toda la información de las series 


/*2.2Por cada serie que contiene el resultado---bucle for of
-pinto las series con su titulo en el html cuando me la devuelva el servidor
-Si la busqueda no tiene imagen, buscar una de relleno (placeholder.com)*/

const renderSeriesList = (series) => {
    for (const serie of series) {
        resultsList.innerHTML += `<li id=${serie.dataId}>
        <h1>${serie.dataTitle}</h1>
        <img src="${serie.dataImage}" alt="${serie.dataTitle}"/>
         </li>`;
    }
}; //OK

/*2.pido los datos al servidor
-cuando la usuaria haga click en buscar 
    -recojo el valor del input
          ---> pido los datos al servidor

*/

function handleButtonSearch(ev){
    ev.preventDefault();
    const searchValue = inputSearch.value;

    fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`) //concatenar searchValue es lo que busca la usuaria y lo que manda al servidor
        .then((response) => response.json())
        .then((info) => {
        // console.log(info); //info ---> data
        const series = info.data; //objeto accedo y guardo toda la información de las series 
        // console.log("series es", series);
        resultsList.innerHTML= "";
        for (const serie of series) {
            //console.log(serie); //serie ---> objeto
            //recojo en una variable la información que quiero de cada serie: titulo,imagen,id

            let dataImage = serie.images.jpg.image_url;
            if (dataImage === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"){
                dataImage = "https://picsum.photos/200/300";
            }

            // resultsList.innerHTML += `
            // <li id=${serie.dataId}>
            // <h1>${serie.dataTitle}</h1>
            // <img src="${serie.dataImage}" alt="${serie.dataTitle}"/>
            //  </li>`;
            const dataTitle = serie.title;
            // dataImage = serie.images.jpg.image_url;
            const dataId = serie.mal_id;
            

            seriesList.push({ //agregar los elementos obtenido en una lista (array) para luego renderizarlos en html
                dataTitle,
                dataImage,
                dataId,
            }); 

            const seriesSelects = document.querySelectorAll(".js-series");
            for (const serieSelect of seriesSelects) { 
                serieSelect.addEventListener("click", handleAddFavourites);
                console.log("has hecho click");

            }
        renderSeriesList(seriesList);
      };
    });

};
    

//añadir nueva serie a la lista

//pintar la lista de favoritas
const renderSelectedFavourites = (series) => {
    favourites.innerHTML = "";
    for (const serie of series) {
      favourites.innerHTML += `
          <li class="js-serie" id=${serie.mal_id}>
              <img
                src=${serie.urlImage}
                alt="${serie.titleSerie}"
              />
              <p>${serie.titleSerie}</p>
            </li>
          `;
    }
  }; //OKK

  //1.Escucho el click de la búsqueda
buttonSearch.addEventListener("click", handleButtonSearch);




//SAVE LOCAL STOREAGE


const handleAddFavourites = (event) => {
    const idSerieSelect = event.currentTaregt.id; //recojo id de las series que selecciona
    const seriesSelectFavourites = seriesList.find((series) => {
        return dataId === parseInt(idSerieSelect); //buscar lo seleccionado
        
    });
    
    seriesFavourites.push(seriesSelectFavourites);

    //cuando la usuaria haga click cambia el titulo de color
    idSerieSelect.classList.add("style-fav");

    renderSeriesList(seriesFavorites);
    savedLocalStoreage(seriesFavorites);

    //pintar la lista de favoritas

    
}

// const seriesSelected = document.querySelectorAll(".js-anime");
// for (const selected of seriesSelected){
//     selected.addEventListener("click", handleAddFavorites);//convertir la lista a string para enviarla al servidor
// }   
   

    // seriesFavourites.innerHTML += `<li id=${seriesSelectFavorites.dataId}>
    //     <h1>${seriesSelectFavorites.dataTitle}</h1>
    //     <img src="${seriesSelectFavorites.dataImage}" alt="${seriesSelectFavorites.dataTitle}"/>
    //      </li>`;


    // //localStore
    // localStorage.setItem("animeFavourites", JSON.stringify(seriesFavorites));
    // savedAnimeFavourites = JSON.parse(localStorage.getItem("animeFavourites"));

