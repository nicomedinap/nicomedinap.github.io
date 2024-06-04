---
layout: default
title: FisicaDeFronteras
mathjax: true
---
{% include mathjax.html %}

## Apuntes del curso "Física de fronteras" para pedagogía en matemáticas y física, Universidad de Talca.

#### Unidad 2: Elementos de mecánica cuántica.

Conceptos previos 

* <ins>Partícula:</ins> Por excelencia, el uso del método griego de la “abstracción". Es abstraer un cuerpo de masa M en un punto para no tener en cuenta  su forma.
* <ins>Movimiento:</ins> Cambio “continuo” de sucesos (posición) definido con respecto a un sistema de referencia inercial.
* <ins>Campo:</ins> Una teoría de campos (a diferencia de una teoría discreta) posee un número infinito (continuo) de grados de libertad.
* <ins>Grados de libertad:</ins> número mínimo de coordenadas independientes (escalares) necesarias para determinar simultáneamente la posición de cada partícula en un sistema dinámico.
* <ins>Tiempo:</ins> Magnitud física que permite ordenar la secuencia de los sucesos, estableciendo un pasado, un presente y un futuro.
* <ins>Simetrías y cantidades conservadas:</ins> Característica de la geometría y otras definiciones abstractas, que relaciona la invariancia bajo ciertas transformaciones, como, por ejemplo, movimientos.

#### Contenidos a tratar:

1. Brevísimo repaso de la teoría electromagnética.
2. Las teorías clásicas fallan.
3. Física moderna.
4. La matemática de los números cuánticos.
5. La ecuación de Schrödinger y la evolución temporal.

#### Bibliografía unidad 2.

Wikipedia: Iré recolectando los links desde dónde tome información, y la iré dejando espacidos a lo largo de los apuntes.

