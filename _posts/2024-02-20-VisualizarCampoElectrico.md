He vuelto a la teoría electromagnética, de revisar sus postulados, leyes y aritmética y tengo algunas ideas para ver si es posible mejorar en la visualización y coomprensión de algunos postulados básicos de esta teoría que sin duda alguna ha revolucionado a la humanidad a un nivel aún desconocido. 

En un viaje de casi 300 años se pasó de entender las cargas estáticas a los circuitos digitales integrados, y no pocas cosas han ocurrido entre medio. Hitos gigantes han debido ocurrir para que se integraran a las matemáticas conceptos fundamentales como el campo vectorial, su superposición y algunas propiedades fundamentales como el potencial vectorial.

Por supuesto, estas palabras tienen como objetivo el acercamiento de la teoría electromagnética, particularmnete al campo eléctrico y la visualización del campo eléctrico en una región del espacio. Trataré de ser lo más riguroso posible en el tono coloquial con el que tomó vuelo esté escrito.

Además de discutir y experimentar con el uso del campo escalar del potencial electrostático. 

## El concepto de campo eléctrico

Los y las científicas creemos que los campos físicos existen, que el espacio tiene propiedades y pueden ser cuantificados por la medición de ciertas cantidades fundamentales. Por supuesto, ya estamos acostumbrados a la idea de que existen entidades invisibles a nuestro alrededor: el WIFI, la señal del teléfono, etc; o también por su uso en la ciencia ficción con sus "campos de fuerzas" que sirven de escudos.

Pero si logramos bajar la velocidad de la vida, y racionalizamos el hecho de la **acción a distancia** que caracteriza a algunos campos físicos, resulta increible pensar en esta entidad invisible donde interaccionan la materia que posee **carga eléctrica** $q$. Pero evidencia de su existencia hay por montones, y no queda más que aceptar la idea.

La teoría electrostática nos dice que el campo eléctrico $\vec{E}(\vec{x})$ en cada punto del espacio 2D $(x,y)$ caracterizado por el vector $\vec{x}=(x,y)$, en el cual actúan una distribución de cargas puntuales $q$ cada una de ellas con posición $\vec{x}^{*}$ es cuantificado por la siguiente ley física:

$$\vec{E}(\vec{x}-\vec{x}^{*}) = \frac{q}{4\pi \epsilon_{0}}\frac{(\vec{x}-\vec{x}^{*})}{\|\vec{x}-\vec{x}^{*}\|^3}, $$

donde $\epsilon_0$ es la constante conocida como la "permitividad del vacío", estréchamente relacionada con la velocidad de la luz $c$ y la "permeabilidad magnética del vacío" $\mu_0$, y se define de la forma:

$$\displaystyle \epsilon_0 = \frac{1}{c^2\mu_0} = 8.8541\times10^{-12} \left[\frac{\mbox{F}}{\mbox{m}}\right],$$

donde F expresa las unidades de Faradios, y m los metros de toda la vida. Todo lo anterior puede sonar intimidante, pero esto sólo es la generalidad del comienzo. Básicamente, el campo eléctrico es proporcional del cuadrado de la distancia, entonces en principio bastaría calcular la distancia $d = \sqrt{x^2 + y^2}$ a cada punto y calcular el campo en dicho punto. Por lo tanto, la geometría del problema ha hablado, y podemos considerar coordenadas polares $(r,\theta)$ para así facilitar los cálculos.

Si consideramos el el vector cartesiano $\vec{x} = x \hat{i} + y \hat{j}$, utilizando un cambio de variable tal que:

$$x= r \cos \theta, y= r \sin \theta\, $$

tenemos que el vector cartesiano $\vec{x}$ puede ser descrito por:

\begin{align*}
 \vec{x}  \>&=\> x \hat{i} + y \hat{j} \\
         \>&=\>  r \cos \theta\ \hat{i} + r \sin \theta\ \hat{j} \\
         \>&=\> r \left( \cos \theta\ \hat{i} + \sin \theta\ \hat{j}\right)     \\
         \>&=\> r\ \hat{r}(\theta)     \\
\end{align*}

Así, podemos simplificar un problema de dos variables $(x,y)$ en solo una $r$, por lo tanto nos enfrentamos a un problema que depende nétamente de la distancia $r$ de cada carga $q$ que interaccione en este campo eléctrico. Como el vector $\vec{x}$ depende sólo de la distancia a las fuentes $\vec{x}^{*}$, el vector que apunta a cada elemento en este espacio será $\left( \vec{x} - \vec{x}^{*} \right)$. Ya con esto podemos usar diréctamente el teoréma de pitágoras para calcular la distancia de la fuente a cada punto del espacio, pero empezaremos por una carga puntual en el origen.

### El caso más simple: carga en el origen

Considerando una carga puntual en el origen (es decir, $(x^{*}, y^{*})=(0,0)$), se puede demostrar que la expresión del campo eléctrico en todo punto es de la forma:

$$\vec{E}(\vec{r}) = \frac{q}{4\pi \epsilon_{0}}\frac{\hat{r}}{r^2},$$

donde cada carga $q$ presentes y considerados en el problema tiene similares propiedades. El vector $\vec{r}=r\ \hat{r}$ es un vector polar el cual debe ser expresado en las coordenadas cartesianas que usaremos para visualizar los efectos. Considerando la distancia desde el origen a cualquier punto del espacio:

$$r = \sqrt{x^2 + y^2}$$

Y además, considerando la descomposición 

