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

Las diapositivas actualizadas (hasta el 27/03/24) se encuentran en [ESTE LINK!](https://udetalca-my.sharepoint.com/:b:/g/personal/nicolas_medina_utalca_cl/EZ7_k3VB5v5Pg1L91rjnxs8BMAxZ9SZ3q8qkefwdASPqDw?e=pAIjEP)

Conceptos previos 

* <ins>Sistema de referencia:</ins> Elección de un punto de referencia, usualmente denominado “O”, desde donde se determinan las cantidades físicas observable. 
* <ins>Sistema de coordenadas:</ins> Construcción puramente matemática, con el cual se busca la representación de las relaciones matemáticas. Los valores medidos de las cantidades físicas son independientes del sistema coordenado. 
* <ins>Partícula:</ins> Por excelencia, el uso del método griego de la “abstracción". Es abstraer un cuerpo de masa M en un punto para no tener en cuenta  su forma.
* <ins>Suceso:</ins> Cualquier cosa o evento que ocurra en un punto del espacio, en un instante dado. La posición de un suceso queda operacionalmente definida por cuatro datos $(x,y,x,t)$. La posición de una partícula es definida, por ejemplo, como un suceso.
* <ins>Movimiento:</ins> Cambio “continuo” de sucesos (posición) definido con respecto a un sistema de referencia inercial.
* <ins>Sistema de referencia inercial (SRI):</ins> Es aquél sistema de referencia que está en reposo o se mueve con velocidad constante. En mecánica Newtoniana, un SRI es un sistema donde las leyes de movimiento cumplen las leyes de Newton.
* <ins>Campo:</ins> Una teoría de campos (a diferencia de una teoría discreta) posee un número infinito (continuo) de grados de libertad.
* <ins>Grados de libertad:</ins> número mínimo de coordenadas independientes (escalares) necesarias para determinar simultáneamente la posición de cada partícula en un sistema dinámico.
* <ins>Tiempo:</ins> Magnitud física que permite ordenar la secuencia de los sucesos, estableciendo un pasado, un presente y un futuro.
* <ins>Simetrías y cantidades conservadas:</ins> Característica de la geometría y otras definiciones abstractas, que relaciona la invariancia bajo ciertas transformaciones, como, por ejemplo, movimientos.

#### Sobre vectores y su álgebra

Cualquier persona que ha manipulado una expresión matemática alguna vez en su vida debe haber notado que estas pueden tomar longuitudes inesperadas, por decirlo menos. Y en el mundo real, típico que es necesario definir objetos con multiples componentes, ¿Verdad? Es por ello que conviene usar un lenguaje que sea lo suficientemente compacto y en el cual no se pierda información en el proceso.

Como definición (muy informal), un vector en algún espacio Euclideano que vive en un espacio de $N$ dimensiones ${\displaystyle \mathbb {R}^{N}}$, puede ser descrito de la siguiente forma:

$$
\begin{align}
\mathbf{x}& = x_{1}\hat{e}_{1}+x_{2}\hat{e}_{2}+x_{3}\hat{e}_{3}+\cdots+x_{N}\hat{e}x_{N} \\
       & = \sum_{i=1}^{N}x_{i} \hat{e}_{i} \\
\end{align}
$$

POR AHORA estaremos restringidos a vectores trimidensionales $\mathbf{x} = x \hat{i}+ y \hat{j}+z \hat{k}=(x,y,z)$.

#### Unidad 1: Elementos de relatividad general.

1. Breve repaso de la teoría electromagnética de James Clerk Maxwell.
2. Los principios de la relatividad.
3. La relatividad especial de Einstein.
4. La necesidad de la relatividad general.
5. Relatividad general y sus alcances.

#### Bibliografía unidad 1.

<ins>Teoría de la relatividad General, de Bert Janssen.</ins> [LINK](https://www.ugr.es/~bjanssen/text/BertJanssen-RelatividadGeneral.pdf){:target="_blank"}

<ins>Electrodinámica, de Guillermo Rubilar.</ins> [LINK](https://drive.google.com/viewer?url=https://github.com/gfrubi/electrodinamica/raw/master/electrodinamica.pdf){:target="_blank"}

Wikipedia: Iré recolectando los links desde dónde tome información, y la iré dejando acá abajo.

<ins> Einstein’s steady-state theory: an abandoned model of the
cosmos</ins> [Parte de la bibliografía sugerida para este curso](https://arxiv.org/pdf/1402.0132.pdf){:target="_blank"}


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

donde  $\nabla^2$ es el [operador Laplaciano](https://es.wikipedia.org/wiki/Laplaciano_vectorial){:target="_blank"} (la divergencia del gradiente $\nabla \cdot \nabla $). 

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

que es la ecuación de onda para el campo eléctrico $\mathbf{E}$ en el vacío. Para obtener la ecuación de onda del campo magnético $\mathbf{B}$ es análogo al anterior (tomar el rotacioal, aplicar la identidad, intercambiar derivadas, reemplazar  el rotacional dentro de la derivada temporal, reordenar términos), por lo que obtenemos:

$$
\nabla^2 \mathbf{B} - \mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{B}}{\partial t^2} = 0.
$$

Ambas ecuaciones describen porciones de campo que viajan a través del vacío, a una velocidad finita v:

$$ v = \frac{1}{\sqrt{\mu_0 \varepsilon_0}} = c \sim 3 \times 10^{8} \frac{[\mbox{m}]}{[\mbox{s}]},$$

la que es nada más ni nada menos que *la velocidad de la luz*. Por lo tanto, Un cambio en el campo electromagnético genera por lo tanto más cambios, resultando en paquetes de campo propagándose por el espacio independientemente de cargas y corrientes. Estos paquetes de campo se llaman ondas electromagnéticas.

Pero: las ondas viajan con velocidad *c* ¿Con respecto a qué?

### 2.- Los principios de la relatividad.

#### Conceptos de relatividad

<ins>Sistema de referencia inercial (SRI):</ins> En mecánica Newtoniana, un SRI es un sistema donde las leyes de movimiento cumplen las leyes de Newton, tal que:

$$
\frac{d}{dt}(\mathbf{p}) - \mathbf{F}_{\mbox{reales}} = 0, 
$$

donde $\mathbf{p} = m \mathbf{v}$ es el momentum lineal de cierta partícula en movimiento. En un sistema no inercial, tenemos que:

$$
\frac{d}{dt}(\mathbf{p}) - \mathbf{F}_{\mbox{reales}} - \mathbf{f}_{\mbox{ficticias}} = 0, 
$$

En este contexto: ¿qué significaría una fuerza ficticia? ¿Qué ejemplos se conocen de $\mathbf{f}_{\mbox{ficticias}}$?

Algunas observaciones sobre los SRI:
* El punto de referencia es arbitrario. Dado un SRI, cualquier otro sistema de referencia desplazado con respecto al primero, también lo será.
* La orientación de los ejes (o coordenadas) es arbitraria, análogo a lo anterior.
* Para un desplazamiento a velocidad constante dado un sistema de referencia inercial, cualquier otro que se desplace con velocidad lineal constante, sigue siendo inercial. 

Para relacionar un sistema inercian en movimiento rectilineo uniforme y uno estático, se utilizan las *transformaciones de galileo*, esquematizado en la siguiente imagen:

![Link Name](http://relativismo.weebly.com/uploads/1/0/8/3/10833300/_1358700800.jpg)  

Figura 1: esquema de la relatividad de Galileo, imagen tomada desde [este link](http://relativismo.weebly.com/relatividad-de-galileo.html){:target="_blank"}

Para describir la posición de un punto $P$ cualquiera en el espacio desde el origen de coordenadas $O$, se considera el vector $\mathbf{r}=x \hat{i}+ y \hat{j}+z \hat{k}$. También podemos considerar otro sistema de coordenadas que, a un instante $t$, describe el mismo punto $P$ desde el origen $O'$, usando el vector $\mathbf{r}'=x' \hat{i}+ y' \hat{j}+z' \hat{k}$. Si el sistema $O'$ se desplaza a una velocidad constante $\mathbf{V}$ con respecto al observador $O$, en cierto instante $t$, el vector que 
describe la posición del observador $O'$ desde $O$, será $\mathbf{R} = \mathbf{V} \cdot t$.

Por las propiedades de suma de vectores, tenemos que:

$$
\mathbf{r} = \mathbf{r}' + \mathbf{R} = \mathbf{r}' + \mathbf{V} \cdot t.
$$

Escribiendo la igualdad anterior término a término, tenemos que:

$$
\begin{align}
x \hat{i}+ y \hat{j}+z \hat{k} =& x' \hat{i}+ y' \hat{j}+z' \hat{k} + \mathbf{V} \cdot t \\
	   =& x' \hat{i}+ y' \hat{j}+z' \hat{k} + V_x t\ \hat{i} + V_y t\ \hat{j} + V_z t\ \hat{k} \\
       =& (x'+V_x t)\hat{i} + (y'+V_y t)\hat{j} + (z'+V_z t)\hat{k} \\
\end{align}
$$

Por lo tanto, tenemos expresiones para cada coordenada:

:---: | :---: 
$x= x'+V_x t$ | $x'= x-V_x t$ 
$y= y'+V_y t$ | $y'= y-V_y t$ 
$z= z'+V_z t$ | $z'= z-V_z t$ 

Las transformaciones de Galileo para cada coordenada se pueden utulizar para obtener la velocidad y la aceleración del sistema dinámico descrito anteriormente. Por ejemplo, consideremos el origen $O'$ que se mueve con velocidad constante $\mathbf{V}_c$ y descrito por el vector $\mathbf{r}'=\mathbf{r} - \mathbf{V}_c \cdot t$. Si quisiéramos obtener la velocidad del sistema:

$$
\mathbf{v}' =\frac{d \mathbf{r}'}{dt} = \frac{d}{dt}(\mathbf{r} - \mathbf{V}_c \cdot t) = \mathbf{v} - \mathbf{V}_c,
$$

Así, tenemos el resultado:

$$
\mathbf{v}' = \mathbf{v} - \mathbf{V}_c.
$$


De forma análoga, alguien podría estar interesado en la aceleración del sistema, por lo que sólo queda derivar temporalmente nuevamente:

$$
\mathbf{a}' = \frac{d \mathbf{v}'}{dt} = \frac{d}{dt}(\mathbf{v} - \mathbf{V}_c) = \mathbf{a},
$$

Por lo tanto:

$$
\mathbf{a}' = \mathbf{a}.
$$

Como se observa de la última ecuación, *todos los sistemas de referencia inerciales miden la misma aceleración*. Un resultado simple, pero poderoso: ¿Cuál es la gran conclusión que podemos obtener desde aquí? Tiene que ver con los privilegios.

Las velocidades son relativas, pero las aceleraciones son absolutas. Entonces cuando apacere una velocidad, también hay que preguntarse: *velocidad: ¿Con respecto a qué sistema de referencia?*. Entonces, de forma cualitiva, el principio de la relatividad de Galileo se expresa de la siguiente manera:

:---: |
Es imposible determinar a base de experimentos (mecánicos (o sea que soltando bolitas o con planos inclinados)) si un sistema de referencia está en reposo o en movimiento uniforme y rectilineo. 

A continuación presento algunos videos que visualizan el concepto de la velocidad relativa.

los cazadores de mitos: Sistema cañon-Camioneta[Link](https://www.youtube.com/watch?v=BLuI118nhzc){:target="_blank"}

Visualización de la inercia en diferentes lanzamientos de pelotas. [link](https://www.youtube.com/watch?v=j1URC2G2qnc){:target="_blank"}, observar que en último caso (cuando la masa *decrece*) no se cumple el comportamiento esperado: ¿Por qué? 

Top secret: escena del tren [LINK](https://youtu.be/A_peCIVBTAY?si=DTFwC3AaSGZxGaCM&t=6Y){:target="_blank"}


#### Los principios de la relatividad

Resumiendo, lo que nos dice Galileo es que hay cantidades que son relativas para diferentes SRI (como la velocidad, por ej) y hay otras cantidades absolutas, como lo es la Aceleración. Además, la teoría Electrodinámica de Maxwell predice ondas electromagnéticas que se propagan a la velocidad de la luz $c$. Pero **¿se propagan a una velocidad $c$ con respecto a qué?**. Ésta es la pregunta fundamental de la relatividad especial. 

Hasta ese momento, las ondas electromagnéticas necesitaban un medio para propagarse, por ende las ondas se propagarían a la velocidad de la luz con respecto al SRI co-movil con ese medio. Era una buena solución y el medio fue llamado el *éter*.

Entonces, dada la lógica Newtoniana de suma de velocidades, un observador que se mueve con una velocidad $v$ con respecto al éter tendrá que medir entonces que la luz se propaga (dependiendo si se acerca o se aleja) a la velocidad:

$$
c' + c \pm v,
$$

si asumimos que el observador se mueve en la misma dirección que una onda Electromagnética, verá que la onda está estática ($c'=0$) ya que se encontraría en reposo con respecto al observador.

El hecho anterior es, en general, incompatible con la teoría electromagnética. El único escenario que las leyes de Maxwell admiten soluciones de campo estáticas es que explícitamente los campos $E$ y $B$ sean constantes con respecto al tiempo, tal que $\frac{\partial}{\partial t}\mathbf{E} = \mathbf{0}$ o $\frac{\partial}{\partial t}\mathbf{B} = \mathbf{0}$. 

Algo debía estar mal, y debían seguir proponiendo qué era.

#### Experimento de Michelson-Morley

Otra pieza de información surgió desde el llamado **experimento de Michelson-Morley**, los cuales usaron "el interferómetro" para medir la velocidad de la luz con respecto al éter. Dicho sea de paso, la invención del interferómetro les valió el premino novel de físíca del año ().

Como la luz es una onda, los posibles efectos de la **interferencia** deberían ser apreciables. Entonces, se hace interferir un haz de luz complétamente caracterizado consigo mismo, haciendo que se divida en un "divisor de haces", viajen haciéndolos rebotar en espejos diferentes, y luego viajen de vuelta hacia una pantalla donde será distinguible el patrón de interferencia. 

Si definimos nuestro SRI en la tierra, podríamos considerar que la tierra se mueve a una velocidad $v$ con respecto al éter. El interferómetro comparte el SRI de la tierra, y en un isntante se emite un haz de luz que recorre el interferómetro y vuelve a la pantalla. Se espera que los caminos de estos haces sean modificados por la suma de velocidades en los diferentes caminos que toma el haz, por ende, exista un patrón de interferencia detectable en la pantalla. 

El resultado fue controversial: con la resolución instrumental del momento se esperaba medir un valor de desfase $\Delta \phi \sim 0.4\pi\sim$, pero tal desfase no se encontró. Se probó el experimento en muchos contextos diferentes y nunca hubo resultado. 


#### Los esfuerzos de FitzGerald

El físico irlandés George FitzGerald (1851-1901) encontró una forma de conciliar la situación, sugiriendo que cualquier objeto que tiene una velocidad $v$ con respecto al éter disminuyen en longuitud en un factor de $\sqrt{1-\frac{v^2}{c^2}}$. Por lo tanto:

$$
\displaystyle L'=L\sqrt{1-\frac{v^2}{c^2}},
$$

Donde $L'$ es la longitud del cuerpo que se mueve, en la dirección del movimiento; y L es la longitud que debería tener en el reposo. En condiciones normales, el valor de esta corrección de longitud es muy pequeño. Por ejemplo, si un cuerpo se desplazara con un 10% de la velocidad de la luz (o sea, 30.000 [km/s]), su longitud se contrae ligeramente:

$$
\begin{align}
\displaystyle L' =& L\sqrt{1-\frac{v^2}{c^2}} \\
	   			 =& L\sqrt{1-\frac{(0.1c)^2}{c^2}}\\
       			 =& L\sqrt{1-0.01}\\
       			 =& L\sqrt{0.99}\\
\end{align}
$$

¿A qué velocidad se contraerá un objeto hasta alcanzar la mitad de la longitud que tiene en reposo? Respuesta: $v=0.866 c$.

¿Qué ocurre con la longitud de un cuerpo que se mueve a una velocidad igual a la luz?

Casi en paralelo, Hendrik Anton Lorentz (1853-1928) trabajó en el problema de forma independiente, reproduciendo las observaciones de FitzGerald y estableció que las leyes de Maxwell son invariantes bajo las siguientes transormaciones:

$$
\begin{align*}
x' &= \gamma (x - vt) \\
t' &= \gamma \left( t - \frac{vx}{c^2} \right)
\end{align*}
$$

donde el factor $\displaystyle \gamma = \frac{1}{\sqrt{1-\frac{v^2}{c^2}}}$ es el llamado **factor de Lorentz**, en cual tiene a 1 cuando la velocidad $v$ es pequeña, en comparación a la velocidad de la luz $c$. Dicho de otra forma, en el límite donde $v/c \to 0$ es:

$$
\lim_{{\frac{v}{c} \to 0}} \gamma = \lim_{{\frac{v}{c} \to 0}} \frac{1}{\sqrt{1}} = 1,
$$

esta es la razón de que los efectos relativistas son indetectables por nuestros sentidos en velocidades "newtonianas" (velocidades $v$ pequeñas en comparación a la velocidad de la luz $c$), por eso las transformadas de Lorentz tiende a las transformaciones de galileo 

#### La relatividad especial

El estado

Vamos a dar un breve salto temporal, y veremos el principio de la relatividad segun Einstein:

:---: |
Las leyes de la física deben tener la misma forma en todos los sistemas de refencias inerciales. |

#### Consecuencias de la relatividad especial


