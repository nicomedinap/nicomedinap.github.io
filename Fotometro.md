---
layout: default
title: Fotometro
mathjax: true
---
{% include mathjax.html %}

[páginas de Github](https://pages.github.com/){:target="_blank"} 




## Fotómetro: series de tiempo con fotometría PSF desde la base de datos VVV/VVVX

El anánisis fotométrico es fundamental para la caracterización masiva de estrellas alrededor de nuestra humilde tierra. 

## Búsquedas SQL 


## 


## Calibración de los datos

La calibración de la fotometría instrumental será llevada a cabo utilizando la fotometría de apertura disponible en la base de datos de CASU. Se tomarán todos los catálogos y se crearán las series de tiempo con las mediciones de apertura. Luego, se aplicarán reetricciones sobre la dispersión y amplitud de la serie de tiempo. 

Las estrellas que presenten baja amplitud y dispersión fotométrica serán elegidas para la calibración de los datos al sistema VVV. Esta calibración debe ser realizada en cada una de las épocas disponibles. Con esto en mente, tenemos que la fotometría calibrada será: 

<p>$$\displaystyle m_{cal} = m_{aper} \cdot s + b$$</p>

donde $s$ es la pendiente del ajuste lineal.


## Lista de cosas por hacer

- [x] Crear un sitio en el blog "Fotómetro"
- [ ] Publicar código en github
- [ ] Fotometría de los siguientes tiles