\begin{align*}
\vec{E}(r,\theta)  \>&=\> \frac{q}{4\pi \epsilon_{0}}\frac{\hat{r}}{r^2} \\
            \>&=\> \frac{q}{4\pi \epsilon_{0}}\frac{ \left[\cos \theta\ \hat{i} + \sin \theta\ \hat{j} \right]} {r^2} \\
            \>&=\> \frac{q}{4\pi \epsilon_{0}}\frac{ r \left[\cos \theta\ \hat{i} + \sin \theta\ \hat{j} \right]} {r^3} \\
            \>&=\> \left( \frac{q}{4\pi \epsilon_0}\frac{r \cos \theta}{r^3}\right) \hat{i} + \left(\frac{q}{4\pi \epsilon_0} \frac{r \sin \theta}{r^3}\right) \hat{j}
\end{align*}

Podemos obtener una expresión que será  útil para convertir a coordenadas cartesianas. Vean que, de hecho, agregamos un término "$r$" en el tercer paso para manipular la expresión. Entonces, usando el cambio de variable de coordenadas de cartesianas a polares:

\begin{align*}
\vec{E}(x,y)  \>&=\>  E_x \hat{i} + E_y\hat{j} \\
         \>&=\> \left( \frac{q}{4\pi \epsilon_0}\frac{r \cos \theta}{r^3}\right) \hat{i} + \left(\frac{q}{4\pi \epsilon_0} \frac{r \sin \theta}{r^3}\right) \hat{j} \\
         \>&=\> \left( \frac{q}{4\pi \epsilon_0}\frac{x}{(x^2 + y^2)^{\frac{3}{2}}}\right) \hat{i} + \left(\frac{q}{4\pi \epsilon_0} \frac{y}{(x^2 + y^2)^{\frac{3}{2}}}\right) \hat{j} 
\end{align*}


Por ende en coordenadas cartesianas el campo eléctrico y las componentes se calculan de la siguiente forma:

$$E_x = \frac{q}{4\pi \epsilon_0}\frac{x}{(x^2 + y^2)^{\frac{3}{2}}} $$

$$E_y = \frac{q}{4\pi \epsilon_0}\frac{y}{(x^2 + y^2)^{\frac{3}{2}}} $$



La verdad de las cosas no he hemos hecho nada nuevo hasta aquí, yo diría que todo lo anterior se sabe desde hace más de 100 años. Lo realmente interesante es la libertad de la implementación experimental que nos dan los lenguales de programación, que nos permite calcular todo lo anterior de forma iterativa.

Entonces, primero definimos las constantes físicas y luego definimos la función que calculará el campo eléctrico de una carga $q$ en el origen:


```python
#Definimos constantes físicas:
#Permeatividad del vacío:
epsilon = 8.854e-12
#Carga fundamental del electrón:
q = 1.602e-19

#Definimos la función que calcula el campo eléctrico desde las coordenadas:
def E_origen(q, x, y):
    """Retorna el campo de una carga puntual en el origen, de la forma E=(Ex,Ey)."""
    r = np.sqrt(x**2+ y**2)
    Ex = (q/4*np.pi*epsilon) * x / r**(3/2)
    Ey = (q/4*np.pi*epsilon) * y / r**(3/2)
    return Ex,Ey 
```

Lo primero que haremos será iniciar una región para poder calcular la influencia de las fuentes de carga $q$ que están presentes:


```python
import sys
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from matplotlib.patches import Rectangle

plt.style.use('dark_background')

#Grilla de puntos que se utilizarán en estos experimentos
plt.figure(figsize=(4,5))
nx, ny = 100, 100
x = np.linspace(-2, 2, nx)
y = np.linspace(-4, 4, ny)
X, Y = np.meshgrid(x, y)
plt.scatter(X, Y, s=1.0, color='w', marker='.')
plt.xlabel(r'${X}$', fontsize=15)
plt.ylabel(r'${Y}$', fontsize=15)
plt.show()
```


    
![png](Visualizar_campoElectrico_files/Visualizar_campoElectrico_5_0.png)
    


Entonces, lo que haremos es cada punto (i,j) de la siguiente matriz, será evaluadaa la función E_origen, luego calculamos el campo eléctrico $\vec{E}(x,y)$ desde la suma independiente de sus componentes individuales $E_{x}$ y $E_{y}$


```python
# Iniciamos los valores de cada componente:
Ex = np.zeros((ny, nx))
Ey = np.zeros((ny, nx))

# Calculamos las componentes del campo eléctrico:
Ex, Ey = E_origen(q, x=X, y=Y)

fig = plt.figure(figsize=(4,5))
#Usamos "streamlines" para visualizar el campo eléctrico:
color = np.log(np.hypot(Ex, Ey))
plt.streamplot(x, y, Ex, Ey, color=color, linewidth=1.2, cmap=plt.cm.jet,
              density=1.3, arrowstyle='->', arrowsize=1.5, zorder=0)

#Dibujamos la carga y su nombre:
plt.scatter(0, 0, zorder=1, s=600,edgecolor='k', facecolor='red')
plt.text(-0.1, -0.08, '$q$', fontsize=18, c='k')

plt.xlabel(r'${X}$', fontsize=15)
plt.ylabel(r'${Y}$', fontsize=15)
plt.show()
```


    
![png](Visualizar_campoElectrico_files/Visualizar_campoElectrico_7_0.png)
    


