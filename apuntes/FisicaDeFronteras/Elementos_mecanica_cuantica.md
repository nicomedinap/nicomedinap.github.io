---
layout: default
title: FisicaDeFronteras
mathjax: true
---
{% include mathjax.html %}

## Apuntes del curso "Física de fronteras" para pedagogía en matemáticas y física, Universidad de Talca.

Estimado estudiantado,

Es de mi agrado informar que este espacio será exclusivo para desarrollar ideas, ordenar reflexiones, realizar cálculos y brindar información sobre el actual curso de "Física de fronteras", donde estudiaremos los fenómenos físicos de vanguardia en los últimos 100 años.

Algunos cálculos que quizá no son vitales para el entendimiento de este curso, serán desarrollados en este espacio con el fin de que ustedes puedan verlos y sabes desde dónde provienen las ideas contra-intuitivas de la realidad.

Las diapositivas actualizadas (hasta el 03/04/24) se encuentran en [ESTE LINK!]()

Conceptos previos 

* <ins>Sistema de referencia:</ins> Elección de un punto de referencia, usualmente denominado “O”, desde donde se determinan las cantidades físicas observable. 
* <ins>Sistema de coordenadas:</ins> Construcción puramente matemática, con el cual se busca la representación de las relaciones matemáticas. Los valores medidos de las cantidades físicas son independientes del sistema coordenado. 
* <ins>Partícula:</ins> Por excelencia, el uso del método griego de la “abstracción". Es abstraer un cuerpo de masa M en un punto para no tener en cuenta  su forma.
* <ins>Movimiento:</ins> Cambio “continuo” de sucesos (posición) definido con respecto a un sistema de referencia inercial.
* <ins>Campo:</ins> Una teoría de campos (a diferencia de una teoría discreta) posee un número infinito (continuo) de grados de libertad.
* <ins>Grados de libertad:</ins> número mínimo de coordenadas independientes (escalares) necesarias para determinar simultáneamente la posición de cada partícula en un sistema dinámico.
* <ins>Tiempo:</ins> Magnitud física que permite ordenar la secuencia de los sucesos, estableciendo un pasado, un presente y un futuro.
* <ins>Simetrías y cantidades conservadas:</ins> Característica de la geometría y otras definiciones abstractas, que relaciona la invariancia bajo ciertas transformaciones, como, por ejemplo, movimientos.


#### Unidad 2: Elementos de mecánica cuántica.

1. Brevísimo repaso de la teoría electromagnética.
2. Las teorías clásicas fallan.
3. Física moderna.
4. La matemática de los números cuánticos.
5. La ecuación de Schrödinger y la evolución temporal.

#### Bibliografía unidad 2.

Wikipedia: Iré recolectando los links desde dónde tome información, y la iré dejando acá abajo.

[<ins> Apuntes de Mecánica cuántica I</ins>](http://llacolen.ciencias.uchile.cl/~vmunoz/cursos/cuantica/qm.pdf){:target="_blank"}


### 1.- Brevísimo repaso de la teoría electromagnética de James Clerk Maxwell

Publicadas en 1865, James Clerk Maxwell (1832-1879) compiló el trabajo de Charles Coulomb, André-Marie Ampère, felix Savart, Jean-Baptiste Biot Michael Faraday y Hans Christian Orsted. Condensó en 4 expresiones (ya sean de forma diferencial y/o integral), las cuales tienen la siguiente forma:

:---: | :---:
Ley de Gauss para el campo eléctrico | $ \displaystyle \nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}$
Ley de Gauss para el campo magnético | $ \displaystyle \nabla \cdot \mathbf{B} = 0 $
Ley de inducción de Faraday          | $ \displaystyle \nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t} $
Ley de Ampere-Maxwell | $ \displaystyle \nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t} $

donde: 
* $\mathbf{E}$ es el vector del campo eléctrico,
* $\mathbf{B}$ es el vector de campo magnético,
* $\rho$ es la densidad de cargas,
* $\mathbf{J}$ denota el vector densidad de corriente,
* $\mu_0$ es la permeabilidad del vacío, ($4\pi \times 10^{-7}$ [H/m]),
* $\varepsilon_0$ es la permitividad del vacío ($8.854 \times 10^{-12}$ [F/m]),

#### Paquetes de campo que viajan como ondas por el vacío.

$$
\nabla^2 \mathbf{E} - \mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{E}}{\partial t^2} = 0,
$$

que es la ecuación de onda para el campo eléctrico $\mathbf{E}$ en el vacío. Para obtener la ecuación de onda del campo magnético $\mathbf{B}$ es análogo al anterior (tomar el rotacioal, aplicar la identidad, intercambiar derivadas, reemplazar  el rotacional dentro de la derivada temporal, reordenar términos), por lo que obtenemos:


### 2.- Las teorías clásicas fallan.

