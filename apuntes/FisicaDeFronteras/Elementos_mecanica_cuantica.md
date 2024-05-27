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

Estos provienen básicamente de la física atómica

Ecuacion de Shrodinger en tres dimensiones

El Laplaciano 

$$
\nabla^2 = \frac{1}{r^2} \frac{\partial}{\partial r} \left( r^2 \frac{\partial}{\partial r} \right) + \frac{1}{r^2 \sin(\theta)} \frac{\partial}{\partial \theta} \left( \sin(\theta) \frac{\partial}{\partial \theta} \right) + \frac{1}{r^2 \sin^2(\theta)} \frac{\partial^2}{\partial \phi^2}
$$

#### La ecuación de Schrödinger y La evolución temporal.

La ecuación de Schrödinger tridimensional en coordenadas esféricas se utiliza comúnmente para describir sistemas físicos con simetría esférica, como átomos o partículas en potenciales esféricamente simétricos. La forma general de la ecuación de Schrödinger en coordenadas esféricas es:

$$
-\frac{\hbar^2}{2\mu} \left( \frac{1}{r^2} \frac{\partial}{\partial r} \left( r^2 \frac{\partial \psi}{\partial r} \right) + \frac{1}{r^2 \sin(\theta)} \frac{\partial}{\partial \theta} \left( \sin(\theta) \frac{\partial \psi}{\partial \theta} \right) + \frac{1}{r^2 \sin^2(\theta)} \frac{\partial^2 \psi}{\partial \phi^2} \right) + V(r) \psi(r,\theta,\phi) = i\hbar \frac{\partial \psi}{\partial t}
$$

Separación de variables

Suponemos que la función de onda $\psi(r, \theta, \phi)$ se puede separar en una parte radial $R(r)$ y una parte angular $Y(\theta, \phi)$, es decir:

$$
\psi(r, \theta, \phi) = R(r)Y(\theta, \phi)
$$

$$
-\frac{\hbar^2}{2\mu} \left( \frac{1}{r^2} \frac{d}{dr} \left( r^2 \frac{dR}{dr} \right) Y + \frac{1}{r^2 \sin(\theta)} \frac{d}{d\theta} \left( \sin(\theta) \frac{dY}{d\theta} \right) R + \frac{1}{r^2 \sin^2(\theta)} \frac{d^2Y}{d\phi^2} R \right) + V(r) RY = i\hbar \frac{\partial}{\partial t} (RY)
$$


$$
-\frac{\hbar^2}{2\mu} \left( \frac{1}{r^2} \frac{d}{dr} \left( r^2 \frac{dR}{dr} \right) + \frac{1}{r^2 \sin(\theta)} \frac{d}{d\theta} \left( \sin(\theta) \frac{dY}{d\theta} \right) + \frac{1}{r^2 \sin^2(\theta)} \frac{d^2Y}{d\phi^2} \right) + V(r, \theta, \phi) = E
$$


$$
-\frac{\hbar^2}{2\mu} \frac{1}{r^2} \frac{d}{dr} \left( r^2 \frac{dR}{dr} \right) + V(r)R = ER
$$












--------------------

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







----

\section*{Ecuaciones diferenciales asociadas a los números cuánticos}

\subsection*{Parte radial}

La ecuación radial para el átomo de hidrógeno es:

$$
-\frac{\hbar^2}{2\mu} \frac{d^2 u(r)}{dr^2} + \left( V(r) + \frac{\hbar^2}{2\mu} \frac{l(l+1)}{r^2} \right) u(r) = E u(r)
$$

\subsection*{Parte angular}

Las ecuaciones diferenciales angulares se separan en dos partes:

\subsubsection*{Ecuación en \(\theta\)}

$$
\frac{1}{\sin \theta} \frac{d}{d \theta} \left( \sin \theta \frac{d \Theta(\theta)}{d \theta} \right) + \left( l(l+1) - \frac{m^2}{\sin^2 \theta} \right) \Theta(\theta) = 0
$$

\subsubsection*{Ecuación en \(\phi\)}

$$
\frac{d^2 \Phi(\phi)}{d \phi^2} = -m^2 \Phi(\phi)
$$

\subsection*{Números cuánticos}

Los números cuánticos asociados a estas soluciones son:

\begin{itemize}
  \item \(n\): número cuántico principal (solución de la ecuación radial).
  \item \(l\): número cuántico del momento angular orbital (solución de la ecuación en \(\theta\)).
  \item \(m\): número cuántico magnético (solución de la ecuación en \(\phi\)).
\end{itemize}





\section*{Ecuación del átomo de hidrógeno y números cuánticos}

\subsection*{Ecuación de Schrödinger en coordenadas esféricas}

La ecuación de Schrödinger en coordenadas esféricas para el átomo de hidrógeno es:

$$
-\frac{\hbar^2}{2\mu} \left( \frac{1}{r^2} \frac{\partial}{\partial r} \left( r^2 \frac{\partial \psi}{\partial r} \right) + \frac{1}{r^2 \sin \theta} \frac{\partial}{\partial \theta} \left( \sin \theta \frac{\partial \psi}{\partial \theta} \right) + \frac{1}{r^2 \sin^2 \theta} \frac{\partial^2 \psi}{\partial \phi^2} \right) + V(r) \psi = E \psi
$$

\subsection*{Separación de variables}

Suponemos una solución de la forma:

$$
\psi(r, \theta, \phi) = R(r) Y(\theta, \phi)
$$

\subsection*{Parte radial}

Sustituimos la solución propuesta en la ecuación de Schrödinger y separamos las variables, lo que nos lleva a la ecuación radial:

$$
-\frac{\hbar^2}{2\mu} \left( \frac{1}{r^2} \frac{d}{dr} \left( r^2 \frac{dR}{dr} \right) + \frac{l(l+1)}{r^2} \right) R(r) + V(r)R(r) = E R(r)
$$

\subsection*{Parte angular}

La parte angular se resuelve utilizando las funciones armónicas esféricas \( Y(\theta, \phi) \), que llevan a los números cuánticos \( l \) y \( m \).

\subsection*{Números cuánticos}

Los números cuánticos asociados son:

1. \( n \): número cuántico principal, que surge de la solución radial.
2. \( l \): número cuántico del momento angular orbital, que surge de la solución angular.
3. \( m \): número cuántico magnético, que especifica la orientación del momento angular en el espacio.


-----



Eq de Schrodinger:

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


Parte radial:





En resumen:

$$
\frac{1}{r^2}\frac{d}{dr} \left( r^2 \frac{dR}{dr} \right) +\left[ \frac{2\mu}{\hbar^2}(E +V(r)) - \ell(\ell+1) \right]  

$$


