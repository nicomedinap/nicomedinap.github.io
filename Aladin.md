---
layout: page
title: Sobre el autor
---

# Aladin Litle

Aladin es un atlas interactivo de objetos astronómicos. Está desarrollano para visualizar diferentes bases de datos astronómicas de carácter públicas, como imágenes fotométricas y/o objetos catalogados. 

<!-- include Aladin Lite CSS file in the head section of your page -->
<link rel="stylesheet" href="//aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.css" />
 
<!-- you can skip the following line if your page already integrates the jQuery library -->
<script type="text/javascript" src="//code.jquery.com/jquery-1.12.1.min.js" charset="utf-8"></script>
 
<!-- insert this snippet where you want Aladin Lite viewer to appear and after the loading of jQuery -->
<div id="aladin-lite-div" style="width:800px;height:800px;"></div>
<script type="text/javascript" src="//aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.js" charset="utf-8"></script>
<script type="text/javascript">
    var aladin = A.aladin('#aladin-lite-div', {survey: "P/DSS2/color", fov:60, target: "NGC 6559"});
</script>
