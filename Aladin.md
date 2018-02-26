---
layout: page
title: Aladin Lite
---

Aladin es un atlas interactivo de objetos astronómicos. Está desarrollado para visualizar diferentes bases de datos de carácter público, como imágenes y objetos astronómicos catalogados en algún estudio. 

En la esquina superior izquierda es posible intercambiar entre bases de datos que contienene imágenes en diferentes longitudes de onda.

Esta aplicación web está inicializada para mostrar tres regiones de formación estelar, dos de ellas muy emblemáticas: La [Nebulosa de la Laguna (M8)](https://es.wikipedia.org/wiki/Nebulosa_de_la_Laguna){:target="_blank"}, y la [Nebulosa Trifida](https://es.wikipedia.org/wiki/Nebulosa_Tr%C3%ADfida){:target="_blank"}. También se muestra la region de formación estelar [NGC 6559](https://en.wikipedia.org/wiki/NGC_6559){:target="_blank"}, que es el primer objeto que estudié. Tómate un tiempo, y explora nuestra galaxia y el universo!

<!-- include Aladin Lite CSS file in the head section of your page -->
<link rel="stylesheet" href="//aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.css" />
 
<!-- you can skip the following line if your page already integrates the jQuery library -->
<script type="text/javascript" src="//code.jquery.com/jquery-1.12.1.min.js" charset="utf-8"></script>
 
<!-- insert this snippet where you want Aladin Lite viewer to appear and after the loading of jQuery -->
<div id="aladin-lite-div" style="width:600px;height:600px;"></div>
<script type="text/javascript" src="//aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.js" charset="utf-8"></script>
<script type="text/javascript">
    var aladin = A.aladin('#aladin-lite-div', {survey: "P/DSS2/color", fov:3, target: "18 06 03 -23 41 20"});
</script>
