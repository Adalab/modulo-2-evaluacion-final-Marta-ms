"use strict"

/*Pintar tre imágenes de portadas de series anime
 -Conseguir la información -- > peticion al servidor para obtener la 3 imágenes 

*/

fetch("https://api.jikan.moe/v4/anime?q=naruto")
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data)
    const images = data.images;
    console.log(images);
})

//creo ul vacía