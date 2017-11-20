
{% include mathjax.html %}

---
layout: post
mathjax: true
comments: true
title:  "Adding MathJax to a GitHub Pages Jekyll Blog"
date:   2016-08-21 23:41:54 +0000
categories: github jekyll
---


<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[9]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="o">%</span><span class="k">matplotlib</span> inline

<span class="kn">import</span> <span class="nn">os</span>
<span class="kn">import</span> <span class="nn">sys</span>
<span class="n">path</span> <span class="o">=</span> <span class="s1">&#39;/home/nico/Dropbox/scripts/&#39;</span>
<span class="n">sys</span><span class="o">.</span><span class="n">path</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">os</span><span class="o">.</span><span class="n">path</span><span class="o">.</span><span class="n">abspath</span><span class="p">(</span><span class="n">path</span><span class="p">))</span>
<span class="kn">from</span> <span class="nn">functions</span> <span class="kn">import</span> <span class="n">ReadFile</span><span class="p">,</span> <span class="n">Plot</span><span class="p">,</span> <span class="n">phase_LC_plot</span><span class="p">,</span> <span class="n">Readlc</span><span class="p">,</span> <span class="n">var_non_regular</span><span class="p">,</span> <span class="n">Do_IP_metric</span><span class="p">,</span> <span class="n">outliers</span>
<span class="kn">import</span> <span class="nn">matplotlib.pyplot</span> <span class="kn">as</span> <span class="nn">plt</span>

<span class="kn">import</span> <span class="nn">numpy</span> <span class="kn">as</span> <span class="nn">np</span>
<span class="kn">from</span> <span class="nn">scipy</span> <span class="kn">import</span> <span class="n">stats</span>
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
<h1 id="Distribuci&#243;n-gaussiana-en-Python">Distribuci&#243;n gaussiana en Python<a class="anchor-link" href="#Distribuci&#243;n-gaussiana-en-Python">&#182;</a></h1>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Una de las <a href="https://es.wikipedia.org/wiki/Distribuci%C3%B3n_de_probabilidad">distribuciones de probabilidad</a> más importantes en la rama de la estadistica es llamada Distribución normal o Distribución gaussiana. La importancia de éstas recae en la variedad de fenomenos que son capaces de modelar. Variados ejemplos se pueden encontrar de analisis y estudios hechos en base al entendimiento de muchos datos usando esta distribución Gaussiana. De hecho, el comportamiento que describe esta distribución es base importante del llamado 'Machine Learning'.</p>

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
$$f(X\ |\ \mu,\sigma)=\displaystyle \frac{1}{\sqrt{2\pi \sigma^{2}}} \ e^{-\frac{1}{2}\left(\frac{X-\mu}{\sigma}\right)^{2}}$$<p>Aquí, $\mu$ y $\sigma$ son la media y desviación estándar del set de datos $X$. Estos parámetros pueden ser interpretados como...</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[10]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="k">def</span> <span class="nf">Gaussiana</span><span class="p">(</span><span class="n">Distribucion</span><span class="p">,</span><span class="n">media</span><span class="p">,</span><span class="n">sigma</span><span class="p">):</span>
    <span class="k">return</span> <span class="p">(</span><span class="mi">1</span><span class="o">/</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">sqrt</span><span class="p">(</span><span class="mi">2</span><span class="o">*</span><span class="n">np</span><span class="o">.</span><span class="n">pi</span><span class="p">)</span><span class="o">*</span><span class="n">sigma</span><span class="o">**</span><span class="mi">2</span><span class="p">))</span><span class="o">*</span><span class="n">np</span><span class="o">.</span><span class="n">exp</span><span class="p">(</span><span class="o">-</span><span class="mf">0.5</span><span class="o">*</span><span class="p">((</span><span class="n">Distribucion</span> <span class="o">-</span> <span class="n">media</span><span class="p">)</span><span class="o">/</span><span class="n">sigma</span><span class="p">)</span><span class="o">**</span><span class="mi">2</span><span class="p">)</span>
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
<p>Entonces, si definimos fijamos los valores de prueba $\mu=0$ y $\sigma=1$ sobre un rango arbitrario $x_{i}$ que esté centrado en $\mu$:</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[47]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="n">media</span><span class="o">=</span><span class="mi">0</span>
<span class="n">sigma</span><span class="o">=</span><span class="mi">1</span>

<span class="n">xi</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">linspace</span><span class="p">(</span><span class="o">-</span><span class="mi">10</span><span class="p">,</span><span class="mi">10</span><span class="p">,</span><span class="mi">1000</span><span class="p">)</span>

<span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span><span class="mi">3</span><span class="p">))</span>
<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">Gaussiana</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">media</span><span class="p">,</span><span class="n">sigma</span><span class="p">),</span><span class="s1">&#39;-&#39;</span><span class="p">,</span><span class="n">color</span><span class="o">=</span><span class="s1">&#39;red&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mi">1</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="s1">&#39;Gaussian fit&#39;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">(</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;best&#39;</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">10</span><span class="p">,</span> <span class="n">frameon</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>
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
AAAAAElFTkSuQmCC
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
<p>Podemos estudiar cómo cada uno de esos parámetros afecta a la función $\mathtt{Gaussiana}$. Para cada caso, dejaremos uno de los parámetros fijo y variaremos el otro. En primer lugar, fijaremos $\sigma=1$ y evaluaremos La Funcion gaussiana con $\mu=[0,2,4,6]$, Ahora, fijaremos $\mu=0$ y evaluaremos La Funcion gaussiana con $\sigma=[1,1.5,2,3]$:</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[59]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="n">sigma</span><span class="o">=</span><span class="mi">1</span>
<span class="n">media</span><span class="o">=</span><span class="p">[</span><span class="mi">0</span><span class="p">,</span><span class="mi">2</span><span class="p">,</span><span class="mi">4</span><span class="p">,</span><span class="mi">6</span><span class="p">]</span>

