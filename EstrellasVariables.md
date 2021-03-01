---
layout: page
title: Estrellas variables
---

Acá iré juntando imágenes de estrellas variables que he podido identicar a lo largo de mi investigación usando principalmente la base de datos VVV, además de la serie de tiempo que construimos y usamos para poder identificarla.

Parte de la metodología está explicada en un post anterior, llamado [Los colores de las imágenes astronómicas](https://nicomedinap.github.io/2020/09/07/ImagenesAstronomicas.html){:target="_blank"}, primero obtenemos las imágenes de la estrella de interés y sus alrededores y las juntamos para producir imágenes de color falso en el infrarrojo cercano.

Las imágenes serán compuestas usando las mismas imágenes J y H, sólo reemplazando la imagen $K_{s}$, por lo que en la mayor parte de los casos, la fuente de brillo variable se verá de color excesivamente rojo, aunque su naturaleza de por si ya lo sea. 

Cada estrella tendrá dos imágenes para poder comparar su cambio de brillo, y también la serie de tiempo para los más entendido. Si viene algún estadístico, olvídense de ver mediciones fotométricas con incertezas asociadas, la amplitud del brillo de estos bichos astronómicos es inmensa. 

falta:
- [ ] Poner escalas de tamaño en la imagen.
- [ ] Mostrar periodos si es que la fuente lo muestra.
- [x] Hacer más listas.
- [ ] Fecha o día Juliano de la imágen, que sea.
- [ ] Agregar la serie de tiempo.
- [ ] Crear GIFs con ambas imágenes para mejorar la visualización.
- [ ] Información adicional de las fuentes. ¿Relato? ¿Imagen del DSS?


<ul>
	{% for post in site.estrellas %}
		{% if post.layout == "estrella" %}
			<p>
            	<h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
            	<h5>{{ post.date | date_to_string }}</h5>
            	<p>{{ post.content | truncatewords: 500 }} <a href="{{ post.url }}">leer más ( ಠ‿ಠ)</a></p>
        	</p>
    	{% endif %}
 	{% endfor %}
</ul>


## Otra estrella con nombre raro

