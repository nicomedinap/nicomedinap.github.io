---
layout: galeria
title: Composiciones
telescopio: none
--- 

<html lang="es">
<head>
	<meta charset="utf-8">
	<meta name="description" content="Composiciones">
	<meta name="keywords" content="HTML5">
	<title>Galeria de fotos </title>

<style>

	h1{
		color: white;
		text-align: center;
		padding: 10px 0;
		font-size: 50px;
	}

	/* El siguiente tag lo agregué para que  */

	h2{
		color: white;
		text-shadow: 1px 2px 2px black, 0 0 25px blue, 0 0 5px blue;
		text-align: center;
		padding: 10px 0;
		font-size: 50px;
		}

	body {
		background: black;
	}

	p{
	  	font-size: 20px;
	}

	div.galeria{
	/*	margin:  10px 10px;
		box-shadow: 0 4px 8px lightskyblue, 0 6px 20px rgba(0, 0, 0, 0.19);
		float:  left;
		width: 300px;*/

		display:  grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		width: 95%;
		height: 23%;
		margin: auto;
		grid-gap: 10px;
		padding:  0px 0;
		overflow: hidden;
		cursor: pointer;
	}

	div.galeria img{
		vertical-align: top;
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	div.pie{
		text-align: center;
		text-shadow: 2px 2px 5px purple;
		padding: 5px;
	}

	.pie p{
		font-size: 20px;
	}

	div.galeria:hover{
		border:  0px solid black;
	 	transition: transform 225ms;
	  	transform: translateY(-10px);
	}

	@media screen and (max-width: 600px) {
  		.page_title {font-size: 20px} 
	}

</style>


<!-- Local -->
<!-- <link rel="stylesheet" href="/Users/nicomedinap/Documents/GitHub/nicomedinap.github.io/public/css/galeria.css"> -->

<!-- Publico -->
<!--<link rel="stylesheet" href="/public/css/galeria.css"> -->

</head>

<h1 class="page_title">Galería de imágenes de objetos astronómicos</h1>




<!--Una de las consecuencias más fascinantes de que la luz tenga una velocidad finita, es que en realidad siempre estamos percibiendo el pasado. Para la luz cercana a nuestros ojos ese efecto es indetectable, por supuesto, pero para objetos tan, tan alejados como las estrellas o galaxias, este efecto nos permite acceder al pasado de nuestro universo. 

Los telescopios son verdaderas máquinas del tiempo

-->

<p> En los últimos 100 años se han generado una increible cantidad de información astronómica. Cada telescopio ha ayudado a develar los secretos más profundos de nuestra realidad, plasmando colores y estructuras fascinantemente inimaginables.</p>

<p>Aquí dejaré mi visión personal de diferentes objetos astronómicos, usando datos liberados de telescopios profesionales y misiones satelitales. </p>

<br>
<br>

<body>
	<!-- <h1 style="font-size:3vw">Composiciones de imágenes astronómicas</h1> -->
	<div class="galeria" target="_blank" onclick="location.href='https://nicomedinap.github.io/Galeria/JWST.html';">
    	<div class="foto">
        	<img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/imagenes/LDN1527/0.jpg" width="400" height="400">
        </div>
        <div class="pie">
        	<p> Telescopio espacial James Webb (JWST)</p>
        </div>
	</div>
        
    <div class="galeria" target="_blank" onclick="location.href='https://nicomedinap.github.io/Galeria/VISTA.html';">
    	<div class="foto">
        	<img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/imagenes/VISTA/3.png" width="100" height="600">
        </div>
        <div class="pie">
        	<p> Telescopio VISTA </p>
        </div>
	</div>

	<div class="galeria" target="_blank" onclick="location.href='https://nicomedinap.github.io/Galeria/HST.html';">
    	<div class="foto">
        	<img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/imagenes/HST/M17_SFR0.png" width="100" height="600">
        </div>
        <div class="pie">
        	<p> Telescopio espacia Hubble (HST)</p>
        </div>
	</div>

	<div class="galeria">
    	<div class="foto" target="_blank" onclick="location.href='https://nicomedinap.github.io/Galeria/JUNO.html';">
        	<img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/imagenes/JUNO/prueba0.png" width="100" height="600">
        </div>
        <div class="pie">
        	<p> Misión JUNO</p>
        </div>
	</div>

	<div class="galeria">
    	<div class="foto" target="_blank" onclick="location.href='https://nicomedinap.github.io/Galeria/UKIRT.html';">
        	<img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/UKIRT/WFCAM/PilaresCreacion/210.jpg" width="100" height="600">
        </div>
        <div class="pie">
        	<p> Telescopio UKIRT</p>
        </div>
	</div>




</body>
</html>