<span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">10</span><span class="p">,</span><span class="mi">3</span><span class="p">))</span>

<span class="n">plt</span><span class="o">.</span><span class="n">subplot</span><span class="p">(</span><span class="mi">121</span><span class="p">)</span>

<span class="k">for</span> <span class="n">media_i</span> <span class="ow">in</span> <span class="n">media</span><span class="p">:</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">Gaussiana</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">media_i</span><span class="p">,</span><span class="n">sigma</span><span class="p">),</span><span class="s1">&#39;-&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mi">1</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="s1">r&#39;$\mu = </span><span class="si">%0.1f</span><span class="s1">$&#39;</span> <span class="o">%</span><span class="k">media_i</span>)
    
<span class="c1">#plt.axvline(0,color=&#39;black&#39;,label=r&#39;$\mu=0$&#39;)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">title</span><span class="p">(</span><span class="s1">r&#39;$\sigma=1$&#39;</span><span class="p">,</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">15</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">(</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;best&#39;</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">15</span><span class="p">,</span> <span class="n">frameon</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>  


<span class="n">plt</span><span class="o">.</span><span class="n">subplot</span><span class="p">(</span><span class="mi">122</span><span class="p">)</span>

<span class="n">media</span><span class="o">=</span><span class="mi">0</span>
<span class="n">sigma</span><span class="o">=</span><span class="p">[</span><span class="mi">1</span><span class="p">,</span><span class="mf">1.5</span><span class="p">,</span><span class="mi">2</span><span class="p">,</span><span class="mi">3</span><span class="p">]</span>

<span class="k">for</span> <span class="n">sigma_i</span> <span class="ow">in</span> <span class="n">sigma</span><span class="p">:</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">Gaussiana</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">media</span><span class="p">,</span><span class="n">sigma_i</span><span class="p">),</span><span class="s1">&#39;-&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mi">1</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="s1">r&#39;$\sigma = </span><span class="si">%0.1f</span><span class="s1">$&#39;</span> <span class="o">%</span><span class="k">sigma_i</span>)

<span class="n">plt</span><span class="o">.</span><span class="n">title</span><span class="p">(</span><span class="s1">r&#39;$\mu=0$&#39;</span><span class="p">,</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">15</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">(</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;best&#39;</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">15</span><span class="p">,</span> <span class="n">frameon</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>  

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
KIpydvx/fSR62MBlhUEAAAAASUVORK5CYII=
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
<p>Podemos ver que cuando $\mu$ cambia, la forma de la curva se mantiene, pero se desplazael parámetro</p>

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
 

