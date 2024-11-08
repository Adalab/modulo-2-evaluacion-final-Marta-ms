"use strict"

/*Cuando la usuaria haga click en el buscardor pido los datos al servidor

-seleccionar los elementos del html: input, boton buscar, reset
-recoger lo que ha escrito la usuaria en el input 
-concatenarlo a la direccion del api

*/

const inputSearch = document.querySelector('.js-input-search');
const buttonSearch = document.querySelector('.js-btn-search');
const resetButton = document.querySelector('.js-btn-reset');
const formElement =document.querySelector('.js-form');
const results = document.querySelector('.js-list-results');
let seriesList = []; // lista de series que se van a mostrar en el html
let seriesFavorites = [];


// const handleClick = (event) => {
// event.preventDefault();
// const searchValue = inputSearch.value; //recojo lo que escribe la usuaria
// // console.log('busqueda:', searchValue);

// }


// inputSearch.addEventListener("click", handleClick);
// formElement.addEventListener("submit", getData);





// /*Pintar tre imágenes de portadas de series anime
//  -Conseguir la información -- > peticion al servidor para obtener la 3 imágenes 

// */

// fetch("https://api.jikan.moe/v4/anime?q=naruto")
// .then((response) => {
//     return response.json();
// })
// .then((info) => {
//     console.log(info);
   
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

   
    




//  const data = series[0];
//  console.log(data);
//  results.innerHTML = `<li>
//         <h1>${data.title}</h1>
//         <img src="${data.images.jpg.image_url}" alt="${data.title}">
//         </li>`; ESTO FUNCIONA

//  const data = series[0].images.jpg.image_url; //array
//  console.log(data);
//  results = [data, searchValue];
//  results.innerHTML = `<ul>${results.images.jpg.image_url}</ul>`;
//

/*2.2Por cada serie que contiene el resultado---
-pinto las series con su titulo en el html cuando me la devuelva el servidor
-Si la busqueda no tiene imagen, buscar una de relleno (placeholder.com)*/

const renderSeriesList = (series) => {
    for (const serie of series) {
        results.innerHTML += `<li id=${serie.dataId}>
        <h1>${serie.dataTitle}</h1>
        <img src="${serie.dataImage}" alt="${serie.dataTitle}"/>
         </li>`;
    }
};



/*2.pido los datos al servidor
-cuando la usuaria haga click en buscar 
    -recojo el valor del input
          ---> pido los datos al servidor

*/

const handleButtonSearch = () => {
    const searchValue = inputSearch.value;

    fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`) //concatenar searchValue es lo que busca la usuaria y lo que manda al servidor
    .then((response) => response.json())
    .then((info) => {
        // console.log(info); //info ---> data
        const series = info.data; //objeto accedo y guardo toda la información de las series 
        // console.log("series es", series);

        for (const serie of series) {
            //console.log(serie); //serie ---> objeto

            //recojo en una variable la información que quiero de cada serie: titulo,imagen,id

            const dataTitle = serie.title;
            const dataImage = serie.images.jpg.image_url;
            const dataId = serie.mal_id;

            seriesList.push({ //agregar los elementos obtenido en una lista (array) para luego renderizarlos en html
                dataTitle,
                dataImage,
                dataId,
            })     
        }
        renderSeriesList(seriesList);
        // addSeriesFavorites();
    });
};
    
//1.Escucho el click de la búsqueda
buttonSearch.addEventListener("click", handleButtonSearch);