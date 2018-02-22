
---
layout: post
mathjax: true
comments: true
title:  "Prueba 100000"
---
{% include mathjax.html %}


<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[24]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="kn">from</span> <span class="nn">IPython.core.display</span> <span class="kn">import</span> <span class="n">HTML</span>
<span class="n">HTML</span><span class="p">(</span><span class="s2">&quot;&quot;&quot;</span>
<span class="s2">&lt;style&gt;</span>

<span class="s2">div.cell { /* Tunes the space between cells */</span>
<span class="s2">margin-top:1em;</span>
<span class="s2">margin-bottom:1em;</span>
<span class="s2">}</span>

<span class="s2">div.text_cell_render h1 { /* Main titles bigger, centered */</span>
<span class="s2">font-size: 2.2em;</span>
<span class="s2">line-height:1.4em;</span>
<span class="s2">text-align:center;</span>
<span class="s2">}</span>

<span class="s2">div.text_cell_render h2 { /*  Parts names nearer from text */</span>
<span class="s2">margin-bottom: -0.1em;</span>
<span class="s2">}</span>


<span class="s2">div.text_cell_render { /* Customize text cells */</span>
<span class="s2">font-family: &#39;Arial&#39;;</span>
<span class="s2">font-size:1.1em;</span>
<span class="s2">line-height:1.4em;</span>
<span class="s2">padding-left:3em;</span>
<span class="s2">padding-right:3em;</span>
<span class="s2">}</span>
<span class="s2">&lt;/style&gt;</span>
<span class="s2">&quot;&quot;&quot;</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area"><div class="prompt output_prompt">Out[24]:</div>

<div class="output_html rendered_html output_subarea output_execute_result">

<style>

div.cell { /* Tunes the space between cells */
margin-top:1em;
margin-bottom:1em;
}

div.text_cell_render h1 { /* Main titles bigger, centered */
font-size: 2.2em;
line-height:1.4em;
text-align:center;
}

div.text_cell_render h2 { /*  Parts names nearer from text */
margin-bottom: -0.1em;
}


div.text_cell_render { /* Customize text cells */
font-family: 'Arial';
font-size:1.1em;
line-height:1.4em;
padding-left:3em;
padding-right:3em;
}
</style>

</div>

</div>

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
<p>Generaremos una distribución que representará una base de datos la cual necesitamos analizar. Y luego representaremos su distribución mediante un histograma:</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[17]:</div>
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
RU5ErkJggg==
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
<div class="prompt input_prompt">In&nbsp;[12]:</div>
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
<div class="prompt input_prompt">In&nbsp;[19]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="n">media</span><span class="o">=</span><span class="mi">0</span>
<span class="n">sigma</span><span class="o">=</span><span class="mi">1</span>

<span class="n">xi</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">linspace</span><span class="p">(</span><span class="o">-</span><span class="mi">5</span><span class="p">,</span><span class="mi">10</span><span class="p">,</span><span class="mi">1000</span><span class="p">)</span>
<span class="n">yi</span> <span class="o">=</span> <span class="n">Gaussiana</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">media</span><span class="p">,</span><span class="n">sigma</span><span class="p">)</span>

<span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span><span class="mi">3</span><span class="p">))</span>

<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">yi</span><span class="p">,</span><span class="s1">&#39;-&#39;</span><span class="p">,</span><span class="n">color</span><span class="o">=</span><span class="s1">&#39;red&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mi">2</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="s1">&#39;PDF Gaussiana&#39;</span><span class="p">)</span>

