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

Conceptos previos 

* Sistema de referencia: Elección de un punto de referencia, usualmente denominado “O”, desde donde se determinan las cantidades físicas observable. 
* Sistema de coordenadas: Construcción puramente matemática, con el cual se busca la representación de las relaciones matemáticas. Los valores medidos de las cantidades físicas son independientes del sistema coordenado. 
* Partícula: Por excelencia, el uso del método griego de la “abstracción". Es abstraer un cuerpo de masa M en un punto para no tener en cuenta  su forma.
* Suceso: Cualquier cosa o evento que ocurra en un punto del espacio, en un instante dado. La posición de un suceso queda operacionalmente definida por cuatro datos $(x,y,x,t)$. La posición de una partícula es definida, por ejemplo, como un suceso.
* Movimiento: Cambio “continuo” de sucesos (posición) definido con respecto a un sistema de referencia inercial.
* Sistema de referencia inercial (SRI): En mecánica Newtoniana, un SRI es un sistema donde las leyes de movimiento cumplen las leyes de Newton.
* Campo: Una teoría de campos se diferencia de una teoría discreta por poseer  un número infinito (continuo) de grados de libertad.
* Grados de libertad: número mínimo de coordenadas independientes (escalares) necesarias para determinar simultáneamente la posición de cada partícula en un sistema dinámico.
* Tiempo: Magnitud física que permite ordenar la secuencia de los sucesos, estableciendo un pasado, un presente y un futuro.
* Simetrías y cantidades conservadas: Característica de la geometría y otras definiciones abstractas, que relaciona la invariancia bajo ciertas transformaciones, como, por ejemplo, movimientos.


### Sobre vectores y su álgebra

Cualquier persona que ha manipulado una expresión matemática alguna vez en su vida debe haber notado que estas pueden tomar longuitudes inesperadas, por decirlo menos. Y en el mundo real, típico que es necesario definir objetos con multiples componentes, ¿Verdad? Es por ello que conviene usar un lenguaje que sea lo suficientemente compacto y en el cual no se pierda información en el proceso.

Como definición (muy informal), un vector en algún espacio Euclideano que vive en un espacio de $N$ dimensiones ${\displaystyle \mathbb {R}^{N}}$, puede ser descrito de la siguiente forma:

$$
\begin{align}
\vec{x}& = x_{1}\hat{e}_{1}+x_{2}\hat{e}_{2}+x_{3}\hat{e}_{3}+\cdots+x_{N}\hat{e}x_{N} \\
       & = \sum_{i=1}^{N}x_{i} \hat{e}_{i} \\
\end{align}
$$


## Unidad 1: Elementos de relatividad general.

1. Breve repaso de la teoría electromagnética de James Clerk Maxwell.
2. Los principios de la relatividad.
3. La relatividad especial de Einstein.
4. La necesidad de la relatividad general.
5. Relatividad general y sus alcances.

### Bibliografía unidad 1.

Teoría de la relatividad General, de Bert Janssen. [LINK](https://www.ugr.es/~bjanssen/text/BertJanssen-RelatividadGeneral.pdf)

Electrodinámica, de Guillermo Rubilar. [LINK](https://drive.google.com/viewer?url=https://github.com/gfrubi/electrodinamica/raw/master/electrodinamica.pdf)

Wikipedia: Iré recolectando los links desde dónde tome información, y la iré dejando acá abajo.

[Einstein’s steady-state theory: an abandoned model of the
cosmos](https://arxiv.org/pdf/1402.0132.pdf)


### 1.- Breve repaso de la teoría electromagnética de James Clerk Maxwell

Publicadas en 1865, James Clerk Maxwell (1832-1879) compiló el trabajo de Charles Coulomb, André-Marie Ampère, felix Savart, Jean-Baptiste Biot Michael Faraday y Hans Christian Orsted; 

$$
\textbf{Maxwell's Equations:}

\textbf{Gauss's Law for Electricity:}
\begin{equation*}
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}
\end{equation*}

\textbf{Gauss's Law for Magnetism:}
\begin{equation*}
\nabla \cdot \mathbf{B} = 0
\end{equation*}

\textbf{Faraday's Law of Induction:}
\begin{equation*}
\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}
\end{equation*}

\textbf{Ampère's Law with Maxwell's Addition:}
\begin{equation*}
\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{equation*}
$$



### Ondas en el vacío 

$$
\textbf{Wave Equation of Electromagnetics:}

\textbf{For Electric Field (\(\mathbf{E}\)):}
\begin{equation*}
\nabla^2 \mathbf{E} - \mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{E}}{\partial t^2} = 0
\end{equation*}

\textbf{For Magnetic Field (\(\mathbf{B}\)):}
\begin{equation*}
\nabla^2 \mathbf{B} - \mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{B}}{\partial t^2} = 0
\end{equation*}

Where:
\begin{itemize}
    \item \(\mathbf{E}\) is the electric field vector,
    \item \(\mathbf{B}\) is the magnetic field vector,
    \item \(\nabla^2\) is the Laplacian operator (divergence of the gradient),
    \item \(\mu_0\) is the permeability of free space (\(4\pi \times 10^{-7}\) H/m),
    \item \(\varepsilon_0\) is the permittivity of free space (\(8.854 \times 10^{-12}\) F/m), and
    \item \(\frac{\partial^2}{\partial t^2}\) denotes the second partial derivative with respect to time.
\end{itemize}
$$


Taking the curl of Faraday's law:

$$
\[
\nabla \times \left( \nabla \times \mathbf{E} \right) = -\nabla \times \frac{\partial \mathbf{B}}{\partial t}
\]
$$

Using vector calculus identity 

$$
\(\nabla \times \left( \nabla \times \mathbf{E} \right) = \nabla (\nabla \cdot \mathbf{E}) - \nabla^2 \mathbf{E}\) and \(\nabla \cdot \mathbf{E} = 0\), 
$$
we get:

$$
\[
\nabla^2 \mathbf{E} = -\frac{\partial}{\partial t} (\nabla \times \mathbf{B})
\]
$$

Substituting Ampère's Law, 

$$
\(\nabla \times \mathbf{B} = \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}\), 
$$

into the equation:

$$
\[
\nabla^2 \mathbf{E} = -\frac{\partial}{\partial t} \left( \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t} \right)
\]
$$

Similarly, we can derive the equation for $\(\mathbf{B}\)$:

$$
\[
\nabla^2 \mathbf{B} = -\frac{\partial}{\partial t} \left( \mu_0 \varepsilon_0 \frac{\partial \mathbf{B}}{\partial t} \right)
\]
$$

These equations represent the wave equations for the electric and magnetic fields in vacuum. They describe how electromagnetic waves propagate through space without any external sources of charge or current.



### Demostración de que las ondas electromagnéticas en el vacío son ondas que viajan a la velocidad de la luz



## Conceptos de relatividad

##  