[<ins> Apuntes de Mecánica cuántica I</ins>](http://llacolen.ciencias.uchile.cl/~vmunoz/cursos/cuantica/qm.pdf){:target="_blank"}


### 1.- Brevísimos comentarios sobre la teoría electromagnética de James Clerk Maxwell

Maxwell pudo demostrar que la luz puede ser descrita como una onda, consagrandose en el mundo científico. Que la radiacion electromagnética sea un aspecto más que puede ser descrito por ondas unifica la teoría óptica con la electromagnética. Es así como la luz puede ser considerada como "paquetes de campo que viajan como ondas por el vacío". La expresión más general de la ecuación de onda viene dada por la expresión:

$$
\nabla^2 \psi - \frac{1}{v^2} \frac{\partial^2 \psi}{\partial t^2} = 0,
$$

donde $\psi$ es el elemento que describe matemáticamente a la onda. La ecuación de onda no modifica la onda, sino que, cuando es aplicada a $\psi$, describe las propiedades de su propagación por el espacio. Entonces, puede ser entendida como un "operador". 

¿Por qué esto es importante? Porque desde el 1900, empieza una nueva ola de física que probarán de todo, hasta que algo funcione y pueda describir la realidad. Esta actitud es necesaria para seguir avanzado.

### 2.- Las teorías clásicas fallan.

A fines del siglo XIX se hizo cada vez más evidente que la física desarrollada hasta entonces era completamente incapaz de dar cuenta de varios hechos experimentales. El estudio de estos problemas llevó a un conjunto de principios y descripciones, a veces bastante forzados, conocidos hoy en día con el nombre de Física moderna, o Mecánica Cuántica antigua.

Por ejemplo, desde la termodinámica se aceptaba la idea de los estados energéticos de un sistema que un oscilador podían ser descritos (o aproximados) por la "distribución de Boltzmann". Pero esta idea chocó con una pared cuando trataron de medirse la energía interna de los $gases$ $diatomicos$, como también cuando trataron de estimar la densidad de energía dentro de una caja considerada como un $cuerpo$ $negro$. 

Sin ser nada riguroso, un cuerpo negro es cualquier entidad física que posea una temperatura (una propiedad macroscópica), y esta temperatura se relaciona con las propiedades radiativas de este cuerpo. Ejemplos clásicos de cuerpo negro son las estrellas, como también el fondo cósmico de micro ondas.

Nadie sabía como abordar el problema, porque cuando se seguían las reglas clásicas de la físíca, ocurría la llamda "Catástrofe ultravioleta", es decir, la densidad de energía espectral dentro de esta caja especial tendía a infinito, mientras que el resultado experimental era finito. Algo olía mal. 

#### La energía es un múltiplo entero de algo

Para abordar el problema del cuerpo negro, Max Planck propuso que cada oscilador puede emitir o absorber energía en cantididade que son múltiplos enteros de cierta cantidad básica de energia $\hbar \omega$ tal que:

$$
E=n\hbar \omega, n=1,2,3,...,
$$

donde $n$ es el número de cuantos, o $quanta$, desde donde proviene el nómbre de la teoría cuántica. La energía de cada uno de los cuantos $n$ esta determinada por la frecuencia:

$$
\hbar \omega = \frac{h \omega}{2\pi} = hf ,
$$

donde $h$ es la constante de proporcionalidad de Planck y $\hbar=h/2\pi$ es la constante de Panck reducida. Así, Max Planck desarrolla la "Ley de Planck". 

<!---
Una de las consecuencias más importantes de la ley de Planck es la deducción de la ley de Stefan-boltzmann. Indica que el valor de la energía total radiada por unidad de superficie y unidad de tiempo en todas las longitudes de onda, es proporcional a la cuarta potencia de la temperatura.
A la energía total radiada por unidad de superficie de un cuerpo negro en una unidad de tiempo, en todas las longitudes de onda se la conoce como potencia emisiva, y viene dada por:

$$
R=\sigma T^4,
$$

donde R es la potencia/area. 
-->

Cuando fueron anunciados sus resultados en 1900, Planck no sintió mucha aprobación del mundo científico; es más, él mismo creía que había encontrado una solución ad-hoc para el problema físico de la catástrofe ultravioleta. Pero el hecho de considerar que, en realidad, la energía no es continua sino $cuantizada$, resolvería muchos problemas observacionales en un futuro cercano. 

#### Efecto fotoeléctrico

Cinco años después, Albert Einstein se enfrentaría al problema de la detección de electrones al iluminar una placa metálica. Este efecto fue denominado "efecto fotoeléctrico". Este hecho por sí solo es fácil de explicar pensado en la propuesta de la energía cuantizada de Planck: la luz que incide sobre la placa transporta una cierta energía que la traspasa a los electrones. Algunos electrones adquieren suficiente energía como para sobrepasar la barrera de potencial que los mantiene dentro del metal. 

Entonces, si consideramos que la luz, o una onda electromagnética que tiene frecuencia $\omega$ y una energía cuantizada $n\hbar \omega$, podremos decir que esta energía está compuesta de $n$ particulas llamadas $fotones$, cada uno con energía $\hbar \omega$. Por lo tanto, si estos fotones interactuan (digamos, elásticamente) con los electrones del metal, la energía del electrón despedido será:

$$
E_e = \hbar \omega - \phi,
$$

donde $\phi$ es la "función de trabajo del metal", o la energía que es necesaria para quitar este electrón del metal. 

Principalmente, hay dos cosas que las teorías clásicas no podían explicar: 1) la energía de los electrones emitidos no dependía de la intensidad de la luz incidente; al disminuir la intensidad de la luz, sólo disminuye el número de electrones. La energía de los electrones emitidos sólo depende de la frecuencia de la luz y del metal considerado. 2) Al iluminar una placa metálica con luz y medir el tiempo transcurrido entre la detección de dos electrones emitidos por el metal se encuentra que éstos siguen una distribución de Poisson, indicando que el efecto fotoeléctrico proceso que ocurre completamente al azar (o sea intrínsecamente irreproducible o estocástico). 

¿Cómo la cuantización de la energía de Planck-Einstein resuelve esto?

#### Efecto Compton

La dispersión de Compton ocurre al hacer coincidir radiación de rayos X (altamente energetica, por ende, de longitud de onda corta) en átomos. Los átomos dispersan esta radiación en una pequeña (pero medible) fracción. Este hecho fue explicado exitosamente al considerar las nuevas ideas de la cuantización de la energía, y agregando un poquito de relatividad, por qué no. 

Siguiendo la relatividad especial, un electrón en reposo tiene "energía en reposo" de la forma: $E = m_e c^2$, pero además, los fotones tienen energía $E = p_{foton}c $, ya que:

$$
E = c\sqrt{p^2 + m^2 c^2},
$$

lo que es deducible si consideramos que los fotones no tienen masa. Si además consideramos la energía de Planck $E=\hbar \omega$. Así, cuando un fotón energético interacciona (choca) con un electrón unido a este átomo, se produce un choque elástico y se intercambian energía, produciendo y explicando la dispersión de Compton.

#### Principio de correspondencia

