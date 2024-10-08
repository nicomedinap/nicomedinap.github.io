---
layout: page
title: Aladin Lite
---

[Aladin](http://aladin.u-strasbg.fr/aladin.gml){:target="_blank"} es un Atlas interactivo de base de datos astronómicas. Está desarrollado para visualizar datos de carácter público y que provienen de diversos telescopios, tanto instalado en la tierra como misiones que están en órbita. Es práctico para obtener imágenes compuestas, y contrastar con objetos astronómicos catalogados en algún estudio.

En la esquina superior izquierda es posible intercambiar entre bases de datos que contienen imágenes en diferentes longitudes de onda, cada una de ellas muestra radiación provocada por diferentes procesos físicos.

Esta aplicación web está inicializada para mostrar tres regiones de formación estelar ubicadas en nuestra línea de visión hacia el [centro galáctico](https://es.wikipedia.org/wiki/Centro_gal%C3%A1ctico){:target="_blank"}, dos de ellas muy emblemáticas: La [Nebulosa de la Laguna (M8)](https://es.wikipedia.org/wiki/Nebulosa_de_la_Laguna){:target="_blank"}, y la [Nebulosa Trifida](https://es.wikipedia.org/wiki/Nebulosa_Tr%C3%ADfida){:target="_blank"}. También se muestra la región de formación estelar [NGC 6559](https://en.wikipedia.org/wiki/NGC_6559){:target="_blank"}, que fue la primera región de formación estelar que estudié en búsqueda de [Objetos Estelares Jóvenes.](https://en.wikipedia.org/wiki/Young_stellar_object){:target="_blank"}. Existen muchos documentos sobre el uso de Aladin Lite, como se muestran en [este ejemplo](https://aladin.cds.unistra.fr/AladinLite/doc/API/examples/){:target="_blank"}

Nota: Por razones que desconozco, no funciona si tu navegador es Safari  ¯\ \_(ツ)_/¯

Tómate un tiempo, y explora nuestra galaxia y el universo! (Si es que no estás usando Safari)

El siguiente link aplica un [zoom dramático](https://nicomedinap.github.io/aladin/ZoomToObject.html){:target="_blank"} a un objeto astronómico: 


<!-- insert this snippet where you want Aladin Lite viewer to appear -->
<div id="aladin-lite-div" style="width:350px;height:650px;"></div>

<input id="DSS" type="radio" name="survey" value="P/DSS2/color"><label for="DSS">DSS color<label>
<input id="2MASS" type="radio" name="survey" value="P/2MASS/color"><label for="2MASS">2MASS<label>
<input id="allwise" type="radio" name="survey" value="P/allWISE/color"><label for="allwise">AllWISE<label>

<script type="text/javascript" src="https://aladin.cds.unistra.fr/AladinLite/api/v3/latest/aladin.js" charset="utf-8"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script>
    $(document).ready(function() {
        // Initialize AladinLite
        let aladin = A.aladin('#aladin-lite-div', {
            survey: "P/DSS2/color",
            fov: 3.5,
            target: "18 06 03 -23 41 20"
        });

        // Fetch the JSON data
        $.getJSON('https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/V4_html/Test_DB.json')
        .done(function(data) {
            // Process the data and create markers
            let markers = data.data.map(item => A.marker(item[0], item[1], {popupTitle: item[2], popupDesc: 'Object details'}));

            // Create a marker layer and add markers
            let markerLayer = A.catalog();
            markerLayer.addSources(markers);

            // Add marker layer to AladinLite
            aladin.addCatalog(markerLayer);
        })
        .fail(function() {
            console.error("Failed to fetch data from JSON.");
        });
        
        // Update survey image on radio button change
        $('input[name=survey]').change(function() {
            aladin.setImageSurvey($(this).val());
        });
    });
</script>