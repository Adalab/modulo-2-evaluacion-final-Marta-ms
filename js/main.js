"use strict"

/*Cuando la usuaria haga click en el buscardor pido los datos al servidor

-seleccionar los elementos del html: input, boton buscar, reset
-recoger lo que ha escrito la usuaria en el input 
-concatenarlo a la direccion del api

*/

const inputSearch = document.querySelector('.js-search');
const buttonSearch = document.querySelector('.js-search-btn');
const resetButton = document.querySelector('.js-reset-btn');
const results = document.querySelector('.js-results');


const handleClick = (event) => {
event.preventDefault();
console.log(event.target);


}

buttonSearch.addEventListener("click", handleClick);
inputSearch.addEventListener("click", handleClick);





/*Pintar tre imágenes de portadas de series anime
 -Conseguir la información -- > peticion al servidor para obtener la 3 imágenes 

*/

// fetch("https://api.jikan.moe/v4/anime?q=naruto")
// .then((response) => {
//     return response.json();
// })
// .then((info) => {
   
//  const series = info.data;
//  console.log(series);

// })

//creo ul vacía