Con todas las nuevas ideas que daban vueltas, era dificl que todos los físicos estuvieran felices, ya que era dificl asumir el hecho que, esta realidad atómica debiera ser descrita por menos grados de libertad. Por ende, se propuso que cualquier efecto cuántico debe tener su contraparte clásica, pero cuando la escala de la realidad es ajustada. Me explico: Si en un problema cuántico se realiza el límite donde $h\rightarrow 0$ (o sea, que los estados cuantizados no son relevantes, o que la mecánica cuántica se vuelve continua), debemos tener un efecto clásico. 

Planteado de otra forma: Si el número cuántico tiende a infinito (un estado de alta energía, más parecido a la mecánica Newtoniana), el resultado cuántico debe coincidir con el resultado clásico. Esta idea llevo a la concepción de numerosos modelos atómicos, pero uno en particular fue muy exitoso.

### 3.- Física moderna.

#### Atomo de Hidrógeno 

Ya desde mediadios del 1800 se sabían varias cosas de la radiación de los elementos. Entre ellos ya era conocido el espectro de emisión del hidrógeno. Si la radiación emanada por un átomo de hidrógeno era transmitida por un espectroscópio, se veían líneas bien definidas: Estábamos en presencia del espectro del hidrógeno. Por ende, un modelo cuántico exitoso debería ser capaz de reproducir las líneas de emisión del hidrógeno. En 1888 Johanes Rydberg formuló una expresión ad-hoc para poder describir estas líneas y predecir otras más, en la llamada [Fórmula de Rydberg](https://es.wikipedia.org/wiki/Fórmula_de_Rydberg#:~:text=Rydberg%20reescribió%20esto%20en%20términos,es%20conocida%20como%20defecto%20cuántico.){:target="_blank"}:

$$
{\displaystyle {\frac {1}{\lambda_{vac}}}=R_{\mathrm {H} }\left({\frac {1}{n_{1}^{2}}}-{\frac {1}{n_{2}^{2}}}\right)},
$$

donde $\lambda_{vac}$ es la longitud de onda de la luz emitida en el vacío,
$R_H$ es la constante de Rydberg para el hidrógeno, y $n_1, n_2$ son enteros tal que $n_1 < n_2$. Esta expresión proviene de una aproximación geométrica de la distribución espacial de las líneas de hidrógeno. Habría que esperar hasta 1913 para poder fundamentar está expresión.

En 1913, y luego de varios intentos por desvelar los secretos del átomo, Niels Bohr propuso su modelo atómico, incluyendo las ideas de la energía cuantizada, el cual se basa en tres postulados: 

1.) Los electrones describen órbitas circulares en torno al núcleo del átomo sin irradiar energía. \\

2.) Las únicas órbitas permitidas para un electrón son aquellas para las cuales el [momento angular](https://es.wikipedia.org/wiki/Momento_angular){:target="_blank"} $L$ del electrón está cuantizado, es decir, es un múltiplo entero de $\hbar$ de la forma:

$$
L_n = n\hbar,
$$

como en un movimiento circular (como el de las órbitas), $L$ es una constante de movimiento y puede ser descrito por las cantidades geométricas que describen el movimiento, de la forma $L = m_e v r$, donde m_e  es la masa del electrón, $v$ es la velocidad y $r$ es el radio de la órbita. Por lo tanto:

$$
L_n = n\hbar = m_e v r \Rightarrow r_n=\frac{n\hbar}{m_e v r},
$$

por lo tanto, el radio $r$ de las órbitas del electrón está $cuántizado$, es decir, son proporcionales a un número entero $n$. Por ende, si consideramos la energía de este electrón, y en ella se utiliza la expresión del radio cuantizado $r_n$, llegaremos a la expresión de la energía cuantizada del electrón en el átomo de hidrógeno:

$$
\Rightarrow E_n = -\frac{E_0}{n^2},\ \  n=1,2,3,...,
$$

donde $E_0$ es la energía de $ligado$ o de $ionización$, equivalente a 13.6 [eV]. (¿de qué depende de que esta energía sea de ligado o de ionización?)

¿Cuánto vale la energía del electrón en el $estado$ $fundamental$? (estado de menor energía). Para averiguarlo, tendremos que asumir que $n=1$, así: 

$$
E_1 = -E_0 = -13.6 [eV].
$$

3.) El electrón solo emite o absorbe energía en los saltos de una órbita permitida a otra. Dicho cambio emite o absorbe un fotón cuya energía es la diferencia de energía $\Delta E$ entre ambos niveles de la forma:

