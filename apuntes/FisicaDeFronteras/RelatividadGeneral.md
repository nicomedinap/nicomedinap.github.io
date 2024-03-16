---
layout: default
title: FisicaDeFronteras
mathjax: true
---
{% include mathjax.html %}

Pasamos por linares a las 15.10.

## Apuntes del curso "Física de fronteras" para pedagogía en matemáticas y física, Universidad de Talca.

Estimado estudiantado,

Es de mi agrado informar que este espacio será exclusivo para desarrollar ideas, ordenar reflexiones, realizar cálculos y brindar información sobre el actual curso de "Física de fronteras", donde estudiaremos los fenómenos físicos de vanguardia en los últimos 100 años.

Algunos cálculos que quizá no son vitales para el entendimiento de este curso, serán desarrollados en este espacio con el fin de que ustedes puedan verlos y sabes desde dónde provienen las ideas contra-intuitivas de la realidad.

Conceptos previos 

* <ins>Sistema de referencia:</ins> Elección de un punto de referencia, usualmente denominado “O”, desde donde se determinan las cantidades físicas observable. 
* <ins>Sistema de coordenadas:</ins> Construcción puramente matemática, con el cual se busca la representación de las relaciones matemáticas. Los valores medidos de las cantidades físicas son independientes del sistema coordenado. 
* <ins>Partícula:</ins> Por excelencia, el uso del método griego de la “abstracción". Es abstraer un cuerpo de masa M en un punto para no tener en cuenta  su forma.
* <ins>Suceso:</ins> Cualquier cosa o evento que ocurra en un punto del espacio, en un instante dado. La posición de un suceso queda operacionalmente definida por cuatro datos $(x,y,x,t)$. La posición de una partícula es definida, por ejemplo, como un suceso.
* <ins>Movimiento:</ins> Cambio “continuo” de sucesos (posición) definido con respecto a un sistema de referencia inercial.
* <ins>Sistema de referencia inercial (SRI):</ins> En mecánica Newtoniana, un SRI es un sistema donde las leyes de movimiento cumplen las leyes de Newton.
* <ins>Campo:</ins> Una teoría de campos se diferencia de una teoría discreta por poseer  un número infinito (continuo) de grados de libertad.
* <ins>Grados de libertad:</ins> número mínimo de coordenadas independientes (escalares) necesarias para determinar simultáneamente la posición de cada partícula en un sistema dinámico.
* <ins>Tiempo:</ins> Magnitud física que permite ordenar la secuencia de los sucesos, estableciendo un pasado, un presente y un futuro.
* <ins>Simetrías y cantidades conservadas:</ins> Característica de la geometría y otras definiciones abstractas, que relaciona la invariancia bajo ciertas transformaciones, como, por ejemplo, movimientos.

#### Sobre vectores y su álgebra

Cualquier persona que ha manipulado una expresión matemática alguna vez en su vida debe haber notado que estas pueden tomar longuitudes inesperadas, por decirlo menos. Y en el mundo real, típico que es necesario definir objetos con multiples componentes, ¿Verdad? Es por ello que conviene usar un lenguaje que sea lo suficientemente compacto y en el cual no se pierda información en el proceso.

Como definición (muy informal), un vector en algún espacio Euclideano que vive en un espacio de $N$ dimensiones ${\displaystyle \mathbb {R}^{N}}$, puede ser descrito de la siguiente forma:

$$
\begin{align}
\vec{x}& = x_{1}\hat{e}_{1}+x_{2}\hat{e}_{2}+x_{3}\hat{e}_{3}+\cdots+x_{N}\hat{e}x_{N} \\
       & = \sum_{i=1}^{N}x_{i} \hat{e}_{i} \\
\end{align}
$$

#### Unidad 1: Elementos de relatividad general.

1. Breve repaso de la teoría electromagnética de James Clerk Maxwell.
2. Los principios de la relatividad.
3. La relatividad especial de Einstein.
4. La necesidad de la relatividad general.
5. Relatividad general y sus alcances.

#### Bibliografía unidad 1.

