---
layout: page
title: Links de interés
---

Hola,

Me he visto muchas veces buscando links en lugares perdidos del internet, así que mejor me hice este lugar para guardar cosas. Ésta es la parte más útil de la página porque puedo dejar link y cosas interesantes.


Algunas palabras [sobre mi, el autor](https://nicomedinap.github.io/about.html){:target="_blank"}.

* Redes sociales: Soy activo a veces en algunas, acá están:
1. [Twitter](https://twitter.com/nicomedinap){:target="_blank"}
2. [Flickr](http://www.flickr.com/photos/73337761@N06/){:target="_blank"}
3. [Instagram](https://www.instagram.com/nicomediap/){:target="_blank"}
4. Escribí un bot en bash+python que sube fotos en instagram, se llama [@DosisDelPasado](https://www.instagram.com/dosisdelpasado/){:target="_blank"}. Esto lo estoy desarrollando desde una pregunta en [Stackoverflow.](https://stackoverflow.com/questions/65215029/upload-vertical-images-to-instagram-using-python?noredirect=1#comment115581214_65215029){:target="_blank"}


* Apariciones en algunos videos:
1. [Astronomía en Vivo: Telescopios, una ventana al Universo.](https://youtu.be/uY6pnWmrERs){:target="_blank"}
2. [REMedia educa: historia de la constitución en Chile.](https://www.instagram.com/tv/CGi9ZtWpls-/?utm_source=ig_web_button_share_sheet){:target="_blank"}
3. [¿Qué background necesito para estudiar física y astronomía?](https://youtu.be/KTGlYMEI48g){:target="_blank"}
4. A veces hago timelapses, subo compilaciónes en este [canal de youtube.](https://www.youtube.com/channel/UC27Vv11KAnccwb0UVy7aXtQ?view_as=subscriber){:target="_blank"}

* Hablando desde la ignorancia: Presentaciones sobre astronomía y su realidad sideral
1. Los colores de las imágenes astronómicas: Charla que trata sobre la composición de las imágenes usadas en la astronomía. Hay dos versiones de esta charla online: [En mi canal de youtube](https://www.youtube.com/watch?v=ebR1Rl9GZuA&t=853s){:target="_blank"}, y dada como [charla pública en Valparaíso](https://youtu.be/GlTSYEglE6w){:target="_blank"}, con la gestión del grupo de difusión del departamento de física y astronomía (IFA).
2. [Interpretación de la luz estelar](https://youtu.be/TjQqw0ymOgU){:target="_blank"}

* [Música en Youtube.](https://nicomedinap.github.io/musica/musica.html){:target="_blank"}
* [Lista de publicaciones en las que participo.](https://arxiv.org/search/astro-ph?searchtype=author&query=Medina%2C+N){:target="_blank"}
1. Hay una persona en un campo relacionado llamada S.-N. X. Medina, ese no soy yo jajajaj pero trabaja en algo relacionado :o. Increíble. 

* [Imagen de la Vía Láctea combinando VVV y VPHAS+.](http://djer.roe.ac.uk/vsa/vvv/mosaic/lb.html?fbclid=IwAR2rdnczc_BdbZ00PKxs0UhU4nivZu7v5ElS-MCvsO2fDsYPB84ESscn9v8){:target="_blank"}
* Colección de Jupyter notebooks en diferentes ciencias
1. [Son dos links diferentes.](https://github.com/jupyter/jupyter/wiki/A-gallery-of-interesting-Jupyter-Notebooks){:target="_blank"}
2. [El anterior era el primero, este es el segundo.](https://notebook.community){:target="_blank"}
* ¯\ \_(ツ)_/¯
* ༼;´༎ຶ ۝ ༎ຶ༽
<!--- * También me gusta escribir, subiré algunos textos [acá.](https://nicomedinap.github.io/escritos/LoQueUnoNecesita.html){:target="_blank"} --->
* [Guía rápida de Markdown.](https://enterprise.github.com/downloads/en/markdown-cheatsheet.pdf){:target="_blank"}
* [Editor de Markdown online.](https://stackedit.io){:target="_blank"}
* [Guía de escritura y expresiones útiles en LateX.](https://es.wikipedia.org/wiki/Ayuda:Uso_de_LaTeX){:target="_blank"}
* [Introducción al análisis de datos en las ciencias biológicas.](http://bebi103.caltech.edu.s3-website-us-east-1.amazonaws.com/2019a/){:target="_blank"}
* [Open astrophysics Bookshelf.](http://open-astrophysics-bookshelf.github.io){:target="_blank"}
* [Apuntes sobre el template usado en este blog.](https://jekyllrb.com/resources/){:target="_blank"}
* [aeropython](https://nbviewer.org/github/barbagroup/AeroPython/tree/master/lessons/){:target="_blank"} : aerodinamica con python
* [Visualización del catálogo messier](https://kosmoved.ru/messier/messier-catalog.php?lang=spa){:target="_blank"}





<!-- include Aladin Lite CSS file in the head section of your page -->
<link rel="stylesheet" href="//aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.css" />
 
<!-- you can skip the following line if your page already integrates the jQuery library -->
<script 
    type="text/javascript" src="//code.jquery.com/jquery-1.12.1.min.js" charset="utf-8">
</script>
 
<!-- insert this snippet where you want Aladin Lite viewer to appear and after the loading of jQuery -->
<div id="aladin-lite-div" style="width:750px;height:750px;">
</div>

<input id="DSS" type="radio" name="survey" value="P/DSS2/color"><label for="DSS">DSS color<label>
<input id="DSS-blue" type="radio" name="survey" value="P/DSS2/blue"><label for="DSS-blue">DSS blue<label>
<input id="2MASS" type="radio" name="survey" value="P/2MASS/color"><label for="2MASS">2MASS<label>
<input id="allwise" type="radio" name="survey" value="P/allWISE/color"><label for="allwise">AllWISE<label>
<input id="glimpse" type="radio" name="survey" value="P/GLIMPSE360"><label for="glimpse">GLIMPSE 360<label>

<script type="text/javascript" src="//aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.js" charset="utf-8">
</script>

<script type="text/javascript">
var aladin;
A.init.then(() => {
    aladin = A.aladin('#aladin-lite-div', {cooFrame: 'galactic', fov: 25});
    aladin.gotoRaDec(240.41683, -23.00781);
    // Parameters are:
    //    <right ascension of final position>,
    //    <declination of final position>,
    //    <animation duration in seconds>
    aladin.animateToRaDec(279.0997500, -23.9047499, 5);
    aladin = A.aladin({fov:3});
  
});
</script>