Un hito: la visualización del campo eléctrico más simple que existe!! Desde acá podemos ver que cargas positivas emite **líneas de campo eléctrico**. También puede decirse que es fuente de campo eléctrico, aunque puede ser algo redundante ya que el hecho de poseer carga ya posee interacción en el campo.
Cargas negativas $-q$ recibe líneas de campo eléctrico, también conocido como un "sumidero", término que es prestado de otros campos de la física. Más adelante está el ejemplo de la interacción de una carga $-q$ que interacciona en el espacio.

## Desplazando y agregando cargas:

Como nos enfrentamos a un problema que depende nétamente de la distancia $r$ de cada carga $q$ que interaccione en este campo eléctrico, el vector que apunta a cada elemento en este espacio, considerando la influencia de las cargas presentes será $\left( \vec{x} - \vec{x}^{*} \right)$.

Por suerte, podemos seguir usando nuestro querido teoréma de pitágoras y calcular la distancia a cada punto del espacio de la forma:

$$r = \sqrt{ (x-x^{*})^2 + (y-y^{*})^2}$$

De la misma forma anterior, considerando la descomposición:


\begin{align*}
\vec{E}(\vec{x} - \vec{x}^{*})  \>&=\>  E_x \hat{i} + E_y\hat{j} \\
         \>&=\> \left( \frac{q}{4\pi \epsilon_0}\frac{r \cos \theta}{r^3}\right) \hat{i} + \left(\frac{q}{4\pi \epsilon_0} \frac{r \sin \theta}{r^3}\right) \hat{j} \\
         \>&=\> \left( \frac{q}{4\pi \epsilon_0}\frac{(x-x^{*})}{\left[(x-x^{*})^2 + (y-y^{*})^2\right]^{\frac{3}{2}}}\right) \hat{i} + \left(\frac{q}{4\pi \epsilon_0} \frac{(y-y^{*})}{\left[(x-x^{*})^2 + (y-y^{*})^2\right]^{\frac{3}{2}}}\right) \hat{j} 
\end{align*}



Por ende en coordenadas cartesianas el campo eléctrico y las componentes se calculan de la siguiente forma:

$$E_x = \frac{q}{4\pi \epsilon_0}\frac{(x-x^{*})}{ \left[(x-x^{*})^2 + (y-y^{*})^2\right]^{\frac{3}{2}}}$$

$$E_y = \frac{q}{4\pi \epsilon_0}\frac{(y-y^{*})}{ \left[(x-x^{*})^2 + (y-y^{*})^2\right]^{\frac{3}{2}}}$$

Con esto, podemos localizar una carga $q$ en cualquier lugar de este espacio de dos dimensiones.


```python
def E_puntual(q,posx, posy, x, y):
    """Retorna el campo de una carga puntual, de la forma E=(Ex,Ey), informada su posición."""
    r = np.sqrt((x-posx)**2+ (y-posy)**2)
    Ex = (q/4*np.pi*epsilon) * (x-posx) / r**(3/2)
    Ey = (q/4*np.pi*epsilon) * (y-posy) / r**(3/2)
    return Ex,Ey 
```

Usaremos la función antes descrita para colocar una carga $q$ en la posición $(x^*,y^*)=(0,2)$


```python
Ex = np.zeros((ny, nx))
Ey = np.zeros((ny, nx))

posicion = [0,2]

#Calculamos el campo eléctrico de una carga en (0.2)
Ex, Ey = E_puntual(q,posx=posicion[0],posy=posicion[1], x=X, y=Y)

fig = plt.figure(figsize=(4,5))

#Usamos "streamlines" para visualizar el campo eléctrico:
color = np.log(np.hypot(Ex, Ey))
plt.streamplot(x, y, Ex, Ey, color=color, linewidth=1.2, cmap=plt.cm.jet,
              density=1.5, arrowstyle='->', arrowsize=1.5, zorder=0)

#Dibujamos la carga y su nombre:
plt.scatter(posicion[0], posicion[1], zorder=1, s=800,edgecolor='k', facecolors='red')
plt.text(-0.1, 1.95, '$q$', fontsize=18, c='k')

plt.xlabel(r'${X}$', fontsize=15)
plt.ylabel(r'${Y}$', fontsize=15)
plt.show()
```


    
![png](Visualizar_campoElectrico_files/Visualizar_campoElectrico_13_0.png)
    


Usaremos la misma función antes descrita para colocar una carga de signo contrario $-q$ en la posición $(x^*,y^*)=(0,-2)$


```python
Ex = np.zeros((ny, nx))
Ey = np.zeros((ny, nx))

posicion = [0,-2]

#Calculamos el campo eléctrico de una carga en (0.2)
Ex, Ey = E_puntual(-q,posx=posicion[0],posy=posicion[1], x=X, y=Y)

fig = plt.figure(figsize=(4,5))

#Usamos "streamlines" para visualizar el campo eléctrico:
color = np.log(np.hypot(Ex, Ey))
plt.streamplot(x, y, Ex, Ey, color=color, linewidth=1.2, cmap=plt.cm.jet,
              density=1.5, arrowstyle='->', arrowsize=1.5, zorder=0)

#Dibujamos la carga y su nombre:
plt.scatter(posicion[0], posicion[1], zorder=1, s=800,edgecolor='k', facecolors='blue')
plt.text(-0.25, -2.07, '$-q$', fontsize=16, c='w')
plt.xlabel(r'${X}$', fontsize=15)
plt.ylabel(r'${Y}$', fontsize=15)

plt.show()
```


    
![png](Visualizar_campoElectrico_files/Visualizar_campoElectrico_15_0.png)
    


