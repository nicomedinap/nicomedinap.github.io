---
layout: page
title: Links de interés
---

Acá algunos links que pueden ser de utilidad para astrofísicos, programadores y stalkers:
 
* [Lista de publicaciones.](https://arxiv.org/){:target="_blank"}
* [Redes Sociales.](https://twitter.com/nicomedinap){:target="_blank"}
* [Fotografías.](http://www.flickr.com/photos/73337761@N06/){:target="_blank"}


<!-- include Aladin Lite CSS file in the head section of your page -->
<link rel="stylesheet" href="//aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.css" />
 
<!-- you can skip the following line if your page already integrates the jQuery library -->
<script type="text/javascript" src="//code.jquery.com/jquery-1.12.1.min.js" charset="utf-8"></script>
 
<!-- insert this snippet where you want Aladin Lite viewer to appear and after the loading of jQuery -->
<div id="aladin-lite-div" style="width:400px;height:400px;"></div>
<script type="text/javascript" src="//aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.js" charset="utf-8"></script>
<script type="text/javascript">
    var aladin = A.aladin('#aladin-lite-div', {survey: "P/DSS2/color", fov:60});
</script>
