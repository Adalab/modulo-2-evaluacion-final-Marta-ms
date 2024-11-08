Módulo 2: Ejercicio de evaluación final

ENUNCIADO

El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de anime, que nos permite
des/marcar las series como favoritas y guardarlas en local storage.
El ejercicio también tiene una parte de maquetación con HTML y Sass (o css), os recomendamos dedicar
esfuerzo a la maquetación una vez terminada la parte de JavaScript, ya que los criterios de evaluación están
relacionados con esta última.

hitos del ejercicio:

1.Estructura básica

-Un campo de texto y un botón para buscar series por su título.
-Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.

2.Búsqueda
-Al hacer clic sobre el botón de Buscar, la aplicación debe conectarse al API abierto de Jikan para la búsqueda de series de anime.

3.Favoritos
Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son sus series favoritas.
Para ello, al hacer clic sobre una serie debe pasar lo siguiente:
El color de la fuente se cambia, indicando que es una serie favorita.
Hay que mostrar un listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda, con las series favoritas. Os recomendamos crear un variable o constante de tipo array en JS para almacenar las series favoritas.
Las series favoritas aparecen a la izquierda aunque la usuaria realice otra búsqueda.

4.Almacenamiento local
Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado de favoritos se debe mostrarse.
