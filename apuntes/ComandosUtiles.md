---
layout: post
title: Comandos útiles para resultados rápidos
mathjax: true
---
{% include mathjax.html %} 

### Recopilación comandos útiles 

* agregar una columna nueva en todas las filas con el texto "hola" al inicio de un archivo "d084.cat":
```
sed 's/^/hola /' d084.cat > prueba
```
* Sumar una columna con awk:
```
awk '{SUM += $5} END {print SUM}'
```
* Mirar las bandas de imágenes en un directorio:
```
for FILE in *_cat.fits; do filter=$(imhead $FILE | grep FILT1 | grep NAME | awk '{print $7}' | sed "s/'//g" | head -1); echo $filter; done
```

* Comprimir/descomprimir archivos .tar.gz:

Comprimir: 
```
tar -czvf empaquetado.tar.gz /carpeta/a/empaquetar/
```
Descomprimir: 
```
tar -xzvf archivo.tar.gz
```
* Hace match entre dos palabras entre catalogos:
```
-grep -Ff <Catalogo con nombres> <Catalogo con información>
```

### SQL query en VSA:

* Para obtener la lista de imágenes disponible usando el TileID:
```
select distinct raBase,decBase from Multiframe as m, MultiframeEsoKeys
as e where e.Multiframeid=m.Multiframeid and frameType like 'tilestack'
and obsName like '%d085%'
```
Donde, en este caso, d085 es el TileID elegido, y debe ser cambiando.

* Descargar muchas imagenes pequeñas:
```
select 234.911892,-55.155954,m.multiframeid
from currentastrometry as c,
multiframe as m
where m.multiframeid=c.multiframeid and project like 'vvv'
and frametype like '%stack'
and m.deprecated < 128 and filterid=5
and -55.155954 between mindec and maxdec
and ( 234.911892 between minra and
maxra or 234.911892+360.0 between minra and maxra )
```

If you chose to produce results in csv format then a quick edit of the
results file to remove the header just leaves the results like
```
+234.9118920, -55.1559540<tel:55.1559540>, 2188460
+234.9118920, -55.1559540<tel:55.1559540>, 2733137
```

Este archivo puede ser usado como un input en [multigetimage](http://horus.roe.ac.uk:8080/vdfs/VMultiGetImage_form.jsp), lo que se debe hacer es setear el "ID column" en la opción multiframeID y NO SELECCIONAR ninguna longitud de onda específica. El resultado de este proceso

The results of multigetImage for this example are temporarily at
http://horus.roe.ac.uk/vsa/tmp/MultiGetImage/upload22458tmp_325dir/index.html
(I did 1 arcmin)

Some images will show as "missing" as the min/max RA/Dec held for the images describes an image aligned with RA/Dec which enloses the VVV images which are aligned with l/b.

If you just want tiles change to frametype like 'tilestack'
For pawprints frametype like 'stack'.

The deprecated < 128 filters out earlier processing versions of the same observation (might not be necessary as I think they are probably not put in the release anyhow). You might like to set deprecated=0 to exclude images deprecated for any reason (depth, seeing etc)

--

* SQL query Para el catálogo VIVA: http://horus.roe.ac.uk/vsa/vvvGuide.html#VIVACatalogue
```
SELECT ra,dec,vivaID,JAperMag3, JAperMag3Err, HAperMag3, HAperMag3Err, KsAperMag3, KsAperMag3Err, aVar,EJKs, EJKsErr, bestPeriod
FROM vvvVivaCatalogue
WHERE ra BETWEEN 191 AND 201
```
(Descarga todo el catálogo entre 191 < RA < 201)

* Página de CASU para obtener el tileID de cada cluster:

http://casu.ast.cam.ac.uk/vistasp/imgquery/search

Hay que poner las coordenadas del cluster y un radio de busqueda pequeño para que nos arroje el tile que lo contiene, de la forma "Ra Dec degrees".

### Alias típicos para asegurar uniformidad:

```
alias cl
alias irafcl
```

### pasos para instalar gfortran3 en ubunutu 20 hacia arriba.
https://gist.github.com/sakethramanujam/faf5b677b6505437dbdd82170ac55322


### Búsqueda en el catálogo VIRAC

info: https://vvv.herts.ac.uk

Paper: https://vvv.herts.ac.uk/virac_v1.pdf

SELECT ra,dec,rapm ,depm FROM vvvProperMotionCatalogue
WHERE ra BETWEEN 278.9 AND 279.1 AND dec BETWEEN -24.0 AND -23.7 

### Notas para Ubuntu 24 para arriba

sudo apt-get install python3-scipy

sudo apt-get install python3-pip

sudo apt install iraf xgterm

sudo apt install wcstools