---
layout: default
title: modulos python
mathjax: false
---

<python>

def Formato_SerieTiempo(timeserie):
    """
    Para extraer la informacion de la serie de tiempo dentro del dataframe. 
    """
    Valores = timeserie.split('\n')
    
    lc = np.zeros((len(Valores),3))
    Contador = 0

    # Loop through each string and convert it to an array of floats
    for string in Valores:
        # Remove the square brackets and split the string by spaces
        values = string.strip('[]')

        #hay que quitar dos espacios al inicio de los arrays, exceptuando el primer caso:
        if Contador != 0:
            values = values[2:]

        values = values.split()
        float_array = [float(value) for value in values]
        lc[Contador] = float_array    
        Contador = Contador +1
        
    return lc

</python>
