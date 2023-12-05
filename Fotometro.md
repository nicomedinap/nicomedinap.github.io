---
layout: default
title: Fotometro
---
{% include mathjax.html %}

[páginas de Github](https://pages.github.com/){:target="_blank"}, 

## Sobre el proyecto Fotómetro

El principal objetivo de **Fotómetro** es el brindar un espacio experimental para poder aportar en la divulgación de este vasto campo recurriendo a varios enfoques, como los lenguajes de programación y la matemática involucrada. Nunca he tenido claro qué es este espacio, la verdad. A mi me gusta visitarlo mucho. 

## Lista de cosas por hacer

- [x] Crear un lugar para tu blog.
- [x] Entender todos los aspectos del blog.
- [ ] Fotometría de los siguientes tiles
- [ ] 


$$\displaystyle \frac{\rm dx}{\rm dt} = \sigma(y - x)$$
$$\displaystyle \frac{\rm dy}{\rm dt} = x(\rho - z) - y$$
$$\displaystyle \frac{\rm dz}{\rm dt} = xy - \beta z$$


<p>$$\displaystyle \frac{\rm dx}{\rm dt} = \sigma(y - x)$$</p>
<p>$$\displaystyle \frac{\rm dy}{\rm dt} = x(\rho - z) - y$$</p>
<p>$$\displaystyle \frac{\rm dz}{\rm dt} = xy - \beta z$$</p>


<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">

<p>$$\displaystyle \frac{\rm dx}{\rm dt} = \sigma(y - x)$$</p>
<p>$$\displaystyle \frac{\rm dy}{\rm dt} = x(\rho - z) - y$$</p>
<p>$$\displaystyle \frac{\rm dz}{\rm dt} = xy - \beta z$$</p>
<p>El truco acá será discretizar los diferenciales del set de ecuaciones, asumiendo que el infinitesimal temporal ${\rm d}t$ puede ser aproximada usando una diferencia finita $\Delta t$ suficientemente pequeña. Lo mismo será asumido para las variables espaciales, así por ejemplo para la variable i-ésima $x_{i}$, tenemos que $\Delta x_{i+1} = x_{i+1} - x_{i}$.</p>
<p>Dicho esto, nuestras ecuaciones toman la siguiente forma:</p>
<p>$${\rm dx} = \sigma(y - x){\rm dt}\ \ \ \ \ \ \ \Rightarrow\ \ \ \ \ \ \  x_{i+1}=x_{i}+\sigma (y_{i}-x_{i}) \Delta t$$</p>
<p>$${\rm dy} = (\rho x - z x - y){\rm dt}\ \ \ \ \ \ \ \ \ \Rightarrow\ \ \ \ \ \ \ \  y_{i+1}=y_{i}+(\rho x_{i} - z_{i} x_{i} - y_{i}) \Delta t$$</p>
<p>$${\rm dz} = (xy - \beta z){\rm dt}\ \ \ \ \ \ \ \  \Rightarrow\ \ \ \ \ \ \ \  z_{i+1}=z_{i}+(x_{i}y_{i}-\beta z_{i})\Delta t$$</p>
<p>Así, pondremos una partícula de prueba en este mundo gobernado por estas tres leyes y evaluaremos su comportamiento usando 50 mil pequeños pasos $\Delta t$ para ver cómo evoluciona a través de 50 segundos.</p>
<p>No se diga más!</p>

</div>
</div>
</div>