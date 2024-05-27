---
layout: default
title: FisicaDeFronteras
mathjax: true
---
{% include mathjax.html %}

## Apuntes del curso "Física de fronteras" para pedagogía en matemáticas y física, Universidad de Talca.

Estimado estudiantado,

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

Las ondas 

#### Paquetes de campo que viajan como ondas por el vacío.

$$
\nabla^2 \mathbf{E} - \mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{E}}{\partial t^2} = 0,
$$

que es la ecuación de onda para el campo eléctrico $\mathbf{E}$ en el vacío. Para obtener la ecuación de onda del campo magnético $\mathbf{B}$ es análogo al anterior (tomar el rotacioal, aplicar la identidad, intercambiar derivadas, reemplazar  el rotacional dentro de la derivada temporal, reordenar términos), por lo que obtenemos:


### 2.- Las teorías clásicas fallan.


#### Radiación de cuerpo negro


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

donde R es la potencia/area. Cuando fueron anunciados sus resultados en 1900, Planck no sintió mucha aprobación del mundo científico; es más, él mismo creía que había encontrado una solución ad-hoc para el problema físico de la catástrofe ultravioleta. 


#### Efecto fotoeléctrico

#### Efecto Compton

#### Principio de correspondencia

### 3.- Física moderna.

#### Atomo de Hidrógeno 

#### La Hipótesis de de Broglie

#### Ecuación de Shrodinger

### 4.- Las matemáticas de los números cuánticos.

#### La ecuación de Schrödinger y La evolución temporal.

La ecuación de Schrödinger tridimensional en coordenadas esféricas se utiliza comúnmente para describir sistemas físicos con simetría esférica, como átomos o partículas en potenciales esféricamente simétricos. La forma general de la ecuación de Schrödinger en coordenadas esféricas es:

$$
i \hbar \frac{\partial \psi}{\partial t} = -\frac{\hbar^2}{2m} \nabla^2 \psi + V \psi
$$

El Laplaciano en Esféricas:

$$
\nabla^2 = \frac{1}{r^2} \frac{\partial}{\partial r} \left( r^2 \frac{\partial}{\partial r} \right) + \frac{1}{r^2 \sin(\theta)} \frac{\partial}{\partial \theta} \left( \sin(\theta) \frac{\partial}{\partial \theta} \right) + \frac{1}{r^2 \sin^2(\theta)} \frac{\partial^2}{\partial \phi^2}
$$

Schrodinger en esfericas, dependiente del tiempo 

$$
-\frac{\hbar^2}{2\mu} \left( \frac{1}{r^2} \frac{\partial}{\partial r} \left( r^2 \frac{\partial \psi}{\partial r} \right) + \frac{1}{r^2 \sin \theta} \frac{\partial}{\partial \theta} \left( \sin \theta \frac{\partial \psi}{\partial \theta} \right) + \frac{1}{r^2 \sin^2 \theta} \frac{\partial^2 \psi}{\partial \phi^2} \right) + V(r) \psi = i \hbar \frac{\partial \psi}{\partial t}
$$


Asumiendo soluciones del tipo: $\psi(\vec{x,y,z},t)=\varphi(x,y,z) {\rm e}^{\frac{-i Et}{\hbar}}$ (separando variables)

$$
-\frac{\hbar^2}{2\mu} \left( \frac{1}{r^2} \frac{\partial}{\partial r} \left( r^2 \frac{\partial \varphi}{\partial r} \right) + \frac{1}{r^2 \sin \theta} \frac{\partial}{\partial \theta} \left( \sin \theta \frac{\partial \varphi}{\partial \theta} \right) + \frac{1}{r^2 \sin^2 \theta} \frac{\partial \varphi}{\partial \varphi^2} \right) + V(r) \varphi = E \varphi
$$


Que es la ecuación de Schrödinger independiente del tiempo en coordenadas esféricas. 


Separación de variables

Suponemos que la función de onda $\varphi(r, \theta, \phi)$ se puede separar en una parte radial $R(r)$ y una parte angular $Y(\theta, \phi)$, es decir:

$$
\varphi(r, \theta, \phi) = R(r)Y(\theta, \phi)
$$

$$
-\frac{\hbar^2}{2\mu} \left( \frac{1}{r^2} \frac{d}{dr} \left( r^2 \frac{dR}{dr} \right) Y + \frac{1}{r^2 \sin(\theta)} \frac{d}{d\theta} \left( \sin(\theta) \frac{dY}{d\theta} \right) R + \frac{1}{r^2 \sin^2(\theta)} \frac{d^2Y}{d\phi^2} R \right) + V(r) RY = E(RY)
$$

Dividimos por algunos terminos:

$$
-\frac{\hbar^2}{2\mu} \left( \frac{1}{r^2} \frac{d}{dr} \left( r^2 \frac{dR}{dr} \right) + \frac{1}{r^2 \sin(\theta)} \frac{d}{d\theta} \left( \sin(\theta) \frac{dY}{d\theta} \right) + \frac{1}{r^2 \sin^2(\theta)} \frac{d^2Y}{d\phi^2} \right) + V(r) = E
$$

$$
-\frac{\hbar^2}{2\mu} \frac{d^2 u(r)}{dr^2} + \left( V(r) + \frac{\hbar^2}{2\mu} \frac{l(l+1)}{r^2} \right) u(r) = E u(r)
$$

...

En resumen:

$$
\frac{1}{r^2}\frac{d}{dr} \left( r^2 \frac{dR}{dr} \right) +\left[ \frac{2\mu}{\hbar^2}(E +V(r)) - \frac{\ell(\ell+1)}{r^2} \right] R = 0  
$$

$$
\frac{1}{\sin(\theta)} \frac{d}{d\theta} (\sin(\theta) \frac{d\Theta}{d\theta}) + \left[ \ell(\ell +1) - \frac{m^2}{\sin^2(\theta)}\right] \Theta = 0
$$

donde la solución es: $\Theta(\theta) = P_l^m(\cos \theta)$, donde $P_l^m$ son los polinomios asociados de Legendre.

$$
\frac{d\Phi^2}{d\phi^2}+m^2\Phi = 0
$$

La solución para esta última es más evidente: $\Phi(\phi)=e^{im\phi}$, donde aquí obtenemos el número cuántico $m$


La solución general para la función de onda $\psi$ es:

$$
\psi_{nlm}(r, \theta, \phi, t) = R_{nl}(r) P_l^m(\cos \theta) e^{im\phi} e^{-iE_nt/\hbar}
$$

donde:

1. $R_{nl}(r)$ es la solución radial.
2. $P_l^m(\cos \theta)$ son los polinomios asociados de Legendre.
3. $e^{im\phi}$ es la solución en $\phi$.
4. $e^{-iE_nt/\hbar}$ representa la parte temporal.

Veamo que, dentro de las soluciones de estas ecuaciones diferenciales, aparecen los números cuánticos $l$ y $m$.

Los números cuánticos asociados son:

1. $n$: número cuántico principal, que surge de la solución radial.
2. $l$: número cuántico del momento angular orbital, que surge de la solución angular.
3. $m$: número cuántico magnético, que especifica la orientación del momento angular en el espacio.



