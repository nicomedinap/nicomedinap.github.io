---
layout: post
mathjax: true
comments: true
title:  "Prueba 100000"
---
{% include mathjax.html %}

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[21]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="kn">from</span> <span class="nn">IPython.core.display</span> <span class="kn">import</span> <span class="n">HTML</span>
<span class="n">HTML</span><span class="p">(</span><span class="s2">&quot;&quot;&quot;</span>
<span class="s2">&lt;style&gt;</span>

<span class="s2">div.cell { /* Tunes the space between cells */</span>
<span class="s2">margin-top:1em;</span>
<span class="s2">margin-bottom:1em;</span>
<span class="s2">}</span>

<span class="s2">div.text_cell_render h1 { /* Main titles bigger */</span>
<span class="s2">font-size: 2.2em;</span>
<span class="s2">line-height:1.4em;</span>
<span class="s2">}</span>

<span class="s2">div.text_cell_render h2 { /*  Parts names nearer from text */</span>
<span class="s2">margin-bottom: -0.3em;</span>
<span class="s2">}</span>


<span class="s2">div.text_cell_render { /* Customize text cells */</span>
<span class="s2">font-family: &#39;Open Sans&#39;;</span>
<span class="s2">font-size:1.em;</span>
<span class="s2">line-height:1.em;</span>
<span class="s2">padding-left:1em;</span>
<span class="s2">padding-right:1em;</span>
<span class="s2">}</span>

<span class="s2">.output_png img {</span>
<span class="s2">    display: block;</span>
<span class="s2">    margin-left: auto;</span>
<span class="s2">    margin-right: auto;</span>
<span class="s2">    font-size: 10px</span>
<span class="s2">}</span>

<span class="s2">&lt;/style&gt;</span>
<span class="s2">&quot;&quot;&quot;</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area"><div class="prompt output_prompt">Out[21]:</div>

<div class="output_html rendered_html output_subarea output_execute_result">

<style>

div.cell { /* Tunes the space between cells */
margin-top:1em;
margin-bottom:1em;
}

div.text_cell_render h1 { /* Main titles bigger */
font-size: 2.2em;
line-height:1.4em;
}

div.text_cell_render h2 { /*  Parts names nearer from text */
margin-bottom: -0.3em;
}


div.text_cell_render { /* Customize text cells */
font-family: 'Open Sans';
font-size:1.em;
line-height:1.em;
padding-left:1em;
padding-right:1em;
}

.output_png img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    font-size: 10px
}

</style>

</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h1 id="Distribuci&#243;n-gaussiana-en-Python">Distribuci&#243;n gaussiana en Python<a class="anchor-link" href="#Distribuci&#243;n-gaussiana-en-Python">&#182;</a></h1>
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[4]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="o">%</span><span class="k">matplotlib</span> inline
<span class="kn">import</span> <span class="nn">matplotlib.pyplot</span> <span class="kn">as</span> <span class="nn">plt</span>
<span class="kn">import</span> <span class="nn">numpy</span> <span class="kn">as</span> <span class="nn">np</span>
</pre></div>

</div>
</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Una de las <a href="https://es.wikipedia.org/wiki/Distribuci%C3%B3n_de_probabilidad">distribuciones de probabilidad</a> más utilizadas en las ciencias es llamada Distribución normal o Distribución gaussiana. La importancia de éstas recae en la variedad de fenomenos que es capaz de modelar <a href="https://es.wikipedia.org/wiki/Distribuci%C3%B3n_de_probabilidad">[1]</a>. Variados ejemplos se pueden encontrar de analisis y estudios hechos en base al entendimiento de muchos datos usando esta distribución Gaussiana. De hecho, el comportamiento que describe esta distribución es base importante del llamado 'Machine Learning'.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Generaremos una distribución que representará una base de datos la cual necesitamos analizar. Y luego representaremos su distribución mediante un histograma:</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[22]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="c1">#media y desvio estandar:</span>
<span class="n">mu</span>    <span class="o">=</span> <span class="mi">0</span>
<span class="n">sigma</span> <span class="o">=</span> <span class="mi">1</span>
<span class="c1">#Número de datos de la muestra:</span>
<span class="n">Ndatos</span> <span class="o">=</span> <span class="mi">500</span>
<span class="c1">#Generamos una muestra de datos:</span>
<span class="n">datos</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">normal</span><span class="p">(</span><span class="n">mu</span><span class="p">,</span> <span class="n">sigma</span><span class="p">,</span> <span class="n">Ndatos</span><span class="p">)</span> 