$$
\Delta E = E_n  - E_{n-1}=\hbar \omega,
$$

Es decir, $\Delta E$ es la diferencia de energía entre las dos órbitas entre las cuales el electrón hace su transición. El mecanismo físico para que un electrón gane o pierda energía es a través de la emisión o absorción de un fotón con energía $\hbar \omega$. 

En otras palabas, al cambiar un electrón de la órbita con número cuántico (inicial) $m$ a otro número cuántico (final) $n$, la energía del fotón asociado a la radiación electromagnética será:

$$
\hbar \omega = \Delta E = E_{final} - E_{inicial} = E_n - E_m
$$

$$
\Rightarrow \hbar \omega = \Delta E = \frac{-13.6[eV]}{n^2}- \frac{-13.6[eV]}{m^2} = 13.6 [eV] \left( \frac{1}{m^2} - \frac{1}{n^2} \right)
$$

Es necesario interpretar los resultados anteriores de la siguiente forma:

1. Cuando un electrón pasa de un estado $más$ $energético$ (más alejado del núcleo) a un $menos$ $energético$, el electrón debe $perder$ $energía$, y en este proceso de emite un fotón con energía $\hbar \omega$ 

2. Para que un electrón pase de un estado $menos$ $energético$ (más cerca del núcleo) a un $más$ $energético$ (más lejano), un fotón debe interactuar con el electrón y absorver la energía $\hbar \omega$ de éste. 


#### La Hipótesis de de Broglie

en 1924 Louis de Broglie aventura la hipótesis de que una partícula cualquiera con masa (como un electrón, un protón, una pelota de tenis, materia en general) se comporta también como una onda. ¿De donde viene esta hipótesis?

Bueno, de Broglie consideró la energía cuantizada de la luz (fotón) $E_{foton} = \hbar \omega$, como también el momentum de un fotón (que proviene de la relatividad especial) $E_{foton} = pc$, por lo tanto al igualar estas cantidades:

$$
\hbar \omega = pc. 
$$

Siguiendo este tren de pensamiento, y consideando las propiedades de las ondas (el número de onda $k=\frac{\omega}{c}$, la frecuencia $f=\frac{\omega}{2\pi}$, la longitud de onda $\lambda=\frac{c}{f}$ y la constante de Planck reducida $\hbar = \frac{h}{2\pi}$) tenemos que:

$$
p = \frac{\hbar \omega}{c} = \hbar k = \frac{hf}{c} = \frac{h}{\lambda},
$$

es decir

$$
\Rightarrow \lambda = \frac{h}{p}
$$

### Tarea 3: 

1.) Si el momento angular de la tierra a través del sol fuera cuantizado: ¿Cuál sería el numero cuántico n de la órbita de la tierra?

Solución: 
En el modelo de Bohr, el momento angular $L$ de un electrón en una órbita es un múltiplo entero de la constante de Planck reducida$\hbar$, tal que 

$$
L = n\hbar,
$$

donde $n$ es el numero cuántico. Como en un movimiento circular como el que describe la órbita de la tierra alrededor del sol, el momento angular es una constante de movimiento descrita por:

$$
L = m_{T} v_{T} r_{T},
$$

donde $m_{T} = 5.98\times10^{24}$[kg] es la masa de la tierra, $r_{T} = 1.5\times10^{11}$[m] es la distancia tierra-sol y $v_{T}$ es la velocidad en la que la tierra da una órbita y vuelve al mismo punto, es decir:

$$
v = \frac{2\pi r_{T}}{1 año} = \frac{2\pi r_{T}}{3.16\times10^{7}\mbox{[s]}} = 29825.24\ [m/s] = 2.98 \times 10^{4}\ [m/s].
$$

Por lo tanto, como $L = m_{T} v_{T} r_{T}$ y $L= n\hbar$, tenemos que

$$
n\hbar = m_{T} v_{T} r_{T} \Rightarrow n=\frac{m_{T} v_{T} r_{T}}{\hbar} = 2.54\times 10^{74}
$$

¿Qué significado podría tener este número cuántico?


2.) Calcular la longitud de onda de de Broglie para un electrón con 4.5 KeV de energía cinética.

La expresión de de Broglie es $\lambda =\frac{h}{p}$. Como sólo consideramos la energía cinética, se tiene que:

$$
E_{c} =\frac{1}{2} m_e v^2 = \frac{p^2}{2m_e},
$$

