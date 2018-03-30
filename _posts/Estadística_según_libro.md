
---
layout: post
mathjax: true
comments: true
title:  "Estadistica"
---
{% include mathjax.html %}

<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h1 id="Astroestad&#237;stica-seg&#250;n-&quot;Practical-statistics-for-astronomers&quot;">Astroestad&#237;stica seg&#250;n "Practical statistics for astronomers"<a class="anchor-link" href="#Astroestad&#237;stica-seg&#250;n-&quot;Practical-statistics-for-astronomers&quot;">&#182;</a></h1>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Cap&#237;tulo-1:-Decisi&#243;n">Cap&#237;tulo 1: Decisi&#243;n<a class="anchor-link" href="#Cap&#237;tulo-1:-Decisi&#243;n">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>La ciencia se trata sobre decisión. Construir instrumentos, recolectar datos, crear formas de reducir los datos, originar catálogos y clasificar cosas son aspectos necesarios para realizar ciencia, pero ésta no es sintetizada a menos que entendamos algo: sólo las decisiones cuentan.</p>
<p>Debemos decidir a través de la comparación de diferentes aspectos de uno o un grupo de objetos; y estas caracteristicas son cuantificadas usando procedimientos matemáticos. Imágenes o espectros astronómicos no se presentan a nosotros con toda su información, ésta debe ser analizada para medir la morfología de una galaxia, o la dinámica de un sistema estelar. Se puede caracterizar de buena forma toda esta información usando un estadístico, el cual pueda ayudar a tomar la desición necesaria.</p>
<p>Para que la influencia del estadístico sea tomado en cuenta, es necesario tener una idea de su incerteza o error asociado, el cual describa la credibilidad del parámetro.</p>
<p>Un estadístico es una cantidad que condensa información, y es la reducción última de los datos. Es una propiedad de los datos y sólo eso. Debemos aprender cómo analizar los datos a través de diferentes estadísticos para encontrar el <em>mejor</em> estadístico que describa una cierta característica que podría ser fundamental a la hora de tomar desiciones.</p>
<p>Los astrónomos deben recurrir a un sistema de recolección distinto a un prodecimiento experimental, acá no se puede repetir el experimento, y un mismo fenónemo físico no necesariamente se reproduce bajo las mismas condiciones iniciales. Entonces es necesario generar una metodología rigurosa con el fin de evitar grandes errores de inferencia en los cuales se cae comunmente por la incapacidad de repetir el experimento. Debemos evitar en caer en <em>utilizar los datos sobre los cuales se propuso una hipótesis para verificar dicha hipótesis</em></p>
<p>La escencia del análisis estadístico clásico de un fenómeno es:</p>
<ol>
<li>Formular la hipótesis.</li>
<li>Recolectar datos experimentales para contrastar con la hipótesis (hypothesis-test).</li>
<li>La construcción de un test estadístico.</li>
</ol>
<p>Pero para tomar una elección en base a un test estadístico se debe conocer de antemano la distribución de la muestra y/o la espectación del estadístico, sino: ¿Cómo podemos saber si un valor es <em>normal</em> o atípico? Nuestro nulo control de los experimentos nos llevan muchas veces a una erronea caracterizaciones de la distribución fundamental.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Cap&#237;tulo-2:-Probabilidad">Cap&#237;tulo 2: Probabilidad<a class="anchor-link" href="#Cap&#237;tulo-2:-Probabilidad">&#182;</a></h2>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Entonces, como ya hemos adelantado, los conceptos de probabilidad son importantes en astronomía por dos razones:</p>
<ol>
<li>Las mediciones astronómicas son propensas a ser afectadas por errores de medicion aleatorios, probablemente más que en otras ciencias por la ya descrita incapacidad por repetir los experimentos. Estos errores deben ser descritos lo más precisos posibles para que sean útiles, para ver si son sistemáticos o no.</li>
<li>Además, tampoco tenemos la habilidad de ejecutar ningún experimento, por lo que nuestros resultados deben ser contrastados con pequeñas muestras de control, lo que nos puede llevar a un <em>error de muestreo</em>. </li>
</ol>
<p>Entonces, para esto, se definirá qué es la probabilidad.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="2.1-Qu&#233;-es-probabilidad?">2.1 Qu&#233; es probabilidad?<a class="anchor-link" href="#2.1-Qu&#233;-es-probabilidad?">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>El estudio de la probabilidad parte con el análisis de los juegos de azar relacionados a las cartas y dados. Para estos casos parece obvio recurrir a la probabilidad clasica, dada por la razón:</p>
<p>$$ \frac{\mbox{número de eventos favorables}}{\mbox{número total de realizaciones}}$$.</p>
<p>Si podemos identificar eventos igualmente probables, es posible calcular la probabilidad simplemente enumerando los casos. Sin embargo, identificar estos problemas no es usual.</p>
<p>Es común definir probabilidades con relaciones empíricas usando la frecuencia de los resultados. Esta forma de definir la probabilidad es usualmente llamada 'Frecuentista', muchas veces es el único camino, pero con bastantes riesgos.</p>
<p>En el esfuerzo de formalizar la descripción y medición de eventos, usando los argumentos de Cox(1946) se puede llegar a los mismos axiomas de Kolmogorov, los cuales dicen que si $A$, $B$ y $C$ son tres eventos, entonces:</p>
<ul>
<li>Cualquier evento random $A$ tiene una probabilidad $\mbox{prob(A)}$ entre cero y uno.</li>
<li>Un evento seguro cumple que $\mbox{prob(A)=1}$.</li>
<li>Si $A$ y $B$ son eventos exclusivos, entonces se cumple que $\mbox{prob(A o B)=prob(A)+prob(B)}$.</li>
</ul>
<p>Estos axiomas son suficientes para el desarrollo de la teoría matemática de la probabilidad y cómo manipularla.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="2.2-Condicionalidad-e-independencia">2.2 Condicionalidad e independencia<a class="anchor-link" href="#2.2-Condicionalidad-e-independencia">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Dos eventos $A$ y $B$ son independientes si se cumple que:</p>
<p>$$ \mbox{prob($A$ y $B$)} = \mbox{prob($A$)*prob($B$)}. $$</p>
<p>Cuando la independencia no se cumple, se habla de <em>probabilidad condicional</em>, donde la probabilidad $A$ dado la probabilidad $B$ se define como:</p>
<p>$$\displaystyle{ \mbox{prob(A | B)} = \frac{\mbox{prob(A y B)}}{\mbox{prob(B)}}},$$</p>
<p>Entonces, si $A$ y $B$ son independientes, $B$ no debería influir en la probabilidad de $A$, por lo tanto $\mbox{prob(A | B) = prob(A)}$, con lo que obtenemos la primera relación. Si $A$ depende de un número finito $B_i$ (con $i&gt;1$) eventos diferentes, se tiene que:</p>
<p>$$\mbox{ prob($A$)}=\sum_{i} \mbox{prob($A$ | $B_i$)prob($B_i$)}$$.</p>
<p>Todos estos parámetros $B_i$ pueden ser de distintas fuentes, como instrumentales u ambientales.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="2.3-Teorema-de-Bayes">2.3 Teorema de Bayes<a class="anchor-link" href="#2.3-Teorema-de-Bayes">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>El teorema de Bayes se deriva igualando la cantidad $\mbox{prob(A y B)}$ con $\mbox{prob(B y A)}$:</p>
<p>$$\mbox{prob(B | A)} = \frac{\mbox{prob(A | B) prob(B)}}{\mbox{prob(A)}},$$</p>
<p>donde $\mbox{prob(B)}$ es la <em>probabilidad a priori</em> la cual será modificado para cada experiencia. Esto es expresado usando la verosimilitud (<em>likelihood</em>) $\mbox{prob(A | B)}.$ Finalmente $\mbox{prob(B | A)}$ es la <em>probabilidad a posteriori</em>, la cual se obtiene después que los datos se han analizado.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="2.4-Distribuci&#243;n-de-probabilidad">2.4 Distribuci&#243;n de probabilidad<a class="anchor-link" href="#2.4-Distribuci&#243;n-de-probabilidad">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h4 id="2.4.1-Concepto">2.4.1 Concepto<a class="anchor-link" href="#2.4.1-Concepto">&#182;</a></h4><p>Sea $x$ una variable aleatoria continua, la función $f(x)$ será su <em>función de densidad de probabilidad</em> (PDF por sus siglas en inglés) si cumple que:</p>
<ol>
<li>$\mbox{prob(a&lt;x&lt;b)} = \displaystyle{\int_{a}^{b} f(x) dx}.$</li>
<li>$\displaystyle{\int_{-\infty}^{+\infty} f(x) dx} = 1.$</li>
<li>$f(x)$ es una función no-negativa cada cada $x \in \rm I\!R.$</li>
<li>Su <em>función de distribución cumulativa</em> es $F(X)=\displaystyle{\int_{-\infty}^{x} f(y)dy}.$</li>
</ol>
<p>2.4.2 Algunas distribuciones comunes</p>
<p>Algunas herramientas para caracterizar las PDFs (es decir, donde está su centro, cuál es su disperión, entre otros) son los momentos de las distribuciones. Los dos primeros son especialmente especiales:</p>
<p>$$\mbox{Media:=}\ \ \mu_{1} = \mu = \displaystyle{\int_{-\infty}^{+\infty} x\ f(x)dx}$$</p>
<p>$$\mbox{Varianza:=}\ \ \mu_{2} = \sigma^{2} = \displaystyle{\int_{-\infty}^{+\infty} (x-\mu_{1})^{2}\ f(x)dx}$$</p>
<hr>
<h4 id="2.4.2.1-Distribuci&#243;n-binomial">2.4.2.1 Distribuci&#243;n binomial<a class="anchor-link" href="#2.4.2.1-Distribuci&#243;n-binomial">&#182;</a></h4><p>Es una distrución que se caracteriza por ser dicotómica, teniendo sólo 2 posibles resultados: <em>fracaso</em> o <em>éxito</em>. Esta distribución nos da la probabilidad de un evento con $n$ éxitos dentro de $N$ repeticiones, donde la probabilidad de éxito $p$ de cada evento siempre es la misma. Mientras la probabilidad de fracaso es $q=1-p$ La probabilidad es entonces:</p>
<p>$$\mbox{prob($n$)} = \binom{N}{n}\ p^{n}\ (1-p)^{N-n}, $$</p>
<p>donde el coeficiente de combinatoria nos da el número de diferentes maneras de elegir $n$ items de $N$:</p>
<p>$$\binom{N}{n} = \displaystyle \frac{N!}{n!\ (N-n)!}. $$</p>
<p>Con esta probabilidad, y dado que es una distribución discreta, se tiene que el momento 1 (o la media) está dada por:</p>
<p>$$\displaystyle \mu = \sum_{n}^{N} n\ \mbox{prob($n$)}=Np.$$</p>
<hr>
<h5 id="Casos-especiales:">Casos especiales:<a class="anchor-link" href="#Casos-especiales:">&#182;</a></h5><h5 id="Condiciones-para-obtener-la-distribuci&#243;n-de-poisson:">Condiciones para obtener la distribuci&#243;n de poisson:<a class="anchor-link" href="#Condiciones-para-obtener-la-distribuci&#243;n-de-poisson:">&#182;</a></h5><p>Si definimos $p=\displaystyle \mu/N$, tenemos que:</p>
<p>$$\mbox{prob($n$)} =\displaystyle \frac{N!}{n!\ (N-n)!} \ \left( \frac{\mu}{N}\right)^{n}\ \left(1-\frac{\mu}{N}\right)^{N-n}. $$</p>
<p>En el límite cuando tenemos eventos con una probabilidad muy baja de ocurrencia ($p\rightarrow 0$, pero $Np\rightarrow$ valor finito), y existe un número de realizaciones muy grande (donde $N\rightarrow \infty$), se puede demostrar que podemos llegar a la distribución de <em>poisson</em>, entonces:</p>
<p>$$\displaystyle \lim_{N \to \infty} \mbox{prob($n$)} = \frac{\mu^{n}}{n!}\ e^{-\mu}.$$</p>
<hr>
<h5 id="Condiciones-para-obtener-la-distribuci&#243;n-normal:">Condiciones para obtener la distribuci&#243;n normal:<a class="anchor-link" href="#Condiciones-para-obtener-la-distribuci&#243;n-normal:">&#182;</a></h5><p>Por otro lado, cuando se considera un gran número de éxitos ($n$&gt;&gt;1), se tiene que $\mu \sim n$ (ya que $p\rightarrow 1$), entonces la cantidad de casos favorables $n$ es muy parecida a N, la distribución Binomial tiende a ser la distribución Normal.</p>
<hr>
<h4 id="2.4.2.2-Distribuci&#243;n-de-Poisson">2.4.2.2 Distribuci&#243;n de Poisson<a class="anchor-link" href="#2.4.2.2-Distribuci&#243;n-de-Poisson">&#182;</a></h4><p>Esta distribución se da en eventos con ocurrencia de éxito muy baja y un gran número de intentos. Así:</p>
<p>$$ \mbox{prob($n$)} = \frac{\mu^{n}}{n!}\ e^{-\mu}, $$</p>
<p>donde los primeros momentos son $\mu_1 = \mu_2 = \mu$. Un ejemplo clásico de está distribución aplicada en astronomía, es el número de fotonos que llegan en una integración. La probabilidad de un fotón de ser detectado en un intervalo fijo de tiempo es (usualmente) bajo. La llegada de cada fotón es independiete uno de otro, ya que obedecen la estadística de Bose-Einstein; con esto se cumplen las condiciones necesarias para la distribución de Poisson. Entonces, si la integración de fotones lo largo del tiempo $t$ llegan en una tasa $\lambda$, tendrá una media $\rm \mu = \lambda t$, con una desviación estandar $\sigma=\sqrt{\mu}=\sqrt{\lambda t}$.</p>
<hr>
<h4 id="2.4.2.3-Distribuci&#243;n-Gaussiana-(o-normal)">2.4.2.3 Distribuci&#243;n Gaussiana (o normal)<a class="anchor-link" href="#2.4.2.3-Distribuci&#243;n-Gaussiana-(o-normal)">&#182;</a></h4><p>La distribución normal de una variable está dada por la siguiente expresión:</p>
<p>$$\displaystyle \mbox{prob($x$)} := \mathcal{N} = \frac{1}{\sigma \sqrt{2\pi}} \left[-\frac{(x-\mu)^{2}}{2\sigma^{2}}\right]. $$</p>
<p>La verdadera importancia de esta distribución está en la cantidad de fenómenos naturales que pueden ser descritos con ella. Además, un importante teorema asociado a esta distribución es el teorema del límite central, donde para una distribución $M_n$ de $n$ muestras con una media $\mu$, varianza $\sigma^2$, entonces cuando $n\rightarrow \infty$ se tiene que:</p>
<p>$$ \displaystyle \left[ \frac{(M_n-\mu)}{\sigma / \sqrt{n}}  \right] \rightarrow \mathcal{N}.$$</p>
<p>Así, mientrás más observaciones hagamos, nuestra distribución se verá más <em>Gaussiana</em>, lo cual permite simplificar en gran medidad un problema más complejo.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Estad&#237;stica-y-espectaciones">Estad&#237;stica y espectaciones<a class="anchor-link" href="#Estad&#237;stica-y-espectaciones">&#182;</a></h2>
</div>
</div>
</div>
 

