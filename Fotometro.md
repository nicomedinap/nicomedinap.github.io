---
layout: default
title: Fotometro
mathjax: true
---
{% include mathjax.html %}

## Fotómetro: series de tiempo con fotometría PSF desde la base de datos VVV/VVVX

El anánisis fotométrico es fundamental para la caracterización masiva de estrellas alrededor de nuestra humilde tierra. 

### El catálogo Multi-época

Al concluir exitósamente, Fotómetro devuelve el llamado catálogo "Multi - Época", el cual contiene las serie de tiempo de todas las fuentes estelares dentro del campo en estudio. Cada una de sus filas será una estrella diferente, y sus columnas representarán las épocas en el tiempo en las que han sido observadas. Por lo tanto, al tomar una de las filas de dicho catálogo, en realidad se está operando sobre la serie de tiempo de una estrella contenida en la región de estudio. 

Para ejecutar el procedimiento, se requieren tres archivos: un archivo con parámetros fundamentales (a la que llamaremos "Lista de parámetros") y arbitrarios para el proceso. Y dos archivos con la lista de archivos disponibles para el análisis. La lista de parámetros contiene algunas cantidades que son arbitrarias y podrían afectar el resultado del proceso fotométrico. Algunos de ellos es

1. El parámetro $\chi$, que cuantifica la razón entre el seeing medido y calculado a lo largo de la fotometría PSF.
2. El parámetro $\sigma$-clipping, el cual considerará como posibles valores atípicos u "outliers" luego de cierta dispersión $\sigma$ dentro del ajuste lineal. 
3. La dispersión máxima $\sigma_{max}$ que puede tener una estrella para ser considerada una estrella "estandar"
4. El número de epocas mínimo $N_{obs}$ para considerar la serie de tiempo de una fuente estelar.  
5. TOP: Parámetro que mide el valor máximo del modelo PSF. El recomendado para las imágenes tiles es 40000.
6. READ NOISE:

Por defecto, estos parámetros se han estimados y 

### Búsquedas SQL 

El proceso requiere de tres archivos, de los cuales dos de ellos deben ser obtenidos a través de la búsqueda SQL en la base de datos del Vista Science Archive [(VSA)](http://horus.roe.ac.uk/vsa/index.html){:target="_blank"}. 

El proceso requiere saber cuáles son las imágenes y catálogos disponibles para ser descargados y luego analizados. Por lo que búsquedas SQL son necesarias. Para obtener toda la información disponible de un tile en particular, podemos ejecutar la siguiente búsqueda SQL en la base de datos de VSA:

```
SELECT distinct raBase,decBase 
FROM Multiframe as m, MultiframeEsoKeys as e 
WHERE e.Multiframeid=m.Multiframeid 
AND frameType like 'tilestack'
AND obsName like '%d085%'
```

### Fotometría PSF

Dophot (citas) es uno de los programas fotométricos más exitosos dentro de la astronomía que realiza fotometría Point Spread Function (PSF). Al final, la idea final de este tipo de fotometría es el asumir que cada una de las estrellas detectadas en cada imagen puede ser caracterizada por una función en particular. 


### Calibración de los datos

La calibración de la fotometría instrumental será llevada a cabo utilizando la fotometría de apertura disponible en la base de datos de CASU. Se tomarán todos los catálogos y se crearán las series de tiempo con las mediciones de apertura. Luego, se aplicarán reetricciones sobre la dispersión y amplitud de la serie de tiempo. 

Las estrellas que presenten baja amplitud y dispersión fotométrica serán elegidas para la calibración de los datos al sistema VVV. Esta calibración debe ser realizada en cada una de las épocas disponibles. Con esto en mente, tenemos que la fotometría calibrada será: 

<p> $$\displaystyle m_{cal} = m_{aper} \cdot s + b$$ </p>

donde $s$ es la pendiente del ajuste lineal y b el incercepto. 

### Creación del catálogo

Luego de obtener la fotometría calibrada para cada una de las épocas observadas, es necesario hacer un cross-match entre las coordenadas de cada uno de los catálogos, para así obtener las mediciones de cada estrella en cada momento en el periodo 2010-2015. 

### Utilidades del catálogo

Por supuesto que tener el catálogo completo de las series de tiempo de una región de la galaxia tiene muchas posibilidades y casos de uso en astronomía. 

Ha sido usado en (referencia), (referencia), (referencia), (referencia) y en (referencia).


### Lista de cosas por hacer

- [x] Crear un sitio en el blog "Fotómetro"
- [ ] Publicar código en un nuevo repositorio en Github
- [ ] Fotometría de siguientes tiles donde hay cúmulos globulares.

