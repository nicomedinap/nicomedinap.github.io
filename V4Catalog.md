---
layout: page
title: Catálogo V⁴
---
El Catálogo V⁴ contendrá la información que he sa recolectado usando el método descrito en [mi primer paper](https://arxiv.org/pdf/1806.04061.pdf){:target="_blank"}, usando los datos disponibles en la base de datos VVV.
Para cada tile analizado, habrá un link donde estarán disponibles todas las curvas de luz dentro del catálogo, y un plot con la serie de tiempo.





* [d001](https://nicomedinap.github.io/V4_html/Variables_d001.html){:target="_blank"}
* [d002](https://nicomedinap.github.io/V4_html/Variables_d002.html){:target="_blank"}

* [d045]
* [d046]
* [d083]
* [d084]



<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial;
}

/* The grid: Four equal columns that floats next to each other */
.column {
  float: left;
  width: 25%;
  padding: 10px;
}

/* Style the images inside the grid */
.column img {
  opacity: 0.8; 
  cursor: pointer; 
}

.column img:hover {
  opacity: 1;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* The expanding image container */
.container {
  position: relative;
  display: none;
}

/* Expanding image text */
#imgtext {
  position: absolute;
  bottom: 15px;
  left: 15px;
  color: white;
  font-size: 20px;
}

/* Closable button inside the expanded image */
.closebtn {
  position: absolute;
  top: 10px;
  right: 15px;
  color: white;
  font-size: 35px;
  cursor: pointer;
}
</style>
</head>
<body>

<div style="text-align:center">
  <h2>Tabbed Image Gallery</h2>
  <p>Click on the images below:</p>
</div>

<!-- The four columns -->
<div class="row">
  <div class="column">
    <img src="img_nature.jpg" alt="Nature" style="width:100%" onclick="myFunction(this);">
  </div>
  <div class="column">
    <img src="img_snow.jpg" alt="Snow" style="width:100%" onclick="myFunction(this);">
  </div>
  <div class="column">
    <img src="img_mountains.jpg" alt="Mountains" style="width:100%" onclick="myFunction(this);">
  </div>
  <div class="column">
    <img src="img_lights.jpg" alt="Lights" style="width:100%" onclick="myFunction(this);">
  </div>
</div>

<div class="container">
  <span onclick="this.parentElement.style.display='none'" class="closebtn">&times;</span>
  <img id="expandedImg" style="width:100%">
  <div id="imgtext"></div>
</div>

<script>
function myFunction(imgs) {
  var expandImg = document.getElementById("expandedImg");
  var imgText = document.getElementById("imgtext");
  expandImg.src = imgs.src;
  imgText.innerHTML = imgs.alt;
  expandImg.parentElement.style.display = "block";
}
</script>