Veamos que esta carga es negativa, por lo que **atrae líneas de campo eléctrico**. Las cargas positivas emiten líneas de campo eléctrio, las cargas negativas atraen líneas de campo, es por esto que el dicho popular dice: "los opuestos de atraen".


## Superposición del campo eléctrico

Otra gran propiedad aplicable al campo eléctrico es el principio de superposicion, es decir que es posible calcular el campo eléctrico total $\vec{E}_{total}$ en una región es igual a la suma individual del campo eléctrico provocado por cada fuente. La suma individual de cada componente del sistema dará como resultado el campo total.

En general, podríamos tener $N$ cargas puntuales y el campo eléctrico total en cada punto será las sumas individuales de cada campo eléctrico en ese punto. Dicho de forma matemática:

$$ \vec{E}_{total} = \vec{E}_{q_1} + \vec{E}_{q_2} + ... + \vec{E}_{q_N} = \sum_{k=i}^{N} \vec{E}_{k}$$

Usaremos esta propiedad en las dos cargas antes creadas: la carga positiva $q$ creada en los puntos (x,y)=(0,2) y la carga negativa $-q$ que hemos cread en los puntos (x,y)=(0,-2). Así, podemos expresar la superposición de la forma:

$$ \vec{E}_{total} = \sum_{k=1}^{2} \vec{E}_k = \vec{E}_{q_1} + \vec{E}_{q_2} $$ 