<span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span><span class="mi">3</span><span class="p">))</span>
<span class="n">frecuencia</span><span class="p">,</span> <span class="n">largo</span><span class="p">,</span> <span class="n">ignorar</span> <span class="o">=</span> <span class="n">plt</span><span class="o">.</span><span class="n">hist</span><span class="p">(</span><span class="n">datos</span><span class="p">,</span> <span class="mi">20</span><span class="p">,</span> <span class="n">normed</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="s1">r&#39;$\rm Frequencia$&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">15</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">r&#39;$\rm Valores\ de\ los\ datos$&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">15</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">title</span><span class="p">(</span><span class="s1">&#39;Histograma&#39;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">show</span><span class="p">()</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area"><div class="prompt"></div>


<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="&#191;C&#243;mo-determinamos-que-distribuci&#243;n-debemos-utilizar?">&#191;C&#243;mo determinamos que distribuci&#243;n debemos utilizar?<a class="anchor-link" href="#&#191;C&#243;mo-determinamos-que-distribuci&#243;n-debemos-utilizar?">&#182;</a></h2>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Esta es una muy buena pregunta. De su respuesta depende el modelo que usaremos para entender los datos y sacar conclusiones. Por ende, debemos ser capacez de caracterizar nuestra distribución con el fin de obtener información inicial. Algunas preguntas útiles son si los datos son discretos o continuos, o si la distribución de los valores son simétricos con respecto a un eje. En nuestro caso, como los datos son generados po una distribución Gaussiana, el histograma muestra que los datos son simétricos en el eje $\mu=0$, y sus valores son contínuos.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Matem&#225;ticamente-hablando">Matem&#225;ticamente hablando<a class="anchor-link" href="#Matem&#225;ticamente-hablando">&#182;</a></h2>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>La función de densidad de probabilidad (PDF por las siglas en inglés Probability Density Function) de la distribución normal, dada la información de un set de mediciones $X=[x_1,x_2,...,x_n]$, se define como sigue:</p>
$$f(X\ |\ \mu,\sigma)=\displaystyle \frac{1}{\sqrt{2\pi} \sigma} \ e^{-\frac{1}{2}\left(\frac{X-\mu}{\sigma}\right)^{2}}$$<p>Aquí, $\mu$ y $\sigma$ son la media y desviación estándar del set de datos $X$. Estos parámetros pueden ser interpretados como...</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[2]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="k">def</span> <span class="nf">Gaussiana</span><span class="p">(</span><span class="n">Distribucion</span><span class="p">,</span><span class="n">media</span><span class="p">,</span><span class="n">sigma</span><span class="p">):</span>
    <span class="k">return</span> <span class="p">(</span><span class="mf">1.</span><span class="o">/</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">sqrt</span><span class="p">(</span><span class="mi">2</span><span class="o">*</span><span class="n">np</span><span class="o">.</span><span class="n">pi</span><span class="p">)</span><span class="o">*</span><span class="n">sigma</span><span class="p">))</span><span class="o">*</span><span class="n">np</span><span class="o">.</span><span class="n">exp</span><span class="p">(</span><span class="o">-</span><span class="mf">0.5</span><span class="o">*</span><span class="p">((</span><span class="n">Distribucion</span> <span class="o">-</span> <span class="n">media</span><span class="p">)</span><span class="o">/</span><span class="n">sigma</span><span class="p">)</span><span class="o">**</span><span class="mi">2</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Entonces, si fijamos los parámetros $\mu=0$ y $\sigma=1$ sobre un rango arbitrario $x_{i}$ que esté centrado en $\mu$ a modo de prueba, podemos ver el comportamiento de la función:</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[25]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="n">media</span><span class="o">=</span><span class="mi">0</span>
<span class="n">sigma</span><span class="o">=</span><span class="mi">1</span>

<span class="n">xi</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">linspace</span><span class="p">(</span><span class="o">-</span><span class="mi">5</span><span class="p">,</span><span class="mi">5</span><span class="p">,</span><span class="mi">1000</span><span class="p">)</span>
<span class="n">yi</span> <span class="o">=</span> <span class="n">Gaussiana</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">media</span><span class="p">,</span><span class="n">sigma</span><span class="p">)</span>

<span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span><span class="mi">3</span><span class="p">))</span>

