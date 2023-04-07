---
layout: page
title: Apuntes
---

A lo largo de los años he escrito sobre variadas cosas y acá pondré algunos textos algo más especializados. Probablemente para entender estas cosas debas tener nociones de matemáticas, física, programación, y qué se yo qué mas. Por lo mismo, es lo más entretenido.

* [Sobre fotometría PSF (2020)](https://nicomedinap.github.io/2020/05/25/FotometriaPSF.html){:target="_blank"}
* [El atractor de Lorenz (2018)](https://nicomedinap.github.io/2018/11/09/Motivacion.html#El-atractor-de-Lorenz:){:target="_blank"}
* [Mapa sismologico de sudamérica (2018)](https://nicomedinap.github.io/2018/11/09/Motivacion.html#Un-mapa-sismológico-de-Sudamérica){:target="_blank"}
* [Entendiendo la distribución normal (2022)](https://nicomedinap.github.io/2022/12/15/AjustandoUnaDistribucionNormal.html){:target="_blank"}



<html>	

<!-- Estilo -->
<link rel="stylesheet" href="/public/css/EstiloObjetoAstronomico.css"> -->
<body>
	<div class="imagen">

		<div class="imagen-chica">
			<img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/M16/M16_1.jpg" onclick="Desplegar(this)">
			<img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/M16/M16_2.jpg" onclick="Desplegar(this)">
			<img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/M16/M16_3.jpg" onclick="Desplegar(this)">
			<img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/M16/M16_4.jpg" onclick="Desplegar(this)">
			<img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/M16/M16_5.jpg" onclick="Desplegar(this)">
			<img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/Galeria/JWST/M16/M16_6.jpg" onclick="Desplegar(this)">
		</div>

		<div class="imagen-grande">
			<img id="CajaDeImagenes" src="/Users/nicomedinap/Documentos_locales/Composiciones/JWST/M16//JamesWebb_1.jpg" >
		</div>
	</div>

	<script>
		function Desplegar(ImagenChica){
			var ImagenGrande = document.getElementById("CajaDeImagenes");
			ImagenGrande.src = ImagenChica.src; 
		}
	</script>

</body>
</html>