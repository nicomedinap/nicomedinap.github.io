---
layout: post
title: Comandos útiles para programar
mathjax: true
---
{% include mathjax.html %} 

### Recopilación comandos útiles 


* Sumar una columna con awk:
	awk '{SUM += $5} END {print SUM}'

* Comprimir/descomprimir archivos .tar.gz:
Comprimir: 
	tar -czvf empaquetado.tar.gz /carpeta/a/empaquetar/
Descomprimir: 
	tar -xzvf archivo.tar.gz

* Hace match entre dos palabras entre catalogos:
	-grep -Ff <Catalogo con nombres> <Catalogo con información>


SQL VSA para VVV

select distinct raBase,decBase from Multiframe as m, MultiframeEsoKeys
as e where e.Multiframeid=m.Multiframeid and frameType like 'tilestack'
and obsName like '%d085%'

-------
Para el catálogo VIVA
http://horus.roe.ac.uk/vsa/vvvGuide.html#VIVACatalogue

SELECT ra,dec,vivaID,JAperMag3, JAperMag3Err, HAperMag3, HAperMag3Err, KsAperMag3, KsAperMag3Err, aVar,EJKs, EJKsErr, bestPeriod
FROM vvvVivaCatalogue
WHERE ra BETWEEN 191 AND 201

(Descarga todo el catálogo entre 191 < RA < 201)