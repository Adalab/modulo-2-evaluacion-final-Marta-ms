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

// inputSearch.addEventListener("click", handleClick);
// formElement.addEventListener("submit", getData);

// /*Pintar tre imágenes de portadas de series anime
//  -Conseguir la información -- > peticion al servidor para obtener la 3 imágenes 
// */

// const series = info.data; //objeto accedo y guardo toda la información de las series 

// for (const serie of series){
// let content =  `<li>
// <h1>${series.title}</h1>`
//     for (const image of series.images) {
//         content += `<img src="${series.images.jpg.image_url}" alt="portada">`
//     }
//     content += `</li>`;
//     results.innerHTML += content;
// }


/*2.2Por cada serie que contiene el resultado---
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

//pintar la lista de favoritas
const renderSelectedFavourites = (series) => {
    favourites.innerHTML = "";
    for (const serie of series) {
      favourites.innerHTML += `
          <li class="js-serie" id=${serie.idSerie}>
              <img
                src=${serie.urlImage}
                alt="${serie.titleSerie}"
              />
              <p>${serie.titleSerie}</p>
            </li>
          `;
    }
  }; //OKK

  //añadir nueva serie a la lista
  const addNewFav = () => {
    const seriesSelects = document.querySelectorAll(".js-serie");
    for (const serieSelect of seriesSelects) {
      serieSelect.addEventListener("click", handleAddFavourites);
    }
  };

//SAVE LOCAL STOREAGE


/*2.pido los datos al servidor
-cuando la usuaria haga click en buscar 
    -recojo el valor del input
          ---> pido los datos al servidor

*/

const handleButtonSearch = (ev) => {
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
            
        }
        renderSeriesList(seriesList);
        renderSelectedFavourites();
      });
};
    
//1.Escucho el click de la búsqueda
buttonSearch.addEventListener("click", handleButtonSearch);


const handleAddFavourites = (event) => {
    const idSerieSelect = event.currentTaregt.id; //recojo id de las series que selecciona
    const seriesSelectFavorites = seriesList.find((serie) => {
        return serie.dataId === parseInt(idSerieSelect); //buscar lo seleccionado
    })
    seriesFavourites.push(seriesSelectFavorites);

    renderSeriesList(seriesFavorites);
    savedLocalStoreage(seriesFavorites);
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



// favorites.addEventListener("click", handleAddFavorites);