<span class="n">frecuencia</span><span class="p">,</span> <span class="n">largo</span><span class="p">,</span> <span class="n">ignorar</span> <span class="o">=</span> <span class="n">plt</span><span class="o">.</span><span class="n">hist</span><span class="p">(</span><span class="n">datos</span><span class="p">,</span> <span class="mi">20</span><span class="p">,</span> <span class="n">normed</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>

<span class="n">plt</span><span class="o">.</span><span class="n">xlim</span><span class="p">(</span><span class="o">-</span><span class="mi">5</span><span class="p">,</span><span class="mi">5</span><span class="p">)</span>

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
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbYAAAEuCAYAAADiPDdeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz
AAAPYQAAD2EBqD+naQAAIABJREFUeJzt3Xd4FNX+x/F3ApGWxCBSBQSlCAgoCIoFG1ewIB2MoqAC
Kirm+uMiYsHGVa4XjF2xAALmUhQUVLBRREUkUWokUREQpQUCoROyvz/O7Gaz2U0yIcnsbj6v55mH
KWd2vlmS/e45c+YcEBERERERERERERERERERERERERERERERERERERERERERESlMLWAesBfYBbwA
VCjknHOBQ0Bnr32RQBZwwPo3C9gPVCnheEVERAq0GHgPqAw0BtYCjxdQvppV5gR5E9u5wBEKT4oi
IiKlpgmQA9Tx2tcf2FLAOVOAJ63zvBPb7cDKEo5PRESESBtlWwF7gO1e+1KB+kCsn/KDMLW6J/0c
64BpdlwJ7ASWAp1sxCIiIuKXncQWAxz02XfI+jfaZ/85wNPAzZjamq9DwAqgB9AQ+BhYBDSyEY+I
iEg+FW2UPQhU9dnn3s7y2lcFmAU8AGwDIqz9EV5lRvq8zgRM8+T1wKt+rl3XWkREpHz721pKRFNM
7auW174BwGafcpdhamR7vZYcTPJ7xSozDjjP57x0THLzVfecc85xAVq0aNGiRcsGCqnoRBR00I9l
wJ/AMKAmpglxNvBUIeflAFdY54N5ZKA6pvNJJvAQMBzThJnpc247IHn69Om0aNHCZrilLyEhgcTE
RKfDCDl63+zTe1Y8et/sC9b3LDU1lYEDBwK0B1IClbPTFAnQF1Pr2oRJVlMx99LA1MiGAUlFeJ3b
Mc2PqzGPBPwAdCF/UvNo0aIF7dq1sxlu6YuLiwvKuIKd3jf79J4Vj943+0L9PbOb2HZialn+xBRw
nm8nlb3AHTavLSIiUig7vSJFRESCnhKbiIiEFSW2kxQfH+90CCFJ75t9es+KR++bfaH+ntntFemE
dkBycnJySN/MFBGRk5OSkkL79u2hkF6RqrGJiEhYUWITEZGwosQmIiJhRYlNRETCihKbiIiEFSU2
kSCQnp5OSkpKkZf09HSnQw4LjRo1okqVKsTExBAbG0t0dDRnnHEGo0aNIifHzLj1xBNPUKFCBWJi
YoiJiaFq1arUr1+f4cOHs3fvXs9rTZkyhcjISE8572XZsmWBQuDbb7+lT58+1KtXj5iYGOrXr8+g
QYP49ddfS/3nL8iMGTM499xzHY0hnLUDXMnJyS6RcJSWllasUc7T0tKcDj3kNWrUyDV16tQ8+9au
XeuqVauWa+zYsS6Xy+UaO3as68orr8xTJjU11XXFFVe4zjvvPNexY8dcLpfLNXnyZFejRo1sXX/K
lCmuatWquZ5//nnXvn37XC6Xy/Xnn3+6xowZ46pRo4brr7/+KuZPFp6Sk5Pdv/8FPvulGpuIw7Ky
3NMZTgeSi7BM9zlPStK5557LZZddxk8//eTZ53K58pQ555xzmDt3Lr/++itTpkwp1nUyMzMZPnw4
EyZMYOTIkcTGxgJwxhlnMG7cOEaOHElGRgYA+/fvZ+jQoTRr1sxTq3v22Wc9r9WoUSOmTp3q2V6y
ZAmRkbkf70888QQNGzakRo0adOzYkfnz5wOQnZ3N8OHDqVu3LjVr1qRz58589913gKmBNm7c2PMa
7777LhdccAGnn346sbGxdO/end27d3tev2/fvtx6661Ur16dBg0aMGbMGM+5f/31FwMGDOCss86i
WrVqnH322UyePLlY71tRKLGJBI0WmC+ihS3BN31TkVxwAdSvX/LLBRecVFjeSev48eMsWbKExYsX
c8011xR4XlxcHJdccglff/11sa67YMECTpw4weDBg/0eHz16tKcpcPTo0WzevJlVq1aRlZXFSy+9
xCOPPMKmTZsAiIiIICLC/3gbixcv5q233uLHH38kIyODIUOGMGTIELKzs5k2bRrff/89GzduZMeO
HXTu3Jl7770332v88MMPjBgxgjfeeIPdu3eTmppKeno6L730kqfM3Llz6dq1K3v27GHSpEmMHz+e
lStXAjB06FAqV67Mhg0bOHDgAPfddx/33Xcfhw4dKtZ7Vxi7o/uLiBTP9u2wbZvTUeThcrkYPnw4
CQkJnn3169dn5MiRfj/gfdWoUcNTawHYsmUL1atXz1NmxIgRPPnkk/nO/fPPP6lRowaVKlXy7Hvy
ySc986AdP36cm2++mUmTJvHkk09SsWJFoqOj2bp1q+ecbdu25alV+VO5cmUyMjJ48803ueGGGxgy
ZAjDhg0DoEqVKmzatIm3336bbt268fTTT/PMM8/ke422bduyfv16zjzzTPbu3cu2bduoWbMmf/31
l6dM8+bN3XOlce2111K3bl3S0tLo2LEjb731FrGxsVSsWJE//viD6OhoDh8+zJ49e6hatWqB8ReH
EpuIlI06dYLudSMiInj99de57bbbinX+zp07qeN1/YYNG3pqUYWpW7cuGRkZHD9+nKioKADGjh3L
2LFjAbj99tvJzs4GYMeOHTzwwAP89NNPNG7cmA4dOgB4OrgUpFOnTrz//vtMmjSJ//znP1StWpUR
I0bwyCOPcNNNN3HgwAGmTZvGmDFjqFWrFo888gh33XVXnteIjIwkMTGR999/n+joaNq0acP+/fvz
XL927dp5zomKivIc/+233/jXv/5Feno6zZo1o2nTpkWOvziU2ESkbKxa5XQEJSojI4Pvv/+eV199
tVjnd+/enXvuuYepU6cyZMiQfMddLpenebF///706NGDL774gsjISDIyMpg0aZKnbIUKFTh69Khn
27sW+eeff9KoUSMWLlxIdnY2X3zxBb1796Zdu3Y0b96ciy++mCFDhnD06FFmzZrFoEGDuOyyy/LE
kpiYyBdffMG6deuoWbOmJ/6iOH78ODfccAPPPfcc99xzDwDJyclMnz69iO+UfXbvsdUC5mEmCt0F
vABUKOScc4FDQGef/aOArcABYDHQzGYsIiKOWLt2LX369KFNmzae5je7TjvtNN58800efPBBJkyY
wM6dOwHT0WLcuHHMnj2bevXqAbBv3z4qV65MREQEu3bt4v777wfg2LFjALRo0YKPPvqII0eOsH37
dl588UXPdb7//nu6du3KmjVrqFixIrVq1QKgZs2afPjhh/Tq1YvNmzdTqVIlTjvtNKKiooiLi8sT
6759+6hYsSJRUVFkZ2czffp0Pv/8c8/1C3Ls2DEOHz5MlSpVANNc+9BDDwHkScYlyW5imwnsB+oC
HYEuwCMFlK8GJAGVfPYPAu4H/gHUwHT1WkDhSVJEpExFRETwzTffeJ5Ji4uLo2/fvnTq1Ikvv/yS
ChUqeMoF6sARyK233srixYtJSUmhXbt2REdHc/7557Nq1Spmz57tud81efJkZs6cSfXq1enWrRtd
u3bl0ksvZe3atQCMHz+erKws6tSpw9VXX82tt97qiaVfv34kJCTQvXt3oqOjGTBgAC+++CIdOnTg
wQcf5Nprr6VTp05ER0czevRoZs6c6Umo7tcYOXIkDRs25Mwzz6R58+Z8//33PPvss57rF/SzV6tW
jcmTJ/PUU09Ro0YN4uPj+ec//0mDBg1Yt26dzf+NorHzv9AESAPqAdutff2B/wINA5wzBdgMPAZc
AbifUlyOSWTPWdsVgQygF+DbxUjT1khYy52KI5lCHs9xnwG0R38TUt6UxrQ1rYA95CY1gFSgPhDr
p/wgoDGQvzsQtATWem1nA+lAaxvxiIiI5GOn80gMcNBnn/shhGhME6XbOcDTQCfAX7eXQK9VzUY8
IuWMi9CYG1jEWXYS20HA94ED97b3EAhVgFnAA8A2cv8Svf8iA72WhlIQsVzAjwxiKlewhLP4nVM4
xg5q8wPNmQNEFOHGvUh5ZCexrcN09KgF7LT2tcT0bPROSBdg7se9ay1uC4CpwH3Wa50LfGodiwKa
Wvv9SkhIyNdTJz4+nvj4eBs/gkjwa8ZGEkngWhbmO3YGf9Gbv+gNHOvZExITYcAAsNlpQSTYJSUl
kZSUlGdfZmZmkc61+9ewDPgTGAbUBD4GZgNPFXJeDnk7j9xhnXM9sBEYB9yASZQnfM5V5xEJa96d
R25hA29wN9FeLfXHqUgazThCZc7id6rj88c9YAC88w5UU0u+hLfS6DwC0BdTy9sErAA+w9xLA1Nr
K2r16V1gIvAhpvbXFpPkfJOaSLnxDK8ynVs9SW0zDRnKJE5jD+eyngtIpgYZXM4kT1MHADNnwlVX
gddDuSLlmd2RR3Ziuvj7E1PAef4S6ERrESnfXC7GA6O8Wu7f4Q7u52UO+9yKdhHJMtqzDPht/HjO
+ve/Yd8+WLkSOneGb76BGjXKNn6RIKPR/UUcVmvaNEZ5bd/HywzhnXxJzVdmly4mkdWta3akpsKN
N8Lhw6UXrEgIUGITcdL8+ZzhNfXHMN7kVe4r+vmtW8O33+YOBPzddzB4MPjMHyZSnmgQZBGnbNoE
t9xChJWExnIXbzGsyKenpqZ61qtMmECzoUOpcOgQzJrFlrPOYne/fnnKx8TEeEZVFwlnSmwiTjhx
Am69FaxZsGcDT5N/hHf/tgDkG3y3B2aEcoBazz1H9+eeY43PmWlpaUpuEvbUFCnihP/8xzQhAkfr
1eNOTMeQonE/CjAdM76kWT4imZcYAEBlYArNqcgK67iZIiQrS2MgSPhTYhMpa7/+Cu4ZlSMj+ePp
p4s55E4LzGOeucu/mMoaa8jV89nIP1lqHWtx8nGLhAglNpGy5HLBvfeCex6qBx/k4HnnldjLH6MS
Q3ibHGvshScZy1n8VmKvLxIKlNhEytIHH8Dnn5v1Bg1g7NgSv8SPdORFHgCgCkd4nn+V+DVEgpkS
m0hZOXYMrJmDAXjpJYiOLpVLPc5T/I15BKA3c7mcVaVyHZFgpMQmUlbeegt+/92sX3UV9OhRapc6
QAyP8oxneyITNeGNlBtKbCJlISsLnvIaK3z8+FIfkX8Kg/kJc/+uHRvpU6pXEwkeSmwiZWHiRNhp
zfbUvz9ccEGpXzKHCjzMs57tsQA5/ub9FQkvSmwipS0z0yQ2gIoV4ZlnCi5fghbRle+5CDATIFb/
8ssyu7aIU5TYRErba6/B/v1mffBgKNORPyIYy5OerTqTJplRT0TCmBKbSGk6dAheeMGsR0bm7RVZ
Rr7gH3xLWwCqbNoEc+aUeQwiZUmJTaQ0vfNO7gSgAwZAkyYOBBHBE96DK//3vxr9X8Ka3cRWCzPO
6l5gF/ACUCHA6z6BGa01C1gD9PM5ngUcsP7NAvYDVWzGIxK8jh2D55/P3R492rFQvuRCfnJvrFpl
5nETCVN2E9tMTAKqC3QEugCP+Cl3LzAQuBwzs/bDQBLQ2DreEogCTrWOxwCxgGZIlPAxZw5s3WrW
b7gB2rRxMJgI/uu9OWGCU4GIlDo7ia0JJlGNAo4Am4Cnwe9cG68Ara0ylTA1vQPAIet4B0wtTnex
JXx5TSDKyJHOxWGZBRyrXdtszJ8PGzc6Go9IabGT2FoBe4DtXvtSgfqY2pY3F6b2dQ1mjo23gceA
HdbxDphmx5XATmAp0Mlm7CLB64cfzALQti107uxsPEA2sPOmm8yGywWJiY7GI1Ja7CS2GHIngnJz
18ACDXi3BDgF+AcwDujvdd4KzNyIDYGPgUVAIxvxiASvl1/OXR8xotRHGSmq3b165Y5POW1a7mMI
ImHETmI7CFT12efeDjSd1DEgB/gamAbcbO0fCQwF/sY0a07AdDS53kY8IsFp+3aYNcus16gB8fHO
xuMlJybGzNwNcPCgSW4iYaaijbLrgBqY+2XW2EC0BLaSP7FNwDRHet9YqAxkWOvjgNnAz17HK5Fb
A8wnISGBuLi4PPvi4+OJD6IPDREAJk2C48fN+tChUCXIOvvecw+8/rpZf+01GD48aGqUIm5JSUkk
JSXl2ZeZmVkq11oGvI9pemwMrAUe91PuRkxnkcswtcLu1vaF1vF5mPtqtTEJ7XHMvbu4fK9kpv91
JScnu0SCXna2y9WwocsFLldkpMu1eXOhpyQnJ7sAFyS7zM2vwpbpNsu7rLJef0eXXJJ7cOnSUn5T
REpG7t8K7QpKVHa7+/fF1PI2Ye6RfYbpGQmm1uauPn0M3A+8helw8ijQC7DupnM78BuwGtgNdMY8
OlA66VikrHz5JWzZYta7dYOGDZ2NJ5Dhw3PX3bU3kTBhpykSTBNk/wDHYny2J1uLP3uBO2xeWyT4
vfVW7vrQoc7FUZg+fSAhAXbtMrN679oFNWs6HZVIidCQWiIlZedO+Ogjs167NlwfxH2hKlWC2283
68ePw/vvOxuPSAlSYhMpKe+9B9nZZn3wYIiKcjScQrkTG8DkQI0rIqHHblOkiPjjcsHbb3s21190
EUdTUop0ampqamlFVbBzzoGLLoIVK2D1avjpJzj/fGdiESlBSmwiJWH5cs8QVYuBq3r1cjaeoho8
2CQ2MLU2JTYJA2qKFCkJU6d6Vt8BYDqQXMTlaRxz001QubJZnzEDjh51LhaREqIam8jJOnIEZs8G
4ETVqnx46BDQgkIetfHiUFMkwKmnQu/epvPInj1mcOS+fZ2LR6QEqMYmcrIWLPCMuZh51VWhN/eS
dyeSKVMcC0OkpCixiZysGTM8q3uuu87BQIrpyiuhQQOzvnCheWxBJISpKVLkZOzZA598Ytbr1iXr
ggucjacQgXpg1uvShTqTJ8OJE2yZOJHd/fsTExND06ZNyzhCkZOnxCZyMmbPzh3wOD4eKlRwNp6A
zDBfAwcO9Hu0FWaUc4Ct48dz6fjxAKSlpSm5SchRU6TIyZg+PXc9QNIIDu6pFP331lxPMms5G4BL
gDN5AYCsrEAzUokELyU2keL64w/z/BpAy5Zw3nmOhlM07t6a+Zf3udNT6iZ+cyQ6kZKgxCZSXN7j
Kw4cGPJzmv2PmzzrN7PQwUhETo4Sm0hxuFx5myFvvjlw2RDxB435jk4AtOFXWjkcj0hxKbGJFMe6
deDuYXjppXDmmc7GU0KSyJ2RXnPTS6iym9hqYWa/3gvsAl4A/HUDiwSewHTFygLWAP18yowCtmJm
1l4MNLMZi4hzrJFGABgwwLk4Stgs+nPC+li4GUzNVCTE2E1sM4H9QF2gI2bW60f8lLsXGAhcjpmA
9GEgCWhsHR+EmWH7H0ANTNesBfhPkiLBxeWCWbPMekSEmbQzTOykNl9xNWD+WKutXetsQCLFYCex
NcEkqlHAEWATZvTWIX7KvgK0tspUwtT0DgCHrONDgVeBX4CjwGigtvX6IsFt3TrPSP5cdhnUrets
PCXsfXLvF1ZftMjBSESKx05iawXsAbZ77UsF6gOxPmVdwGHgGswDNG8DjwE7rOMtAe+vgtlAOiYZ
igQ3d20NoH9/5+IoJfPoyTFr7Ia4xYshJ8fhiETssZPYYsh9ytPNXQOLDnDOEuAUTJPjOMD9KRDo
tarZiEek7LlcuffXwqwZ0m0fcXzBhQCcsmMHrFzpcEQi9thJbAeBqj773NuBhic4BuQAXwPTwNPG
Eei1NMyBBLe1a3ObITt3hjp1nI2nlMyhi9fGHOcCESkGO2NFrsN09KgFuIf/bonp2eibkCZgmiNH
eu2rDGR4vda5wKfWdhTQlNzh6vJJSEggLi4uz774+Hji49UpWcqQd2/Ifr4dfcPHR1zOccwfJnPm
wPPPh/wD6BJakpKSSEpKyrMvMzOzSOfaSWzpwHIgERgG1AQexT1hcF5LgfeBj4BvgeuBAWB1t4J3
gaeARcBGTDPldmBZoIsnJibSrl1RJ24UKQVh3BvS115O5WugK8DmzZCcDEE+c4GEF38Vl5SUFNq3
b1/ouXa7+/fFJMNNwArgM3Lntc8i95nOjzHd+d/CdDh5FOgF/GAdfxeYCHyIqf21xSS/EzbjESk7
a9dCWppZD+NmSLc8DZBqjpQQYnfamp3kdgDxFeOzPdlaAploLSKhIcx7Q/qaB0yKjCQiJ8cktmef
VXOkhAQNqSVSFL69IXv3djaeMrAbyHI3+/z2G6xe7Wg8IkWlxCZSFOvXl6tmSLfMq6/O3VBzpIQI
JTaRopg3L3c9jDuN+Mq88src5sfZszV2pIQEJTaRopg7N3e9Rw/n4ihj2aefboYNA1NjXb/e2YBE
ikCJTaQwW7ZASopZb98eGjZ0Np6y1rdv7rqaIyUEKLGJFMa7GbJnT+ficIp3Rxnv90IkSCmxiRSm
vCe2M86Ajh3N+urVsGmTs/GIFEKJTaQgGRmwzBoQp0kTaNXK2Xic4p3QVWuTIKfEJlKQBQvghDUg
Ts+e5fcB5V69cteV2CTI2R15RKR88eoNubFlSw66O5EEkJqaWtoROeOcc6B5czOzwfLlsGsX1Kzp
dFQifimxiQRy6BA5ixYRiRmhu8Udd1Cun+Lq2RPGjzcTj86fD3fc4XREIn6pKVIkkEWLiDxyBICP
uBIXyVDo8rT/1woHao6UEKEam0ggXh/e8+gFFGXapDBtigTo0AHq1oW//4bPP4cDByA62umoRPJR
jU3En+PHTXMbsB/4mg7OxhMMIiNzR105ehQWLXI2HpEAlNhE/PnmG9i7FzDTvB/jFGfjCRZqjpQQ
oMQm4o9Xb8i5BRQrd664AmJjzfqCBaZmKxJk7Ca2Wpj5B/cCu4AXgAoByt4N/IJpydkI3ONz3Szg
gPVvllWuis14REqey+WpjeRERfGZw+EElVNOgeuvN+uZmbB0qbPxiPhhN7HNxCSgukBHoAvwiJ9y
PYF/A7cBscAgYBzgHnSuJRAFnIqZeTvGKnfYZjwiJS85Gf78E4Csjh3JcjicoKPmSAlydhJbE+By
YBRwBNiE6ds8xE/ZusCzwEprewWwGLjS2u4ArAFO2A9ZpJR5fVhnXnGFc3EEq27dTM0NzHulOdok
yNhJbK2APZhnVd1SgfqY2pa314HnvbZrAZ2Bn6ztDphmx5XATmAp0MlGLCKlx31/LSKCfZ07OxtL
MIqJgS5dzPq2bbBqlbPxiPiwk9higIM++w5Z/xb0MEtt4DNgFTDF67wVQA+gIfAxsAhoZCMekZKX
lgYbNpj1Tp3MRJuSn5ojJYjZSWwHgao++9zbgW5DXIRJaKnAjUCOtX8kMBT4G9OsOQHYAlxvIx6R
kuf9Ie394S15de+eOyC0EpsEGTsjj6wDamCaFXda+1oCW/Gf2O4AXgIeBRJ9jo0DZgM/e+2rRG4N
MJ+EhATi4uLy7IuPjyc+Pr7oP4EIkJ6eTlaW/+9izWbM8DQ/rG/SJHwHNS6ign7+Zm3aEL16NWzY
wPq5czl65pnExMTQtGnTMoxQwlVSUhJJSUl59mVmZpbKtZYB72OaHhsDa4HH/ZTrg6mJ/SPA68zD
3FerjUloj2Pu3cX5KdsOcCUnJ7tETlZaWpoL8LvUMd0gXC5wrc13PNnldbiAZbrN8sU5pyyuMTfg
++ReHvQ64V9e+9PS0pz+b5YwlZyc7P49K3B8O7vd/ftianmbMPfIPiN31NcswF19ehzzfNuH5D6n
lgW8Zh2/HfgNWA3sxnQs6QKUTjoWseTW1KbjO4DxjYzxlJvLnYT9oMYFct9Oz/8+uZePyG2C7Ekb
qywBa8MiZcXuIMg7gf4BjsV4rbct5HX2YpoqRRzSAt8vfb28Ets87rGOl++mSH/vk9tvtGMt59Ka
dVzEWupwep4u0yJO0ZBaIkAs+7iKrwHYQgNSijSSv8yjJwCRuLiRZQ5HI2IosYkA1/IZp2DGPTQf
1hHOBhQi5pLbc7QnS5wLRMSLEpsI0NPrfpH3h7UU7CfOZwsNALialXnuR4g4RYlNyr1TOMp1fArA
HqrzDZc5HFEoifA0R55CNtc6HI0IKLGJcBVfE2s9ijmf7pzQxPK2eNdwVdeVYKDEJuWedzOku/Yh
RfcNl7GH6gBcB0QcO+ZsQFLuKbFJuRZBDj34CIDDVOZzrnE4otBzgorMpztgRkOP0aDI4jAlNinX
LuQH6rADgM+5hkNUczii0ORd0z118WIHIxFRYpNyTs2QJWMRXTlEJQDili6FnJxCzhApPUpsUo65
6IWZe+0EkZ7mNLHvMFX5nIsAiMrIgB9+cDgiKc+U2KTcOodfaEY6YDpAZKC5107GPK7w2tBUNuIc
JTYpt9QMWbIWcBkn3Btz55px/0UcoAd2pNzyTmwf0cPBSMJDBtVZBlwJkJ7Ohg8+4MhZZxV4juZv
k9KgxCblUj12ciErAfiZtvxBY4cjCgdbmIeV2IDp/frxbBHOSktLU3KTEqWmSCmXbmSpZ13NkCXl
oPVEoNGTVgSay80smr9NSodqbFIueY9Er8RWcjYDP9Gc89lIR9ZzBrXYRn2nw5Jyxm6NrRYwDzNR
6C7gBcxM2f7cDfwC7Ac2Avf4HB8FbAUOAIuBZjZjESmWU4Gr+BGAPziT1YXOiyt2zPXqHdkjTx1O
pGzYTWwzMYmqLtAR6AI84qdcT+DfwG2YUXYGAeOA3tbxQcD9wD+AGph2iQUETpIiJeY6IMrqv6e5
10rePM9dtrwddETKip3E1gS4HFPTOgJsAp4GhvgpWxd4Fqy787ACUytz/8YPBV7F1OiOAqOB2tbr
i5Qq74ZHzb1W8tbShN+tzjhXsIQ49jockZQ3dhJbK2APsN1rXypQH1Mr8/Y68LzXdi2gM/CTtd0S
WOt1PBtIB1rbiEfEtoijRz1zhu2mBt9yiaPxhKfcOdqiyOZ6PnE4Hilv7CS2GOCgz75D1r/RBZxX
G/gMWAVMKeS1NAKtlKqYH3/0zPKsuddKj3dNWM2RUtbsJLaDQFWffe7tQP11L8IktFTgRsA9Mmqg
11K/XylVcV4jz6s3ZOn5jovZZQ1R1o2FVOawwxFJeWLn6+o6TEePWsBOa19LTM9GfwnpDuAl4FEg
0c9rnQt8am1HAU2t/X4lJCQQFxeXZ198fDzx8fE2fgQp17KzOXXJEgAOUpkv+Iez8YSxHCrwMTdy
J+8SzUG68CULNMi02JCUlERSUlKefZmZmUU6105iSweWY5LUMKAmJmm946dsH+A1oDvwhZ/j7wJP
AYswjwKYAmaWAAAb/UlEQVSMw9y7Wxbo4omJibRr185GuCI+li0jyvrD+IRLOZyv0UBK0jx6cifv
AqY5UolN7PBXcUlJSaF9+/aFnmu3u39fTDLchOnp+BmmZySYWps7iscxXfc/tPa7l9es4+8CE63j
O4G2wPWQO4aqSIn74IPcVa52MJDy4Uu6cMC6bX4jHxOpP28pI3bvnO8E+gc4FuO1XpQnXidai0jp
y8mBDz8E4DDwqXpDlrojVGEh3ejLB9RkN5fxDUu9p7YRKSUaK1LKh+++g+3mSZVF4KlJSOn6gD6e
9X7MdjASKU+U2KR8mDMnd9XBMMqbBdzAESoB0JsP1RwpZUKJTcJfTo7n/lpOxYoscDic8uQAMSyk
GwB12c4lfOtwRFIeKLFJ+PvxR/jzTwCyLryQfQ6HU97Mpp9nXc2RUhaU2CT8efWGzLxavSHL2ny6
c5RTAOjDB0R4xmkQKR1KbBLeXK7c+2sVKpB5ucbZLmtZxLKIrgDU428u5juHI5Jwp8Qm4e3nn2HT
JrN+5ZWc8Bm9RsqGd3NkX3XfkVKmxCbhzas3JH36BC4npWo+3TlGFGASm5ojpTQpsUn48m6GjIiA
Xpp7zSn7iONzrgGgPtu4kB8cjkjCmRKbhK/16yEtzaxfdhnUru1sPOXcHPp61tU7UkqTEpuEr//9
L3e9b9/A5aRMfEQPNUdKmVBik/DkcoF7yovISOjXr+DyUuoyqc6XdAGgIVvpwHqHI5JwpcQm4WnV
Kvj9d7N+5ZVQp46z8Qjg2xz5pYORSDhTYpPw5N0MedNNzsUhecyjJ8etSUX68wURDscj4UmJTcJP
Tg7MnGnWo6Kgd29n4xGPvZzm6R3ZkB2aPEhKhRKbhJ/ly2HbNrPetSucdpqz8Uge73OzZ/3mAsqJ
FJfdxFYLmAfsBXYBL2Bmyi5IH+A3P9fNAg6QO7v2fqCKzXhE8nN3GgHwmVpenPcRPThk/an3ByKO
H3c2IAk7dhPbTEwCqgt0BLoAjwQoGwU8BCRBvqb0ltbxUzEzb8cAsZjJjUWK7/jx3Ieyq1SBG290
Nh7J5yDRfEQPAGoAMStWOBuQhB07ia0JcDkwCjgCbAKeBoYEKP850Bl4jvyJrQOwBjTroJSwr76C
3bvNevfuEB3tbDzil3dz5GkLFzoYiYQjO4mtFbAH2O61LxWoj6lt+boFuB743c+xDphmx5XATmAp
0MlGLCL+qTdkSFhEV/ZYHxunLlkCBw86G5CEFTuJLQbw/e07ZP3r72vxXwW81iFgBdADaAh8DCwC
GtmIRySvI0dg7lyzHhsL117rbDwS0HFOYbb1sHaFI0fg448djkjCiZ3EdhCo6rPPvZ1l87ojgaHA
35hmzQnAFkwNT6R4PvkE9u836716QeXKzsYjBZqB1xeP9993LhAJOxVtlF2HuddbC9N8CKYTyFbs
J7ZxwGzgZ699lcitAeaTkJBAnM9cWvHx8cSr15u4vfde7rp+L4Lecs5jK9AAYOFCyMiAGjUcjkqC
RVJSEknePZyBzMzMIp1rJ7GlA8uBRGAYUBN4FHjHxmu4tQIuxfT2zcT0nowB5gY6ITExkXbt2hXj
UlIu7NoFn35q1uvVgy5dnI1HCuUikiRMbzSys01v1rvucjgqCRb+Ki4pKSm0b9++0HPtJDaAvsAr
mB6ROcBUTM9IMLW2YZju/d5c1uLtdkzz42qgGvAD5tGBoqVjEV//+5/5cAQYOBAqFPZ4pQSD97ES
G3DgjTdI69Ch0HNiYmJo2rRpqcYloc1uYtuJqWX5ExNg/1Rr8bYXuMPmtUUCm+r1K3bbbc7FITZs
YTWwHtOEE/3zz/Rv3z7faA7+pKWlKblJQBpSS0Lf+vWQnGzW27eHVq2cjUeKyHSynkruYxmDuBNI
LmCZDkBWlt3b+lKeKLFJ6PPuNKLaWsiZxmCyrZH5BvE5kbQF2gVYWjgVpoQQJTYJbSdOwHTzLZ6K
FdUbMgRtpyYL6QaYCUivZLHDEUmoU2KT0Pb11/CXNRbAdddBzZrOxiPFMoXBnvXbmexcIBIWlNgk
tHl3Ghk0yLk45KTMpzsZmOmFevMhsexzOCIJZXZ7RYoEj717yZkzh0ggOzaWtfXq4UpJKfCU1NTU
solNbDlGJWZwCyN4mSocYQAzeYthToclIUqJTULWzokTqXX0KACv7N/PPztpHO1QNoXBjOBlwDRH
KrFJcSmxSWhyuYjxGm7nLWYBZxfhxE+Bx0orKjkJP3E+q2lDW9bQiRWcQyq/qBekFIMSmwSV9PT0
Ij2jVHXtWs75zTzK+y1t2UC/Il5BTZHBK4LJ3E4i/wRgKG/xf0x0OCYJRUpsEjTS09Np1qxZkcq+
A5xjrU+iV6nFJGVrGrfyHKOpzFEGM4VHGMcRqjgdloQY9YqUoJFbU5tOQaNPxLKEAZgpaTLBM6+X
hL491GCWNWrfaeylP7McjkhCkRKbBKEWBB55oh03s4FqHAFMCjysb/Rh5XXu8azfzRsORiKhSolN
QoyLYUzybL3lYCRSOlZwEatpA0AnVtA2z7SNIoVTYpOQcgGrON/6oPuBs1njcDxSGiJ4g7s9W6q1
iV1KbBJS7reecwKYxJUORiKlaToDySIagFuYQTQazV+KTolNQkYtdjCAmQBkcBpJ6IHscHWAGGZw
CwAxHOAWZjgckYQSu4mtFjAPM1HoLuAFoLCpivuA37kDRwFbgQPAYqBo/byl3BrGJCpxDIC3GcJh
KjkckZSmN7nLs34vrwIu54KRkGI3sc0E9gN1gY5AF+CRAGWjgIeAJCDC59gg4H7gH0ANTD/uBRSe
JKWciuIY9/A6ACeI5DWGOxyRlLafOZ/vrFp5a9ZxNV85HJGECjuJrQlwOaamdQTYBDwNDAlQ/nOg
M/Ac+RPbUOBV4BfgKDAaqG29vkg+vfmQevwNwDx6soUzHY5IysIL1igkAA9qFBIpIjuJrRWwB9ju
tS8VqA/E+il/C3A98LufYy2BtV7b2UA60NpGPFKOjOAlz/rL3O9gJFKW5tKLP6wvMdfxGeewyeGI
JBTYSWwxwEGffYesf6P9lP+rGK9VzUY8Uk505Acu5nsA1tCaparYlxsnqJjni8wDJBVQWsSwk9gO
AlV99rm37fbFDfRa6tMr+YziP571F3mA/C3bEs7eZoin6/9tLLCmIxUJzM4gyOswHT1qATutfS0x
PRvtJqR1wLmYOUTAdDRpau33KyEhgbi4uDz74uPjiY+Pt3lpCSXN2Egv5gLwF3WZzkCHI5Kytp9T
eYc7SeBFqnLU69FtCWdJSUkkJeWtoWdmZhbpXDuJLR1YDiQCw4CawKOYgdbtehd4ClgEbATGYe7d
LQt0QmJiIu3atSvGpSSUjeS/RFrdvBNJ4Ji6+JdLLzGC+3mZCuQwAvjryBGnQ5JS5q/ikpKSQvv2
7Qs91+60NX2BVzA9InOAqZiekWBqbcMgXyO4i/wPoLwLxAEfYhLkSkxHkxM245EwVoe/uY33ANhH
bJ7nmqR82cRZzKEvA5hFbWDLm2+SUrlykc6NiYmhadOmpRugBBW7iW0nWHNK5BcTYP9Ua/E10VpE
/HqAFz0PZL/B3eznVIcjEif9mzEMsKaxqf3eezR57z2OF/HctLQ0JbdyRBONSlA6lUzPA9lHOYVE
EhyOSJy2hrYs4Dxu4GcaAgN5nMn0KOSsVGBgkWZll/ChxCZBKYFETmU/AO9xG9up63BEEgzG0YMb
rNkdRpPEVB4nRwMWiQ8NgixBJ479/JMXADhORf7NGIcjkmCxgqZ8ba03I52+zHE0HglOSmwSdB5k
uqe2NoXB/EFjhyOSYPJvr/UneIJI9TkTH0psElSqAw/wP8DU1sYFHGNbyquvgOW0BaAFvzCQ6c4G
JEFHiU2Cyv8BsdZoa+9wJ5tp5Gg8EpzGcJ9n/UnGcgpHHYxGgo0SmwSNirt384C1fowo3VuTgL6h
HQvpCkAjNjOUtxyOSIKJEpsEjbqTJnlG057EMLbS0NF4JLg9wjjP+qM8Q9V846pLeaXEJsFhwwZO
n2vGhNxPNZ7icYcDkmCXQntm0xeAOuzw9KQVUWKT4PCvfxGRkwPAswxmF7UcDkhCweM8Rbb1HNto
nqMe2xyOSIKBEps478sv4VMz0cNWIJGbnY1HQsYvtOANa7z/aA7yLA87HJEEAyU2cVZ2Nowc6dkc
AxyhaIPbigCM5Un2UB2A25jGhaxwOCJxmhKbOOuVV2D1agAONW/ODIfDkdCzhxo8zlOe7UQSiCDH
wYjEaUps4pxt2+CxxzybW0ePzje/kUhRvMHdrKMVABfxA4OZ4mxA4iglNnHOP/8JBw6Y9WHDONim
jbPxSMg6QUUSSPRs/5eR1GKHgxGJk5TYxBmLFsHs2Wa9Zk149lln45GQ9xVdmGF1PDqNvbzoedxf
yhu7ia0WMA/YC+wCXoCAc0ZcB6wFDgIbMDNke183Czhg/ZsF7Aeq2IxHQlFWFtx9d+7288/Daac5
F4+EjQQS2U0NAG5iJtezzOGIxAl2E9tMTAKqC3QEuoDfUWqbAnOsYzHAWGA20MQ63hKIAk61jscA
scBhm/FIKHrwQfjjD7N++eVw222OhiPhYzc18zyo/TrPEeNgPOIMO4mtCXA5MAo4AmwCngaG+Ck7
CFgGfAzkYJLaEsD9CdYBWAOab6Lc+eQTePtts16tGkyeDBERzsYkYWU6A1nENQA0YAcvOxyPlD07
ia0VsAfY7rUvFaiPqW35ll3rs28D0Npa74BpdlwJ7ASWAp1sxCKhKCMDhnh9D5o4ERprrjUpaRHc
xZvst+pqg4DqixY5G5KUKTuJLQbyjTJ6yPo32md/tJ+yh73KHQJWAD2Ahpia3SLQHCVhy+WCu+6C
7db3omuvhaFDnY1JwtZmGjGc1zzbDf7979zmbwl7FW2UPQhU9dnn3s7yU7aan7L7rfWRPscmALdj
Opi8aiMmCWLp6elkZZlfjZr/+x8NPvgAgOzYWFIfeIDjP/2Up3xqamqZxyjhawYDuZYZ3MJCKh44
AAMHwpIlUNHOx56EIjv/w+uAGpiekTutfS0xw/v5JrZ1QDuffS0xTY8A4zD33X72Ol6J3BpgPgkJ
CcTFxeXZFx8fT3x8fNF/Aikz6enpNGvWDDDtzsu9jvXev5/53bo5EpeUL8MZzcUspDHAt9/CQw/B
hAlOhyVFkJSURFJSUp59mZmZRTrXTmJLx3w+JQLDgJrAo8A7fspOAx4E+gFzgd6Yjif3W8dbAZcC
/YFM4CFMU+fcQBdPTEykXTvfXCnBylNT41Vm8zSnWLdmn+dW5pMQ4KxPgccCHBOxbz8x3Ax8V6EC
ESdOmPu6559vam8S1PxVXFJSUmjfvn2h59qtk/cFXsH0iMwBpmJ6RoKptQ0DkoCNQE9gPCbx/YFJ
br9aZW/HND+uxjRZ/oB5dKBo6VhCQiVgLpM400pq33IxY3gH86SHP2qKlJK3AvjxttvoOHkyADlD
hrAxIoLDLVr4LR8TE0PTpk3LMEIpaXYT205MLcsf38dFPrcWf/YCd9i8toQSl4tJwCWYAY7/5Az6
MZvsgElNpDRsAeDCyZN5E/PNO/LoUaIHDqQL8FeAs9LS0pTcQpiG1JJSUfeNNzwPLR6iCjfyMX9T
z9GYpDxyd86ezv18z3eY8UgbAAs5mzgWA8ley3QgtyldQpMSm5S8F1+krvshbOA23uOnfH2JRMpS
C45xEb1ZxG+cBUBrfmM+j1KFczB93doB/psnJbQosUnJmjIFEnI7h4xgJB/Q17l4RLzsoA7X8Dk7
qAXApXzLbPpxCkcdjkxKkhKblJw33oDbb/dsPgm8jB7HkODyO2fTjYWekUmu51M+5kaqBH7aSEKM
nlSUIvN+4NpXrRkzqD9xomf7l65deULDGEmQ+pnzuZGP+YTrqcYhuvI5n3A9N/IUB5wOTk6aEpsU
ifcD194igGeAMV77xgOjldQkyC3lCrqyiE+5jliyuJIlfMU99HA6MDlpaoqUIsmtqU3H3YOsKsuZ
zVV5ktrj3MVoVpH7eKNI8PqWS7mar9hDdQA6sp6VQJVffnE2MDkpSmxiUwugHQ2pwTJG0IevAThB
JCN4kad5A2gPaNR+CQ2r6MDlLGULDQDzKECzO++EOXOcDUyKTYlNbOvHLFbTlvakAGbYohtYwMuM
cDgykeJZR2s6spLvrZm1Khw5Av36mZneD6lTSahRYpMiiwXe4ilmMYA49gHwG2fRie9ZyLXOBidy
knZQhyt5k2neO998Ezp0AJ+ZKCS4KbFJ4Vwu4r74glRgCB95dr9PPO1IYQOtnItNpAQdpRK3AZsf
ewyqWrNybdhgktv//R8cUJ/JUKBekVKwdetg1CjO+uwzz64DVONeXuU9bsP0ixQJL8ubN+fAe+/R
eMwYqqalgTUzwLEZM9h2//3s7doVInPrBRo4ObgosYl/f/wBY8fCtGlm9mvLfC7jPqaxhTOdi02k
1JhBkwda09pEYWZFfgyoApyyYweNH32UfY8+yhjgM68zNXBy8FBTpOSVkgI33wxNmsB773mS2rFa
tegN3MgLSmoSxnIHTYZkjpPMsyRzLvNYSCdPqfMwswem0JybuYeKaODkYKIaW5goaFQQf/I0nWRl
wezZMHkyLF+et2D16vDww6y/5BLmXnIJanqU8sE81uL2O+24lh5czZc8x2guIBmA89nIDDYyHqjw
2mtmhm7V2hynxBYGAo0KUpBqQNorr1BvxQr48MP8XZpPPx3uvdcMaBwXhyslpeQCFglRX9GFDvxI
bz5kNM/RgVUA1Ad45x2zXHwx3HQTdO8OjRo5GW65ZbcpshYwDzNR6C7gBaBCgLLXAWsxdfsNwPU+
x0cBW4EDwGLA3idzkEhKSnI6BL+jgvguFfiB9kwjgQf5jNZkAPXuuw+mT8+b1Fq0MIMZb9kCTzwB
cXGlFLXz71vo0XsWHCL4kD50ZCWdWco8Lifb+/B338GIEdC4MbRuDaNHw6efQmamUwHbFgyfayfD
bo1tJiYZ1bWWj4FHgKd8yjUF5gA3AQuAPsBsoA3wKzAIuB/4B7AJGGeVawGcKMbP4ZikpCTi4wOP
YL9p0yY+++yzgMf9qVatGrfccgsVK9r97zHNJxXIpinptGYtbVjDhfxAJ74n2nP/wEf16hAfD4MG
mW7NEWXR3JgEGvnfJr1nwSWCb+jMN0ykNu1ZlZBA/S+/ND2J3datM8v48ebvqnVruOQSOO88aNsW
zj0XqlVz7kcIoLDPtWBn55OzCXA5UA84gklITwP/JX9iGwQswyQ+MEntduA24HFgKPAq4B6QbbS1
73KwxmgKE88//zyvv/46ERFRRTwjB5frBC1btqRDhw4BiuTA3r3w99/wxx/U/OYbngcaMYqzyaAF
qVQuZH6prUDlvn2peccdcNVVUKmSnR9LRLzsAHbeequZ4WLdOpg/Hz7+GFauzO1V7HLBmjVmcYuI
MDW7Jk3grLNylwYNoHZts1Su7MjPFMrsJLZWwB5gu9e+VEzzciyw36fsWp/zNwDnWustgWe9jmUD
6UBrQjmxuX+BT5yA48fh2DEqHzhA/QrnEXHiI07hGFEc9yzu7UocJZoDxJBFNOlE8wx1X3vNNAMe
OAD798OuXbBzp/k3I8Ncw9IA0yUZvgoY2jbq8Q2XsZxLWUZN1nITyQ8/TM12mtlapMS4a2WtW8OY
MbBjByxdajplffMNrF6d5/EZXC74/XezBBIbm5vkTjsNTj3V7PNdqlQxX1ArVzb/ei/ufVFRUKGC
WSIj86+XSWtN6bOT2GIgX1uW++ZMNHkTW7Sfsoet/QW9VuA6edeu5j8FzC+D97egk10/2fML+GWY
aC3Y7SI/ZYq98pYTRJJGM9bS2rP8zHls5kxyezSqI4hImahdG/r3NwvAvn3w88+5Nbc1a8zIJgWN
aLJ/v1nS00s/3ogIk+RyckyidCe+iIjczznvz7uyXj92rEg/hp3EdhCo6rPPve3bz/wg+ZNUVa9y
gV4rYH/11N27ixxoWcqk7NJETlQUJ2JiyI6NJTsmhhOnnsrxmjX5G3hl7lz+5kF20obsPP+tB4Fv
rcVtEwCffvopqampRbr2pk2brLVPMRX1wrivF6j8n8AMm+fYvUZJnBNMMbnfs2D8ucPlGsWJyfxt
FPVviZgYc5/tkkvMtstlOpZs22aWP/+E3bvNsmePaaHZswcOBrhHXpJcLjhxwnyuHTlS+tezqaj/
I3Y0BXIwPSPdBgCb/ZR9BvOb4e0z4ElrfTmmV6RbFLAPuNLPa9XFNGO6tGjRokVLuV82YPJCQHYb
VJdhvjYOA2piOofMJn/nkebAT5hOJHOB3sAUcntF3mGdcz2wEdMr8gbMvTd/vSLdvTBFRKR8+9ta
SkwtYBbmGbYdwH/ITY5Z5O2LfA0mue0H1gDdfF7rQeA36/iXmF6XIiIiIiIiIiIiIlIk0zBDhEnB
GgEfAjsxTdtzrX2Sn52h7MRoC3wBZGCevZ0K1HA0otBSAVgCTHY4jmLRtDUl6w7MfUaX04GEgHnA
bswDfo0wH0AfF3RCOTYTcy+6LtAR6IIZyk78q4Lphb0cqI3plFaDEP2QdshY4FL0WVbutQR+B15H
NbbCVMc8DlLba18bzOMk+ladVxPM+1LHa19/3DNiij/NgU/I2+v7RsyA61K4qzAjR80kRL8MaNqa
oqmMNTOFH39Z//4PuBvoBJxTFkEFucLes+t89vXFfFhnlGZQIcjOUHZibCT/bCJ90ZA7RVEbeBvo
gem5HpKU2IrmIvyPYekCa2JpWAR8DlxchnEFs4Les17kbXa8C/g/oHsZxBVq7AxlJ/49g0l0nZ0O
JMhFYvoITCB3rN+QbIpUYiuaJQS+H3kLphlNCS2vJRR+D/cUTEeIAZga3NJSjikU2RnKTvKKxTSl
nY9JauudDSfoPYz50vSqtR0eIyJLsSzEfGveay2HgeOY5qNATXECpwPfA6uwPUJ0uWJnKDvJdTam
SXIRcJrDsYSKVMzQhu7PsqPWssfJoCQ4jEWdRwoThZna+zPMvTgp2DLgfUzTY2NMM9HjjkYU3Kpj
Ev87qNZxMiYD7zodRHGou3/pCMl26TLUndzmoV2YJrUsTM1Xtdz8+mJuG2wCVmC+EDztaETB7XbM
NIUDML9T3r9fIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIuXWQ5jp
Q3Ks5QVr/y1e+zYC3RyJTkREpJheALIx84qBmYnjF6CLYxGJiIichArAN0AKUAkz/5qSmoiIhLQz
gJ2YiWsf9nN8PrlNlSJi0USjIsFrGzAKuBzY6uf4MkyNTkREJCRUAWYBEzGzPzdzNhwREZGT8yrQ
CtOyshhYDVS2jlUHLgHaOhOaiIhI0UUBzwGvee2rBxwEJlvb5wNLvbZFRESC0kRMh5EcYDemORJg
pLXvBJCGSXy3o8QmIiJhZDBKbCL5qFekiIiEFSU2kdDlcjoAkWCkxCYSuiKcDkBERKSkdMM8nL0N
GO5wLCIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIuHv/wErkaV0
8SVHCQAAAABJRU5ErkJggg==
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
<div class="prompt input_prompt">In&nbsp;[23]:</div>
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
<span class="n">plt</span><span class="o">.</span><span class="n">xlim</span><span class="p">(</span><span class="o">-</span><span class="mi">5</span><span class="p">,</span><span class="mi">14</span><span class="p">)</span>
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
dpaz4YR9+dMVM85gO6Yymu9oNMcaC7TDzAIERyvJwzEt407agDkfvRwt+8LlPIWa64cVhF853WzK
vqrR5tMxB01r4CPMbU5Vd4uAtzC3bsJpNoGmpgOmALobk7g6Acsws0eo+qneOtESU4jehqmEnNQj
+tUJLQC+wlQC44A3MS3i4caJPvO18QCpwH849mLIaeFa/iRiLnZeJTwqoCfyGuEzm40b073rPcxd
6TaYsY3/cjKoatpiypQJmO5KXTBjXaY6GVSlZlv29cX0T8zHTOEzCx1wWF9JwD8xtztzMbMDNYXk
FY5+DizBnHC5hMfctU1R9YQGphVxMeZzzQDGORGUCgvxmJlisjHHwweYFspwM4nwmpryKsx5dYRj
n4NxCNMQ4ZRwLX/uxHxehXz/8wpH4VSZB1NhfhvT4JqPiS+cBjUPwDQM5GPuvDxEePRK0bJPKaWU
UkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJK
KaWUUkoppZRSSimllFJKKaWUUkopdSJ3AxmADbxQuW5O5c9LgBSH4lJKKRV6mvOVUuokFA9kAr+v
/PkG4HfOhaOUUqoBac5XSqmT0FDgAPBj4FGHY1FKKdWwNOcrpdRJ6B9APhDndCBKKaUanOZ81aS5
nA5AqTCUDhQA46qtiwV2ATGORKSUUqqhaM5XSqmTSA/MwKgfYW69dqn2uw6ORKSUUqqhaM5XSqmT
SEvgE47esXoU+AqIALoDlwHRzoSmlFIqxDTnK6XUSWQqsBcoBs6sXPcp4AdWYmY5yAA6ORKdUkqp
UNKcr5RSzZAPTexKKdVcaM5XTYIOgFVKKaWUUqqJ0sq8UvVjOR2AUkqpRqM5X4U9rcwrVTcXAV2B
650ORCmlVIPTnK+UUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWU
UkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppU5+/w8UEN41
gV7GUgAAAABJRU5ErkJggg==
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
 

