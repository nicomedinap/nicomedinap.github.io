---
layout: page
title: Aladin Lite
---

[Aladin](http://aladin.u-strasbg.fr/aladin.gml){:target="_blank"} es un Atlas interactivo de base de datos astronómicas. Está desarrollado para visualizar datos de carácter público y que provienen de diversos telescopios, tanto instalado en la tierra como misiones que están en órbita. Es práctico para obtener imágenes compuestas, y contrastar con objetos astronómicos catalogados en algún estudio.

En la esquina superior izquierda es posible intercambiar entre bases de datos que contienen imágenes en diferentes longitudes de onda, cada una de ellas muestra radiación provocada por diferentes procesos físicos.

Esta aplicación web está inicializada para mostrar tres regiones de formación estelar ubicadas en nuestra línea de visión hacia el [centro galáctico](https://es.wikipedia.org/wiki/Centro_gal%C3%A1ctico){:target="_blank"}, dos de ellas muy emblemáticas: La [Nebulosa de la Laguna (M8)](https://es.wikipedia.org/wiki/Nebulosa_de_la_Laguna){:target="_blank"}, y la [Nebulosa Trifida](https://es.wikipedia.org/wiki/Nebulosa_Tr%C3%ADfida){:target="_blank"}. También se muestra la región de formación estelar [NGC 6559](https://en.wikipedia.org/wiki/NGC_6559){:target="_blank"}, que fue la primera región de formación estelar que estudié en búsqueda de [Objetos Estelares Jóvenes.](https://en.wikipedia.org/wiki/Young_stellar_object){:target="_blank"}. Existen muchos documentos sobre el uso de Aladin Lite, como se muestran en [este ejemplo](https://aladin.cds.unistra.fr/AladinLite/doc/API/examples/){:target="_blank"}

Tómate un tiempo, y explora nuestra galaxia y el universo!



<!-- insert this snippet where you want Aladin Lite viewer to appear -->
<div id="aladin-lite-div" style="width:350px;height:650px;"></div>

<input id="DSS" type="radio" name="survey" value="P/DSS2/color"><label for="DSS">DSS color<label>
<input id="DSS-blue" type="radio" name="survey" value="P/DSS2/blue"><label for="DSS-blue">DSS blue<label>
<input id="2MASS" type="radio" name="survey" value="P/2MASS/color"><label for="2MASS">2MASS<label>
<input id="allwise" type="radio" name="survey" value="P/allWISE/color"><label for="allwise">AllWISE<label>


<script type="text/javascript" src="https://aladin.cds.unistra.fr/AladinLite/api/v3/latest/aladin.js" charset="utf-8"></script>

<script type="text/javascript">
let aladin;
A.init.then(() => {
    aladin = A.aladin('#aladin-lite-div', {survey: "P/DSS2/color", fov:3.5, target: "18 06 03 -23 41 20"});

    aladin.gotoRaDec(266.41683, -29.00781);
    aladin.animateToRaDec(305.5, 38.5, 70);

});
</script>