<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">yi</span><span class="p">,</span><span class="s1">&#39;-&#39;</span><span class="p">,</span><span class="n">color</span><span class="o">=</span><span class="s1">&#39;red&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mi">2</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="s1">&#39;PDF Gaussiana&#39;</span><span class="p">)</span>

<span class="n">frecuencia</span><span class="p">,</span> <span class="n">largo</span><span class="p">,</span> <span class="n">ignorar</span> <span class="o">=</span> <span class="n">plt</span><span class="o">.</span><span class="n">hist</span><span class="p">(</span><span class="n">datos</span><span class="p">,</span> <span class="mi">20</span><span class="p">,</span> <span class="n">normed</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>


<span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">(</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;best&#39;</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">10</span><span class="p">,</span> <span class="n">frameon</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">r&#39;$\rm x_{i}$&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">15</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">show</span><span class="p">()</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area"><div class="prompt"></div>


<div class="output_png output_subarea ">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAboAAAEuCAYAAAD4ANfQAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz
AAAPYQAAD2EBqD+naQAAIABJREFUeJzt3Xd4VVW6x/FvCJGWYBCpIqAQkKJoEBSlqICgiFwFwSjK
xQHGbsbBcsUZ22AZFaNjLxRFI6JYQJAuKqIgQYoGCQzSIRAISWghJPePtU/JyUnZIck+5fd5nv1k
9/OeEM571tqrgIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiEiwawh8ARwA9gIvAZGl
XNMROAz09NpXDcgGcqyf2UAWUKuC4xUREbFlMfA+UBM4C1gL/LOE8+tY55ygcKLrCByl9CQpIiJS
ZVoD+UBjr31Dga0lXDMZeMK6zjvRjQSWV3B8IiIiRVSzcW4HYD+w22tfKtAMqOvn/BGYUt8Tfo51
wVRTLgfSgSVANxuxiIiIlImdRBcDHPLZd9j6Ge2z/xzgKeAmTGnO12HgJ2AQ0Bz4CpgLtLQRj4iI
SKmq2zj3EFDbZ59rO9trXy3gE+A+YAcQYe2P8DpnrM99XsRUZw4AXvPz2k2sRUREwtsua6kUcZjS
WUOvfcOALT7n9cCU2A54LfmYZPiqdc544Hyf69Iwyc5Xk6ZNmxYAWrRo0aJFy3ZsFnwiSj+lkO+s
FxkDNMBUOU4HnizlunzgMut6MF0U6mEas2QCDwF3Yqo8M32ujQdWTp06lXbt2tkMN3QkJiaSlJTk
dBiOCvffQbi/f9DvINzff2pqKsOHDwfoDKSU9To7VZcAQzClss2Y5DUF8ywOTIltDJBchvuMxFRX
rsZ0QfgZ6EPRJOfWrl074uPjbYYbOmJjY8P6/YN+B+H+/kG/g3B//+VlN9GlY0ph/sSUcJ1vo5cD
wG02X1tERMQ2O60uRUREgo4SnYiIhDQluiCRkJDgdAiOC/ffQbi/f9DvINzff3nZbXXphHhg5cqV
K/UQVkQkjKWkpNC5c2ew2epSJToREQlpSnQiIhLSlOhERCSkKdGJiEhIU6ITEZGQpkQnImGrZcuW
1KpVi5iYGOrWrUt0dDRnnHEGDz74IPn5Zoaxxx9/nMjISGJiYoiJiaF27do0a9aMO++8kwMHDrjv
NXnyZKpVq+Y+z3v57rvviguBpUuXMnjwYJo2bUpMTAzNmjVjxIgRbNy4sdLff0k+/PBDOnbs6GgM
FUWJTkTCVkREBG+99RbZ2dlkZWWRk5PD3LlzmTJlCk8+6RmrvlevXmRnZ5Odnc3hw4dZsGABqamp
XHHFFRw/ftx9XosWLdzneS89e/b0+/pTpkyhX79+dOvWjfXr15Odnc3PP/9Ms2bNuPjii9m1q9Jm
oynVzTffzLp16xx7/YqkRCci4qVjx4706NGDVatWufcVFBQUOuecc87h888/Z+PGjUyePLlcr5OZ
mcmdd97Jiy++yNixY6lbty4AZ5xxBuPHj2fs2LFkZGQAkJWVxejRo2nTpo271PfMM8+479WyZUum
TJni3v7222+pVs3z8f7444/TvHlz6tevT9euXZk5cyYAeXl53HnnnTRp0oQGDRrQs2dPfvzxR8CU
UM866yz3PSZOnMiFF17I6aefTt26dRk4cCD79u1z33/IkCHccsst1KtXjzPPPJNHHnnEfe3OnTsZ
NmwYZ599NnXq1KFVq1ZMmjSpXL+38lCiE5GqceGF0KxZxS8XXnhSYXknsePHj/Ptt9+yePFirrzy
yhKvi42N5dJLL2XRokXlet1Zs2Zx4sQJ/vd//9fv8Ycffthddfjwww+zZcsWfvnlF7Kzs3nllVcY
N24cmzdvBkzJNCLC//gfixcv5p133mHFihVkZGQwatQoRo0aRV5eHh988AHLli3jjz/+YM+ePfTs
2ZO77rqryD1+/vln7r33Xt5880327dtHamoqaWlpvPLKK+5zPv/8c/r168f+/ft5++23ee6551i+
fDkAo0ePpmbNmvz+++/k5ORw9913c/fdd3P48OFy/e7ssjt7gYhI+ezeDTt2OB1FIQUFBdx5550k
Jia69zVr1oyxY8f6/cD3Vb9+fXepBmDr1q3Uq1ev0Dn33nsvTzzxRJFrt2/fTv369alRo4Z73xNP
POGeb+748ePcdNNNvP322zzxxBNUr16d6Ohotm3b5r5mx44dhUpd/tSsWZOMjAzeeustrrnmGkaN
GsWYMWMAqFWrFps3b+bdd9+lf//+PPXUU/zrX/8qco9OnTrx22+/0aJFCw4cOMCOHTto0KABO3fu
dJ/Ttm1b11xxXHXVVTRp0oQNGzbQtWtX3nnnHerWrUv16tX5888/iY6O5siRI+zfv5/atWuXGH9F
UKITkarRuHHA3TciIoI33niDW2+9tVzXp6en09jr9Zs3b+4uZZWmSZMmZGRkcPz4caKiogB47LHH
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
IiLB7v8BgF3iSR+6UF0AAAAASUVORK5CYII=
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>De esta misma manera, podemos estudiar cómo cada uno de esos parámetros afecta a la función $\mathtt{Gaussiana}$. Para cada caso, dejaremos uno de los parámetros fijo y variaremos el otro. En primer lugar, fijaremos $\sigma=1$ y evaluaremos La Funcion gaussiana con $\mu=[0,2,4,6]$ (izquerda). 
Luego, fijaremos $\mu=0$ y evaluaremos La Funcion gaussiana con $\sigma=[1,1.5,2,3]$ (derecha).</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[6]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">9</span><span class="p">,</span><span class="mi">3</span><span class="p">))</span>

<span class="n">sigma</span><span class="o">=</span><span class="mi">1</span>
<span class="n">media</span><span class="o">=</span><span class="p">[</span><span class="mi">0</span><span class="p">,</span><span class="mi">2</span><span class="p">,</span><span class="mi">4</span><span class="p">,</span><span class="mi">6</span><span class="p">]</span>

<span class="n">plt</span><span class="o">.</span><span class="n">subplot</span><span class="p">(</span><span class="mi">121</span><span class="p">)</span>

<span class="k">for</span> <span class="n">media_i</span> <span class="ow">in</span> <span class="n">media</span><span class="p">:</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">Gaussiana</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">media_i</span><span class="p">,</span><span class="n">sigma</span><span class="p">),</span><span class="s1">&#39;-&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mi">1</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="s1">r&#39;$\mu = </span><span class="si">%0.1f</span><span class="s1">$&#39;</span> <span class="o">%</span><span class="k">media_i</span>)
<span class="n">plt</span><span class="o">.</span><span class="n">title</span><span class="p">(</span><span class="s1">r&#39;$\rm Gaussianas\ con\ \sigma=1$&#39;</span><span class="p">,</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">12</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">r&#39;$\rm x_{i}$&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">12</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">(</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;best&#39;</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">12</span><span class="p">,</span> <span class="n">frameon</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>  

<span class="c1">#----------------------------------------------------------</span>

<span class="n">media</span><span class="o">=</span><span class="mi">0</span>
<span class="n">sigma</span><span class="o">=</span><span class="p">[</span><span class="mi">1</span><span class="p">,</span><span class="mf">1.5</span><span class="p">,</span><span class="mi">2</span><span class="p">,</span><span class="mi">3</span><span class="p">]</span>

<span class="n">plt</span><span class="o">.</span><span class="n">subplot</span><span class="p">(</span><span class="mi">122</span><span class="p">)</span>

<span class="k">for</span> <span class="n">sigma_i</span> <span class="ow">in</span> <span class="n">sigma</span><span class="p">:</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">Gaussiana</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">media</span><span class="p">,</span><span class="n">sigma_i</span><span class="p">),</span><span class="s1">&#39;-&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mi">1</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="s1">r&#39;$\sigma = </span><span class="si">%0.1f</span><span class="s1">$&#39;</span> <span class="o">%</span><span class="k">sigma_i</span>)
<span class="n">plt</span><span class="o">.</span><span class="n">title</span><span class="p">(</span><span class="s1">r&#39;$\rm Gaussianas\ con\ \mu=0$&#39;</span><span class="p">,</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">12</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">r&#39;$\rm x_{i}$&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">12</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">(</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;best&#39;</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">12</span><span class="p">,</span> <span class="n">frameon</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>  

<span class="n">plt</span><span class="o">.</span><span class="n">show</span><span class="p">()</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area"><div class="prompt"></div>


<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Podemos ver que cuando $\mu$ cambia, la forma de la curva se mantiene, pero se desplaza a lo largo del dominio de $X$. También podemos darnos cuenta que cuando $\sigma$ cambia, el ancho o forma de la 'campana' varía. Entender cómo estos parámetros afectan la distribución es importante para poder modelar datos reales.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Modelando-distribuciones">Modelando distribuciones<a class="anchor-link" href="#Modelando-distribuciones">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[&nbsp;]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span> 
</pre></div>

</div>
</div>
</div>

</div>
 