En el caso de dos cargas opuestas, alineadas en el eje x, se forma el patrón de un [dipolo eléctrico](https://es.wikipedia.org/wiki/Dipolo_eléctrico):


```python
Ex = np.zeros((ny, nx))
Ey = np.zeros((ny, nx))

#Ponemos una carga en las coordenadas (x,y)=(0,2) y calculamos su campo:
ex_q1, ey_q1 = E_puntual(q,posx=0,posy=2, x=X, y=Y)

#Ponemos otra carga en las coordenadas (x,y)=(0,-2) y calculamos su campo:
ex_q2, ey_q2 = E_puntual(-q,posx=0,posy=-2, x=X, y=Y)

#Sumamos la contribución al campo general, usando la propiedad de superposición:
Ex = ex_q1 + ex_q2
Ey = ey_q1 + ey_q2

fig = plt.figure(figsize=(4,5))

color = np.log(np.hypot(Ex, Ey))

plt.streamplot(x, y, Ex, Ey, color=color, linewidth=1.2, cmap=plt.cm.jet,
              density=1., arrowstyle='->', arrowsize=1.5, zorder=0)

#Dibujamos las cargas
plt.scatter(0, 2, zorder=1, s=600, facecolors='red', edgecolor='k', label = '$q$')
plt.text(-0.08, 1.95, '$q$', fontsize=16, c='k')
plt.scatter(0,-2, zorder=1, s=600, facecolors='blue',edgecolor='k', label = '$-q$')
plt.text(-0.2045, -2.07, '$-q$', fontsize=14, c='w')

plt.xlabel(r'${X}$', fontsize=15)
plt.ylabel(r'${Y}$', fontsize=15)
plt.title('Dipolo eléctrico', fontsize=14)
plt.show()
```


    
![png](Visualizar_campoElectrico_files/Visualizar_campoElectrico_17_0.png)
    


Ya, todo esto fue lo básico: lo mínimo que debes saber para poder meter las manos en un mundo donde el que prueba es el que avanza. De aquí en adelante dependerá de tu ingenio y cómo puedes construir estructuras usando esta lógica. 

Una de las formas efectivas que existen es demostrada en este [link](https://scipython.com/blog/visualizing-a-vector-field-with-matplotlib/) del libro *Learning Scientific Programming with Python*, es el de "crear" un grupo de cargas en posiciones espefícicas, y luego se itera sobre ellas para agregar sus contribuciones individuales de campo eléctrico sobre la región de interés. Dicho de forma estructurada:

1. Definir un contenedor $\mathtt{cargas}$ donde se agregarán cargas puntuales. 
2. Definir cómo se distribuirán las cargas, y su signo (q o -q).
3. Agregar la carga al contenedor $\mathtt{cargas}$.
4. Hacer un loop sobre cada carga, y que su contribución se haga individualmente.
5. Visualización del campo $\vec{E}(x,y)$

Construiré estructuras sencillas, seguidas en la lógica de las funciones que hemos creado. Por ejemplo podemos crear una "barra" cargada positivamente, hecha por una fila de cargas puntuales positivas y evaluaremos cada campo eléctrico por separado. Para esto, usaremos 100 cargas individuales, equiespaciadas entre -5 a 5 en el eje $y$. También, vamos a considerar que las estructuras de color **roja** están cargadas positivamente (fuentes de campo eléctrico), y las estructuras **azules** serán cargas negativas (receptoras de campo eléctrico).


```python
#Definimos el número de cargas a usar
nq = 100

#Creamos un contenedor vacío de cargas a evaluar
cargas = []

#Línea recta a lo larga del eje Y:
coords_y = np.linspace(-5,5,nq)

#Iteramos sobre las coordenadas en el eje y
for coordenada in coords_y:
    #Agregamos una carga q, con coordenada x=0, y coordenada y=coordenada
    cargas.append((q,0,coordenada))
```


```python
#Grilla de puntos que se utilizarán en estos experimentos
plt.figure(figsize=(4,5))
x = np.linspace(-4, 4, nx)
y = np.linspace(-8, 8, ny)
X, Y = np.meshgrid(x, y)

Ex = np.zeros((ny, nx))
Ey = np.zeros((ny, nx))

#Hacemos el loop final donde el campo de cada carga individual 
#se usa para calcular el campo final:
#Por cada carga dentro de la lista de cargas:
for carga in cargas:
    ex, ey = E_puntual(*carga, x=X, y=Y)
    #En cada iteración, se le agrega ex a Ex.
    Ex += ex
    Ey += ey

color = np.log(np.hypot(Ex, Ey))
plt.streamplot(x, y, Ex, Ey, color=color, linewidth=1.3, cmap=plt.cm.hot,
              density=1.3, arrowstyle='->', arrowsize=1.5, zorder=0)

#pintamos los objetos 
plt.gca().add_patch(Rectangle((-0.15, -5), 0.3, 10,
             edgecolor = 'black',
             facecolor = 'red',
             fill=True,
             lw=2))
    
plt.xlabel(r'${X}$', fontsize=15)
plt.ylabel(r'${Y}$', fontsize=15)
plt.title(r'${\vec{E}(x,y)}$', fontsize=14, color='yellow')
plt.show()
```


    
![png](Visualizar_campoElectrico_files/Visualizar_campoElectrico_20_0.png)
    


Una barra super saiyajin jajaja. Ahora, agregaremos dos barras pero de cargas diferentes, buscando la configuración de ["placas paralelas"](https://openstax.org/books/f%C3%ADsica-universitaria-volumen-2/pages/7-5-superficies-equipotenciales-y-conductores). Para esto limpiaremos el contenedor $\mathtt{cargas}$ y agregaremos dos estructuras similares, separadas en el eje x. No se diga más!


```python
#Definimos el número de cargas a usar
nq = 200

#Creamos un contenedor vacío de cargas a evaluar
cargas = []

#Línea recta a lo larga del eje Y:
coords_izq_y = np.linspace(-5,5,nq)

for coordenada in coords_izq_y:
    cargas.append((-q,-1,coordenada))
    
#Línea recta a lo larga del eje Y:
coords_der_y = np.linspace(-5,5,nq)

for coordenada in coords_der_y:
    cargas.append((q,1,coordenada))

Ex = np.zeros((ny, nx))
Ey = np.zeros((ny, nx))

#Hacemos el loop final donde el campo de cada carga individual se usa 
#para calcular el campo final. Por cada carga dentro de la lista de cargas:
for carga in cargas:
    ex, ey = E_puntual(*carga, x=X, y=Y)
    Ex += ex
    Ey += ey

fig = plt.figure(figsize=(4,5))

color = np.log(np.hypot(Ex, Ey))
plt.streamplot(x, y, Ex, Ey, color=color, linewidth=1.4, cmap=plt.cm.hot,
              density=1., arrowstyle='->', arrowsize=1.1, zorder=0)

#pintamos los objetos 
plt.gca().add_patch(Rectangle((-1.2, -5), 0.3, 10,
             edgecolor = 'black',
             facecolor = 'blue',
             fill=True,
             lw=2))

plt.gca().add_patch(Rectangle((1, -5), 0.3, 10,
             edgecolor = 'black',
             facecolor = 'red',
             fill=True,
             lw=2))
    
plt.xlabel(r'${X}$', fontsize=15)
plt.ylabel(r'${Y}$', fontsize=15)
plt.title(r'${\vec{E}(x,y)}$', fontsize=14, color='yellow')
plt.show()
```


    
![png](Visualizar_campoElectrico_files/Visualizar_campoElectrico_22_0.png)
    


Interesante, se ve el efecto de las placas paralelas en la uniformidad del campo eléctrico entre ellas!. Genial. Esta aproximación de cargas puntuales puestas espacialmente una al lado de la otra funciona bien. 

Hagamos un zoom al uno de los bordes de las placas paralelas:


```python
#Grilla de puntos que se utilizarán en estos experimentos
x = np.linspace(-2, 2, nx)
y = np.linspace(-4, 4, ny)
X, Y = np.meshgrid(x, y)

#Definimos el número de cargas a usar
nq = 150

#Creamos un contenedor vacío de cargas a evaluar
cargas = []

#Línea recta a lo larga del eje Y:
coords_izq_y = np.linspace(-0.5,8,nq)

for coordenada in coords_izq_y:
    cargas.append((-q,-1,coordenada))
    
#Línea recta a lo larga del eje Y:
coords_der_y = np.linspace(-0.5,8,nq)

for coordenada in coords_der_y:
    cargas.append((q,1,coordenada))

plt.figure(figsize=(4,5))
Ex = np.zeros((ny, nx))
Ey = np.zeros((ny, nx))

#Hacemos el loop final donde el campo de cada carga individual se usa para calcular el campo final:
#Por cada carga dentro de la lista de cargas:
for carga in cargas:
    ex, ey = E_puntual(*carga, x=X, y=Y)
    Ex += ex
    Ey += ey

# Plot the streamlines with an appropriate colormap and arrow style
color = np.log(np.hypot(Ex, Ey))
plt.streamplot(x, y, Ex, Ey, color=color, linewidth=2, cmap=plt.cm.hot,
              density=1.3, arrowstyle='->', arrowsize=1.5, zorder=0)

#pintamos los objetos 
plt.gca().add_patch(Rectangle((-1.13, -0.5), 0.3, 10,
             edgecolor = 'black',
             facecolor = 'blue',
             fill=True,
             lw=2))

plt.gca().add_patch(Rectangle((0.88, -0.5), 0.3, 10,
             edgecolor = 'black',
             facecolor = 'red',
             fill=True,
             lw=2))
    
plt.xlabel(r'${X}$', fontsize=15)
plt.ylabel(r'${Y}$', fontsize=15)
plt.xlim(-2,2)
plt.ylim(-2,3)
plt.title(r'${\vec{E}(x,y)}$', fontsize=14, color='yellow')
plt.show()
```


    
![png](Visualizar_campoElectrico_files/Visualizar_campoElectrico_24_0.png)
    


Como dije, de aquí en adelante la verdad sólo depende de cómo se agregenen las coordenadas de las cargas y sus magnitudes. Una de las cosas que se me ocurrió construir fue una elipse, que cada una de sus mitades tiene diferente signo. Lo que si, tuve que improvisar en el dibujo de las cargas en el plot, porque no sé aún cómo representar superficies arbitrarias con los bordes delineados. Con las barras fue fácil, pero ahora ya no hay tiempo.


```python
#Definimos el número de cargas a usar
nq = 200

#Creamos un contenedor vacío de cargas a evaluar
cargas = []

escala1, escala2=1,2

#Semi circulo derecho
#puntos entre angulos -pi/2 y + pi/2
coords_y = np.linspace(-np.pi/2,np.pi/2,nq)

for coordenada in coords_y:
    cargas.append((q,escala1*np.cos(coordenada),escala2*np.sin(coordenada)))
    
#Semi circulo izquierdo 
#puntos entre angulos pi/2 y + 3pi/2
coords_y = np.linspace(np.pi/2,3*np.pi/2,nq)

for coordenada in coords_y:
    cargas.append((-q,escala1*np.cos(coordenada),escala2*np.sin(coordenada)))
```


```python
x = np.linspace(-4, 4, nx)
y = np.linspace(-8, 8, ny)
X, Y = np.meshgrid(x, y)

Ex = np.zeros((ny, nx))
Ey = np.zeros((ny, nx))

#Hacemos el loop final donde el campo de cada carga individual se usa para calcular el campo final:
#Por cada carga dentro de la lista de cargas:
for carga in cargas:
    ex, ey = E_puntual(*carga, x=X, y=Y)
    Ex += ex
    Ey += ey

fig = plt.figure(figsize=(4,5))

# Plot the streamlines with an appropriate colormap and arrow style
color = np.log(np.hypot(Ex, Ey))
plt.streamplot(x, y, Ex, Ey, color=color, linewidth=1.3, cmap=plt.cm.hot,
              density=1.3, arrowstyle='->', arrowsize=1.5, zorder=0)

#pintamos los objetos 
for q, posx,posy in cargas:
    if q < 0 :
        plt.scatter(posx,posy,zorder=1, s=90, facecolors='blue' )
    else:
        plt.scatter(posx,posy,zorder=1, s=90, facecolors='red' )

plt.xlabel(r'${X}$', fontsize=15)
plt.ylabel(r'${Y}$', fontsize=15)
plt.title(r'${\vec{E}(x,y)}$', fontsize=14, color='orange')
plt.show()
```


    
![png](Visualizar_campoElectrico_files/Visualizar_campoElectrico_27_0.png)
    


Y si seguimos intruseando en los parámetros de estas estructuras, podemos crear visualizaciones cada vez más interesantes y estéticas, como la siguiente que logré al rotar el eje de simetría de la epilse polarizada:


```python
x = np.linspace(-4, 4, nx)
y = np.linspace(-8, 8, ny)
X, Y = np.meshgrid(x, y)

#Definimos el número de cargas a usar
nq = 200

#Creamos un contenedor vacío de cargas a evaluar
cargas = []

escala1, escala2=3,7
angulo = 80

#Semi circulo derecho
#puntos entre angulos -pi/2 y + pi/2
coords_y = np.linspace(-np.pi/2,np.pi/2,nq)

for coordenada in coords_y:
    cargas.append((q,escala1*np.cos(coordenada+angulo),escala2*np.sin(coordenada)))
    
#Semi circulo izquierdo 
#puntos entre angulos pi/2 y + 3pi/2
coords_y = np.linspace(np.pi/2,3*np.pi/2,nq)

for coordenada in coords_y:
    cargas.append((-q,escala1*np.cos(coordenada+angulo),escala2*np.sin(coordenada)))

Ex = np.zeros((ny, nx))
Ey = np.zeros((ny, nx))

#Hacemos el loop final donde el campo de cada carga individual se usa para calcular el campo final:
#Por cada carga dentro de la lista de cargas:
for carga in cargas:
    ex, ey = E_puntual(*carga, x=X, y=Y)
    Ex += ex
    Ey += ey

fig = plt.figure(figsize=(4,5))

# Plot the streamlines with an appropriate colormap and arrow style
color = np.log(np.hypot(Ex, Ey))

plt.streamplot(x, y, Ex, Ey, color=color, linewidth=1.2, cmap=plt.cm.hot,
              density=1.3, arrowstyle='->', arrowsize=1.5, zorder=0)

#pintamos los objetos 
for q, posx,posy in cargas:
    if q < 0 :
        plt.scatter(posx,posy,zorder=1, s=90, facecolors='blue' )
    else:
        plt.scatter(posx,posy,zorder=1, s=90, facecolors='red' )

plt.xlabel(r'${X}$', fontsize=15)
plt.ylabel(r'${Y}$', fontsize=15)
plt.title(r'${\vec{E}(x,y)}$', fontsize=14, color='orange')
plt.show()
```


    
![png](Visualizar_campoElectrico_files/Visualizar_campoElectrico_29_0.png)
    


## Potencial electrostático

Ya para finalizar, una cantidad aún más fudamental que el campo eléctrico es el potencial electrostático. Para una carga puntual, el potencial está definido por:
    
$$\phi(\vec{x}-\vec{x}^{*}) = \frac{1}{4\pi \epsilon_{0}}\frac{q}{\|\vec{x}-\vec{x}^{*}\|}. $$

Es una cantidad fundamental, ya que es un **campo escalar**, es decir que para cada punto (x,y) existe un valor $\phi(\vec{x})$ asociado. Por consecuencia, el potencial eléctrico es una distribución en el espacio, y no dos o más valores asociadas, como es el caso del campo eléctrico $\vec{E}$. Por supuesto que el vínculo entre el potencial y el cámpo es estrecha, dado que el Campo eléctrico es el **gradiente del potencial eléctrico**: 

$$\vec{E} = -\vec{\nabla}\phi(\vec{x}),$$

es decir, el campo eléctrico en realidad sigue la dirección donde el potencial $\phi$ cambiará más rapidamente, generando **superficies equipotenciales** en lugares que sean perpendiculares a las líneas de campo eléctrico.

El potencial es definido en la siguiente función llamada $\mathtt{P\_ puntual}$:


```python
def P_puntual(q,posx, posy, x, y):
    """Retorna el potencial eléctrico de una carga puntual"""
    r = np.sqrt((x-posx)**2+ (y-posy)**2)
    Pot = (1/(4*np.pi*epsilon))*(q/r)
    return Pot
```

Usaremos algunas de las configuraciones anteriores y visualizaremos el potencial $\phi(\vec{x}-\vec{x}^{*})$ en conjunto con los campos eléctricos. Hasta usaremos el mismo bucle para calcular el campo escalar:


```python
x = np.linspace(-2, 2, nx)
y = np.linspace(-4, 4, ny)
X, Y = np.meshgrid(x, y)

Ex = np.zeros((ny, nx))
Ey = np.zeros((ny, nx))

#Ponemos una carga en las coordenadas (x,y)=(0,-2) y calculamos su campo:
ex_q1, ey_q1 = E_puntual(-q,posx=0,posy=-2, x=X, y=Y)

#Ponemos otra carga en las coordenadas (x,y)=(0,2) y calculamos su campo:
ex_q2, ey_q2 = E_puntual(q,posx=0,posy=2, x=X, y=Y)

#Sumamos la contribución al campo general, usando la propiedad de superposición:
Ex = ex_q1 + ex_q2
Ey = ey_q1 + ey_q2

fig = plt.figure(figsize=(4,5))
# Plot the streamlines with an appropriate colormap and arrow style
color = np.log(np.hypot(Ex, Ey))
plt.streamplot(x, y, Ex, Ey, color=color, linewidth=0.8, cmap=plt.cm.hot,
              density=1., arrowstyle='->', arrowsize=1.5, zorder=0)

#Ponemos una carga en las coordenadas (x,y)=(0,-2) y calculamos su campo:
P_1 = P_puntual(-q,posx=0,posy=-2, x=X, y=Y)

#Ponemos otra carga en las coordenadas (x,y)=(0,2) y calculamos su campo:
P_2 = P_puntual(q,posx=0,posy=2, x=X, y=Y)

#Sumamos la contribución al campo general, usando la propiedad de superposición:
P_tot = P_1 + P_2

contornos = np.linspace(np.min(P_tot),np.max(P_tot),45)
cset = plt.contour(X, Y, P_tot,contornos, colors='w')

#Dibujamos las cargas
plt.scatter(0, 2, zorder=1, s=800, facecolors='red', edgecolor='k', label = 'q')
plt.scatter(0,-2, zorder=1, s=800, facecolors='blue',edgecolor='k',label = '-q')

#plt.legend(loc='right',fontsize=20)
plt.xlabel(r'${X}$', fontsize=15)
plt.ylabel(r'${Y}$', fontsize=15)

plt.title(r'${\phi(x,y)}$', fontsize=14)
plt.show()
```


    
![png](Visualizar_campoElectrico_files/Visualizar_campoElectrico_33_0.png)
    



```python
#Grilla de puntos que se utilizarán en estos experimentos
plt.figure(figsize=(4,5))
nx, ny = 100, 100
x = np.linspace(-2, 2, nx)
y = np.linspace(-2, 12, ny)
X, Y = np.meshgrid(x, y)

#Definimos el número de cargas a usar
nq = 150

#Creamos un contenedor vacío de cargas a evaluar
cargas = []
P_tot = 0

#Línea recta a lo larga del eje Y:
coords_izq_y = np.linspace(-0.5,10,nq)

for coordenada in coords_izq_y:
    cargas.append((-q,-1,coordenada))
    
#Línea recta a lo larga del eje Y:
coords_der_y = np.linspace(-0.5,10,nq)

for coordenada in coords_der_y:
    cargas.append((q,1,coordenada))

# Electric field vector, E=(Ex, Ey), as separate components
Ex = np.zeros((ny, nx))
Ey = np.zeros((ny, nx))

#Hacemos el loop final donde el campo de cada carga individual se usa para calcular el campo final:
#Por cada carga dentro de la lista de cargas:
for carga in cargas:
    ex, ey = E_puntual(*carga, x=X, y=Y)
    Ex += ex
    Ey += ey
    P_tot += P_puntual(*carga, x=X, y=Y)

color = np.log(np.hypot(Ex, Ey))
plt.streamplot(x, y, Ex, Ey, color=color, linewidth=0.6, cmap=plt.cm.hot,
              density=1.3, arrowstyle='->', arrowsize=1.5, zorder=0)

#pintamos los objetos 
plt.gca().add_patch(Rectangle((-1.13, -0.5), 0.3, 10,
             edgecolor = 'black',
             facecolor = 'blue',
             fill=True,
             lw=2))

plt.gca().add_patch(Rectangle((0.88, -0.5), 0.3, 10,
             edgecolor = 'black',
             facecolor = 'red',
             fill=True,
             lw=2))
    
plt.xlabel(r'${X}$', fontsize=15)
plt.ylabel(r'${Y}$', fontsize=15)

contornos = np.linspace(np.min(P_tot),np.max(P_tot),20)
plt.contour(X, Y, P_tot,contornos, colors='w')
plt.title(r'${\phi(x,y)}$', fontsize=14)
plt.show()
```


    
![png](Visualizar_campoElectrico_files/Visualizar_campoElectrico_34_0.png)
    



```python
x = np.linspace(-4, 4, nx)
y = np.linspace(-8, 8, ny)
X, Y = np.meshgrid(x, y)

#Definimos el número de cargas a usar
nq = 200

#Creamos los contenedores vacíos de los campos:
cargas = []
P_tot = 0

escala1, escala2=2,5

#Semi circulo derecho
#puntos entre angulos -pi/2 y + pi/2
coords_y = np.linspace(-np.pi/2,np.pi/2,nq)

for coordenada in coords_y:
    cargas.append((q,escala1*np.cos(coordenada),escala2*np.sin(coordenada)))
    
#Semi circulo izquierdo 
#puntos entre angulos pi/2 y + 3pi/2
coords_y = np.linspace(np.pi/2,3*np.pi/2,nq)

for coordenada in coords_y:
    cargas.append((-q,escala1*np.cos(coordenada),escala2*np.sin(coordenada)))

Ex = np.zeros((ny, nx))
Ey = np.zeros((ny, nx))

#Hacemos el loop final donde el campo de cada carga individual se usa para calcular el campo final:
#Por cada carga dentro de la lista de cargas:
for carga in cargas:
    ex, ey = E_puntual(*carga, x=X, y=Y)
    Ex += ex
    Ey += ey
    P_tot += P_puntual(*carga, x=X, y=Y)

fig = plt.figure(figsize=(4,5))

color = np.log(np.hypot(Ex, Ey))
plt.streamplot(x, y, Ex, Ey, color=color, linewidth=0.7, cmap=plt.cm.hot,
              density=1.3, arrowstyle='->', arrowsize=1.5, zorder=0)

#pintamos los objetos 
for q, posx,posy in cargas:
    if q < 0 :
        plt.scatter(posx,posy,zorder=1, s=90, facecolors='blue' )
    else:
        plt.scatter(posx,posy,zorder=1, s=90, facecolors='red' )

contornos = np.linspace(np.min(P_tot),np.max(P_tot),20)
plt.contour(X, Y, P_tot,contornos, colors='w')
        
plt.xlabel(r'${X}$', fontsize=15)
plt.ylabel(r'${Y}$', fontsize=15)
plt.title(r'${\phi(x,y)}$', fontsize=14)
plt.show()
```


    
![png](Visualizar_campoElectrico_files/Visualizar_campoElectrico_35_0.png)
    


Finalmente, construiremos una última forma de visualizar el potencial y las líneas de campo eléctrico, dado que las últimas imágenes contienen demasiada información. Como el potencial $\phi(x,y)$ es básicamente una imagen, usamos el método $\mathtt{imshow}


```python
plt.figure(figsize=(4,5))

cmap = sns.diverging_palette(255,5, s=105, l=40, n=90, center="dark", as_cmap=True)
plt.imshow(P_tot, extent=(-4, 4, -8, 8), cmap=cmap,aspect='auto')
cbar = plt.colorbar()
cbar.set_label(r'${\phi(x,y)}$',size=14)

plt.streamplot(x, y, Ex, Ey, color=color, linewidth=0.8, cmap=plt.cm.cividis,
              density=1.3, arrowstyle='->', arrowsize=1.5, zorder=0)

plt.ylim(-8,8)
plt.xlim(-4,4)
plt.xlabel(r'${X}$', fontsize=15)
plt.ylabel(r'${Y}$', fontsize=15)
plt.title(r'${\vec{E}(x,y)}$', fontsize=14, color='yellow')
plt.show()
```


    
![png](Visualizar_campoElectrico_files/Visualizar_campoElectrico_37_0.png)
    


Como siempre, agradecido por su tiempo y atención!

Links a enlaces de referencia:
1. [Learning Scientific Programming with Python](https://scipython.com/blog/visualizing-a-vector-field-with-matplotlib/)
2. [Aeropython](https://nbviewer.org/github/barbagroup/AeroPython/tree/master/)
3. [Apuntes de Electrodinamica de G. Rubilar.](https://github.com/gfrubi/electrodinamica)