donde $m_e$ es la masa del electrón ()
por lo tanto $\displaystyle p = \sqrt{2m_e E_{c}}$. Así:

$$
\lambda = \frac{h}{\sqrt{2m_e E_{c}}} = \frac{6.625\times10^{-34}\ [J\cdot s]}{\sqrt{2\cdot 9.1\times10^{-31}\ [kg] * 4500\ [eV] }}
$$

considerando que $1eV=1.602\times10^{−19}\ [J]$

$$
\lambda = 5.778\times 10^{−12}\ [m]
$$

### Tarea 4: 

Consideremos una nube de hidrogeno, es decir, muchos átomos de hidrógeno que podrían interactuar de diferentes formas entre ellos. Uno de esos átomos posee un electrón en una orbita caracterizada por n=4, cuando de forma espontánea transiciona hacia un estado n=2:

1. Calcule la diferencia de energía $\Delta E= E_{final}-E_{inicial}$ del electrón cuando salta de una órbita n = 4 a n = 2. ¿El electrón pierde o gana energía? Recuerde que la energía cuantizada en el radio de Bohr es $\displaystyle E_n = - \frac{13.6 \, \text{[eV]}}{n^2}$
2. Calcule la longitud de onda de la radiación electromagnética (fotón) emitida. Recuerde que para una onda: $v=\lambda f$, y particularmente para la luz: $c=\lambda f$
3. Ese mismo fotón emitido anteriormente, viaja hasta interactuar con otro electrón de un átomo de hidrógeno en el estado fundamental (n=1), el fotón es absorbido por el electrón y transiciona hacia otra órbita $\ell$. Determine cuál es esta órbita $l$. ¿Cuáles son las implicancias de tener que considerar a $l$ como un número entero?

Vamos a desarrollar el tercer enunciado. 

El estado fundamental de un átomo es el estado de menor energía, por lo que el electrón está en $n=1$, entonces su energía es:

$$
E_1 = \frac{E_0}{n^2} = -13.6\ [eV].
$$

Queremos encontrar el nivel $\ell$ tal que la energía absorbida por el electrón coincida con la energía del fotón:

$$
\Delta E = E_{\ell} - E_1
$$

Sabemos que, (del apartado anterior) que el la energía del fotón emitido (que es igual a la energía perdida por el electrón) es de $\Delta E = 2.55 \ [eV]$, así:

$$
2.55 \ [eV] = - \frac{13.6 \ [eV]}{\ell^2} - (-13.6 \, \text{eV})
$$

$$\frac{2.55}{13.6} = 1 - \frac{1}{\ell^2}$$

$$0.1875 = 1 - \frac{1}{\ell^2} $$

$$
\frac{1}{\ell^2} = 1 - 0.1875 \Rightarrow  \frac{1}{\ell^2} = 0.8125.
$$

Así,

$$
\ell^2 = \frac{1}{0.8125} \approx 1.23 \Rightarrow \ell \approx \sqrt{1.23} \approx 1.11
$$

Dado que $\ell$ debe ser un número entero y los niveles de energía en el átomo de hidrógeno corresponden a números enteros, el nivel más cercano es $\ell = 2$. ¿Cómo podría interpretarse este caso? ¿Qué sucede si en realidad aproximamos $\ell=1$?  ¿Se absorbió el fotón en realidad, o no ha ocurrido nada?

#### La ecuación de Schrödinger

Entonce, si consideramos las nuevas propiedades ondulatorias de la materia, y las combinamos con algunas de las expresiones clásicas, podremos obtener las primeras expresiones de la mecánica cuántica moderna. Por ejemplo, si consideramos la longitud de onda clásica $\displaystyle \lambda = \frac{2\pi}{k}$ con la longitud de onda de de Broglie $\displaystyle \lambda = \frac{h}{p}$, tenemos :

$$
p = \hbar k,
$$

que es conocida como la relación de Compton. Además, si consideramos la energía cinética clásica $\displaystyle E = \frac{1}{2} mv^2 = \frac{p^2}{2m}$, y la energía asociada a un fotón $E=\hbar \omega$ (e incluyendo la relación de Compton), tenemos que:

$$
k^2 = \frac{2m}{\hbar} \omega,
$$