Teoría de Max Planck: Cada oscilador puede emitir o absorver energía en cantididade que son múltiplos enteros de cierta cantidad básica de energia $n\epsilon$, tal que:

$$
E=n\epsilon, n=1,2,3,...,
$$

donde $n$ es el número de cuantos, o $quanta$, desde donde proviene el nómbre de la teoría. La energía de cada uno de los cuantos $n$ esta determinada por la frecuencia:

$$
\epsilon = h f,
$$

donde $h$ es la constante de proporcionalidad de Planck

Una de las consecuencias más importantes de la ley de Planck es la deducción de la ley de Stefan-boltzmann. Indica que el valor de la energía total radiada por unidad de superficie y unidad de tiempo en todas las longitudes de onda, es proporcional a la cuarta potencia de la temperatura.
A la energía total radiada por unidad de superficie de un cuerpo negro en una unidad de tiempo, en todas las longitudes de onda se la conoce como potencia emisiva, y viene dada por:

$$
R=\sigma T^4,
$$

donde R es la potencia/area.

Una estrella con temperatura superficial de 3000 Kelvin radía 100 veces la potencia del sol: ¿cuál es su radio?...

$$

$$

Cuando fueron anunciados sus resultados en 1900, Planck no sintió mucha aprobación del mundo científico; es más, él mismo creía que había encontrado una solución ad-hoc para el problema físico de la catástrofe ultravioleta. 


### 3.- Física moderna.

Física atómica.

### 4.- Las matemáticas de los números cuánticos.

Ecuacion de Shrodinger en tres dimensiones

El Laplaciano 

$$
\nabla^2 = \frac{1}{r^2} \frac{\partial}{\partial r} \left( r^2 \frac{\partial}{\partial r} \right) + \frac{1}{r^2 \sin(\theta)} \frac{\partial}{\partial \theta} \left( \sin(\theta) \frac{\partial}{\partial \theta} \right) + \frac{1}{r^2 \sin^2(\theta)} \frac{\partial^2}{\partial \phi^2}
$$


### 5.- La ecuación de Schrödinger y La evolución temporal.

La ecuación de Schrödinger tridimensional en coordenadas esféricas se utiliza comúnmente para describir sistemas físicos con simetría esférica, como átomos o partículas en potenciales esféricamente simétricos. La forma general de la ecuación de Schrödinger en coordenadas esféricas es:

$$
-\frac{\hbar^2}{2\mu} \left( \frac{1}{r^2} \frac{\partial}{\partial r} \left( r^2 \frac{\partial \psi}{\partial r} \right) + \frac{1}{r^2 \sin(\theta)} \frac{\partial}{\partial \theta} \left( \sin(\theta) \frac{\partial \psi}{\partial \theta} \right) + \frac{1}{r^2 \sin^2(\theta)} \frac{\partial^2 \psi}{\partial \phi^2} \right) + V(r,\theta,\phi) \psi(r,\theta,\phi) = i\hbar \frac{\partial \psi}{\partial t}
$$

Separación de variables

Suponemos que la función de onda $psi(r, \theta, \phi)$ se puede separar en una parte radial $R(r)$ y una parte angular $Y(\theta, \phi)$, es decir:

$$
\psi(r, \theta, \phi) = R(r)Y(\theta, \phi)
$$



$$
-\frac{\hbar^2}{2\mu} \frac{1}{R} \frac{1}{r^2} \frac{d}{dr} \left( r^2 \frac{dR}{dr} \right) + V(r) = E
$$

Dado que esta es una ecuación diferencial de segundo orden, es conveniente hacer el cambio de variable $u(r) = rR(r)$. Entonces, la ecuación se transforma en:

$$
-\frac{\hbar^2}{2\mu} \frac{d^2u}{dr^2} + V(r)u = Eu
$$

Esta es la forma de la ecuación radial de Schrödinger, que debe resolverse para obtener las funciones de onda radiales.

Resolución de la parte angular:

$$
\frac{1}{Y} \left( \frac{1}{\sin(\theta)} \frac{d}{d\theta} \left( \sin(\theta) \frac{dY}{d\theta} \right) + \frac{1}{\sin^2(\theta)} \frac{d^2Y}{d\phi^2} \right) = -\frac{2\mu}{\hbar^2} E
$$

Esta ecuación angular es la ecuación de Laplace en coordenadas esféricas, cuyas soluciones son las funciones armónicas esféricas \(Y(\theta,\phi)\). Las soluciones a esta ecuación proporcionarán los números cuánticos asociados al momento angular del sistema: el número cuántico principal \(l\) y el número cuántico magnético \(m\). Las funciones armónicas esféricas están tabuladas y se pueden expresar como combinaciones de polinomios de Legendre y exponenciales complejas.

Una vez que se resuelven las partes radial y angular de la ecuación de Schrödinger, la función de onda total \(\psi(r,\theta,\phi)\) se obtiene multiplicando la solución radial por la solución angular.
