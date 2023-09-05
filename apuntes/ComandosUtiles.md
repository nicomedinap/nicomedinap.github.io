---
layout: post
title: Comandos útiles para resultados rápidos
mathjax: true
---
{% include mathjax.html %} 

### Recopilación comandos útiles 

* agregar 

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

* SQL query Para el catálogo VIVA: http://horus.roe.ac.uk/vsa/vvvGuide.html#VIVACatalogue

```
SELECT ra,dec,vivaID,JAperMag3, JAperMag3Err, HAperMag3, HAperMag3Err, KsAperMag3, KsAperMag3Err, aVar,EJKs, EJKsErr, bestPeriod
FROM vvvVivaCatalogue
WHERE ra BETWEEN 191 AND 201
```
(Descarga todo el catálogo entre 191 < RA < 201)