La que es una relación de propagación de ondas dispersivas. ¿Cuál es el punto de esto? Si suponemos que la materia es descrita por una onda, podemos usar una [onda plana](https://es.wikipedia.org/wiki/Onda_plana){:target="_blank"} unidimensional de la forma:

$$
\psi(x,t) = A \cdot e^{i(kx-\omega t)},
$$

donde $i$ es la unidad imaginaria y $A$ una constante ligada a la amplitud de la onda. Como sabemos que la ecuación de onda es de la forma:

$$
\nabla^2 \psi - \frac{1}{v^2} \frac{\partial^2 \psi}{\partial t^2} = 0,
$$

en el caso unidimiensional (digamos, en el eje $x$) la ecuación de la onda se reduce a:

$$
\frac{\partial^2 \psi}{\partial x^2} - \frac{1}{v^2} \frac{\partial^2 \psi}{\partial t^2} = 0,
$$

Luego de introducir la onda de materia $\psi$ dentro de la ecuación de onda, y considerando las expresiones combinadas clásicas-modernas (y luego de un poco de álgebra) podemos obtener la llamada $ecuación$ $de$ $Schrödinger$ unidimensional, de la forma:

$$
-\frac{\hbar^2}{2m} \frac{\partial^2 \psi}{\partial x^2} = i \hbar \frac{\partial \psi}{\partial t}.
$$ 
 
¿Qué representa la ecuación de Schrödinger? Representa la evolución temporal de una "onda de materia", como un electrón. De forma bastante informal, la eq. de Schrödinger es la ecuación de onda de la materia.

Esta ecuación desempeña un papel en la mecánica cuántica análogo al de la segunda ley de Newton en la mecánica clásica.

### 4.- Las matemáticas de los números cuánticos.

#### La ecuación de Schrödinger y La evolución temporal del átomo de hidrógeno.

$(CALCULOS DEMOSTRATIVOS)$

La ecuación de Schrödinger tridimensional en coordenadas esféricas se utiliza comúnmente para describir sistemas físicos con simetría esférica, como átomos o partículas en potenciales esféricamente simétricos. 

La forma general de la eq. de Schrödinger es de la forma: 

$$
i \hbar \frac{\partial \psi}{\partial t} = -\frac{\hbar^2}{2m} \nabla^2 \psi + V \psi
$$

Para poder describir el átomo de hidrógeno, haremos uso de su simetría esférica. La forma general de la ecuación de Schrödinger en coordenadas esféricas se obtiene al considerar los siguientes pasos: 

El Laplaciano en Esféricas:

$$
\nabla^2 = \frac{1}{r^2} \frac{\partial}{\partial r} \left( r^2 \frac{\partial}{\partial r} \right) + \frac{1}{r^2 \sin(\theta)} \frac{\partial}{\partial \theta} \left( \sin(\theta) \frac{\partial}{\partial \theta} \right) + \frac{1}{r^2 \sin^2(\theta)} \frac{\partial^2}{\partial \phi^2}
$$

Schrodinger en esfericas, dependiente del tiempo 

$$
-\frac{\hbar^2}{2\mu} \left( \frac{1}{r^2} \frac{\partial}{\partial r} \left( r^2 \frac{\partial \psi}{\partial r} \right) + \frac{1}{r^2 \sin \theta} \frac{\partial}{\partial \theta} \left( \sin \theta \frac{\partial \psi}{\partial \theta} \right) + \frac{1}{r^2 \sin^2 \theta} \frac{\partial^2 \psi}{\partial \phi^2} \right) + V(r) \psi = i \hbar \frac{\partial \psi}{\partial t}
$$

Asumiendo soluciones del tipo: $\psi(x,y,z,t)=\varphi(x,y,z) {\rm e}^{\frac{-i Et}{\hbar}}$ (separando variables)

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

Luego de dolorosas 3 horas resolviendo y ordenando, tenemos las soluciones son de la forma:

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

$$
P_l^m(x) = (-1)^m (1 - x^2)^{m/2} \frac{d^m}{dx^m} P_l(x)
$$

y donde 

$$
P_l(x) = \frac{1}{2^l l!} \frac{d^l}{dx^l} (x^2 - 1)^l
$$

Veamo que, dentro de las soluciones de estas ecuaciones diferenciales, aparecen los números cuánticos $l$ y $m$.

Los números cuánticos asociados son:

1. $n$: número cuántico principal, que surge de la solución radial.
2. $\ell$: número cuántico del momento angular orbital, que surge de la solución angular. $\ell = 0,1,2,...,n-1$
3. $m_{\ell}$: número cuántico magnético, que especifica la orientación del momento angular en el espacio. $m_{\ell} = -\ell,-\ell -1,...,0,...,\ell-1,\ell$. En total podemos contar $(2\ell +1)$ posibles valores. 