<ins>Teoría de la relatividad General, de Bert Janssen.</ins> [LINK](https://www.ugr.es/~bjanssen/text/BertJanssen-RelatividadGeneral.pdf)

<ins>Electrodinámica, de Guillermo Rubilar.</ins> [LINK](https://drive.google.com/viewer?url=https://github.com/gfrubi/electrodinamica/raw/master/electrodinamica.pdf)

Wikipedia: Iré recolectando los links desde dónde tome información, y la iré dejando acá abajo.

<ins> .</ins> [Einstein’s steady-state theory: an abandoned model of the
cosmos](https://arxiv.org/pdf/1402.0132.pdf)


### 1.- Breve repaso de la teoría electromagnética de James Clerk Maxwell

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

Si consideramos las leyes de Maxwell en el vacío, no existirán ni cargas $\rho$ ni corrientes $\mathbf{J}$ que puedan modificar actívamente los campos $\mathbf{E}$ y $\mathbf{B}$, por lo que las ecuaciones anteriores se reducen a:

:---: | :---:
Ley de Gauss para el campo eléctrico | $ \displaystyle \nabla \cdot \mathbf{E} = 0$
Ley de Gauss para el campo magnético | $ \displaystyle \nabla \cdot \mathbf{B} = 0 $
Ley de inducción de Faraday          | $ \displaystyle \nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t} $
Ley de Ampere-Maxwell | $ \displaystyle \nabla \times \mathbf{B} = \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t} $

Así, considerando una de las clásicas identidades vectoriales para un campo vectorial en tres dimensiones espaciales $\mathbf{A}(\mathbf{x}) = \mathbf{A}(x,y,z)$:

$$
\nabla \times \left( \nabla \times \mathbf{A} \right) = \nabla (\nabla \cdot \mathbf{A}) - \nabla^2 \mathbf{A},
$$

donde  $\nabla^2$ es el [operador Laplaciano](https://es.wikipedia.org/wiki/Laplaciano_vectorial) (la divergencia del gradiente $\nabla \cdot \nabla $). 

Entonces, manipularemos las ecuaciones en el vacío y usaremos la identidad vectorial antes descrita. Si calculamos el rotacional de la Ley de Faraday, tenemos que:

$$
\nabla \times \left( \nabla \times \mathbf{E} \right) = \nabla \times \left(-\frac{\partial \mathbf{B}}{\partial t} \right).
$$

La parte de la izquierda es igual a la parte de la izquierda de la identidad, por lo que podemos reemplazar:

$$
\nabla (\nabla \cdot \mathbf{E}) - \nabla^2 \mathbf{E} = -\nabla \times \left(\frac{\partial \mathbf{B}}{\partial t} \right).
$$

Considerando que $\nabla \cdot \mathbf{E} = 0$ (¡El vacío!), tenemos que:

$$
\nabla^2 \mathbf{E} = \nabla \times \left(\frac{\partial \mathbf{B}}{\partial t} \right).
$$

También, debemos tener en cuenta que las derivadas espaciales (representadas por $\nabla$) y las temporales ($\frac{\partial}{\partial t}$) no se afectan mutuamente, por lo que su orden es intercambiable, es decir: $\nabla \times \left(\frac{\partial \mathbf{B}}{\partial t} \right) = \frac{\partial}{\partial t} (\nabla \times \mathbf{B})$. Por lo tanto:

$$
\nabla^2 \mathbf{E} = \frac{\partial}{\partial t} (\nabla \times \mathbf{B}).
$$

Finalmente, como $\nabla \times \mathbf{B} = \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}$, llegamos a la ecuación:

$$
\nabla^2 \mathbf{E} = \frac{\partial}{\partial t} \left( \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t} \right).
$$

Reordenando los términos:

$$
\nabla^2 \mathbf{E} - \mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{E}}{\partial t^2} = 0,
$$

que es la ecuación de onda para el campo eléctrico \mathbf{E} en el vacío. Para obtener la ecuación de onda del campo magnético \mathbf{B} es análogo al anterior (tomar el rotacioal, aplicar la identidad, intercambiar derivadas, reemplazar  el rotacional dentro de la derivada temporal, reordenar términos), por lo que obtenemos:

$$
\nabla^2 \mathbf{B} - \mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{B}}{\partial t^2} = 0.
$$

Ambas ecuaciones describen porciones de campo que viajan a través del vacío, a una velocidad finita v:

$$ v = \frac{1}{\sqrt{\mu_0 \varepsilon_0}} = c \sim 3 \times 10^{8} \frac{[\mbox{m}]}{[\mbox{s}]},$$

la que es nada más ni nada mes que, la velocidad de la luz. Por lo tanto, Un cambio en el campo electromagnético genera por lo tanto más cambios, resultando en paquetes de campo propagándose por el espacio independientemente de cargas y corrientes. Estos paquetes de campo se llaman ondas electromagnéticas.


### 2.- Los principios de la relatividad.

#### Conceptos de relatividad


Escena del tren en Top Secret

https://www.youtube.com/watch?v=A_peCIVBTAY


