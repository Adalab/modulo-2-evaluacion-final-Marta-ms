"use strict"

/*Cuando la usuaria haga click en el buscardor pido los datos al servidor

-seleccionar los elementos del html: input, boton buscar, reset
-recoger lo que ha escrito la usuaria en el input 
-concatenarlo a la direccion del api

*/

const inputSearch = document.querySelector('.js-search');
const buttonSearch = document.querySelector('.js-search-btn');
const resetButton = document.querySelector('.js-reset-btn');
let results = document.querySelector('.js-results');


const handleClick = (event) => {
event.preventDefault();
const searchValue = inputSearch.value; //recojo lo que escribe la usuaria
// console.log('busqueda:', searchValue);

}

buttonSearch.addEventListener("click", handleClick);
inputSearch.addEventListener("click", handleClick);





/*Pintar tre imágenes de portadas de series anime
 -Conseguir la información -- > peticion al servidor para obtener la 3 imágenes 

*/

fetch("https://api.jikan.moe/v4/anime?q=naruto")
.then((response) => {
    return response.json();
})
.then((info) => {
   
 const series = info.data; //objeto
 const data = series[0];
 console.log(data);
 results.innerHTML = `<li>
        <h1>${data.title}</h1>
        <img src="${data.images.jpg.image_url}" alt="${data.title}">
        </li>`;

//  const data = series[0].images.jpg.image_url; //array
//  console.log(data);
//  results = [data, searchValue];
//  results.innerHTML = `<ul>${results.images.jpg.image_url}</ul>`;
})

