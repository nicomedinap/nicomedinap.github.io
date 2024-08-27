---
layout: post
mathjax: true
title:  "Modelo de agentes activos de Vicsek"
---

{% include mathjax.html %}

<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">

<p>Hace algunos meses me enteré de la existencia del <a href="https://activematter.dfi.uchile.cl" target="_blank">Núcleo Milenio de Materia Activa</a>, el cual se especializa en el estudio de la dinámica de un gran número de miembros o &quot;agentes&quot;, los cuales son unidades independientes que interaccionan con otros agentes vecinos a través de reglas simples y empíricas, por lo menos en sus fundamentos. De esta forma es posible describir el movimiento espontáneo y coherente de ciertos sistemas biológicos, como las bandadas de los pájaros. En el año 1995, el Biólogo físico Tamás Vicsek publicó un estudio llamado <a href="https://arxiv.org/pdf/cond-mat/0611743.pdf" target="_blank">NOVEL TYPE OF PHASE TRANSITION IN A SYSTEM OF SELF-DRIVEN PARTICLES</a> donde describe un modelo para describir el movimiento coherente de los cardúmenes y de las bandadas de pájaros en el vuelo.</p>
<p><a href="https://es.wikipedia.org/wiki/Materia_activa" target="_blank">wikipedia</a> lo describe de la siguiente forma:</p>
<pre><code>La materia activa está compuesta de un gran número de «agentes activos», cada uno de los cuales consume energía para moverse o para ejercer fuerzas mecánicas. Debido al consumo de energía, estos sistemas están intrínsecamente fuera de equilibrio térmico. Ejemplos de materia activa son los bancos de peces, bandadas de aves, bacterias, partículas autopropulsadas artificiales, y la auto-organización de los bio-polímeros tales como los microtúbulos y la actina, siendo parte ambos del citoesqueleto de las células vivas. La mayoría de los ejemplos de materia activa son de origen biológico; sin embargo, una gran cantidad del trabajo experimental está dedicado a los sistemas sintéticos.

</code></pre>
<p>Sin duda es una definición muy interesante, tomada o inspirada desde la mecánica estadística y aplicada elegántemente en los sistemas complejos biológicos fuera de equilibrio.</p>
<p>El <a href="https://es.wikipedia.org/wiki/Modelo_de_Vicsek" target="_blank">modelo de Vicsek</a> pretende cuantificar matemáticamente la interacción de un miembro del grupo, considerando su vecindad dentro de un rango o distancia de interacción. En este caso, para cada pájaro dentro de la bandada tanto como su posición, velocidad y ángulo del camino serán determinadas por la cantidad de vecinos dentro de una distancia particular, y con eso se creará la &quot;materia activa&quot;, generando dichas estructuras coherentes o &quot;materia blanda&quot; que se observan en muchas configuraciones a nuestro alrededor.</p>
<p>Dado que el sistema describe la evolución temporal de cada pájaro miembro de la bandada, dada su posición inicial $\vec{r}(t=0)$ o en cualquier momento $\vec{r}(t)$, la posición cambiará en el siguiente instante $t + \Delta t$ siguiendo la ecuación itinerario (considerando la aceleración $\vec{a}=\vec{0}$):</p>
$$
{\displaystyle \vec{r}(t+\Delta t)=\vec{r}(t)+\vec{v}(\theta) \Delta t},
$$<p>donde la velocidad $\vec{v}(\theta) = v_0 \left( \cos(\theta)\ \hat{i} + \sin(\theta)\ \hat{j}\right)$ es constante para cada individuo, y la dirección dependerá completamente del ángulo $\theta(t)$, la que a su vez es definida por los agentes en la vecindad local, la que en instante siguiente $t + \Delta t$ es definido de la forma:</p>
$$
{\displaystyle \theta(t+\Delta t)=\langle \theta \rangle _{|r_{i}-r_{j}|&lt;R}+\eta\ (t)},
$$<p>donde $\langle \theta \rangle$ representa el valor promedio de todas las direcciones del movimiento de cada vecino dentro del radio de acción ${|r_{i}-r_{j}|&lt;R}$. En la siguiente imagen se grafica la configuración y la cuantificación matemática del modelo de materia activa. El agente azul se está moviendo hacia la izquierda, y su dirección se modificará teniendo en cuenta los agentes dentro de la circunferencia al rededor del agente azul.</p>
<figure align="center">
<img src="https://i.ytimg.com/vi/tsItaRGm62k/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLArM8mj1Ktgy1fks1fGFMOhtxpyyA" width="400" height="250">
<figcaption align="center"><b>Imagen 1</b>: Planteamento del modelo matemático del Vicsek. El agente central azul es influenciado por cada uno de los agentes cercanos (agentes verdes), y su cercanía es cuantificada por la circunferencia de radio $R$. Imagen tomada desde un frame de un video de youtube (ver referencias).
</figcaption>
</figure>
<p>El ángulo de cada ave dentro del círculo es considerado y el valor promedio del ángulo es obtenido de la forma:</p>
$$
\displaystyle \langle \theta \rangle = \arctan{ \left( \frac{\sum_{k=1}^{N} \sin{(\theta_k)} }{\sum_{k=1}^{N} \cos{(\theta_k)}} \right) }
$$<p>Además, el término $\eta\ (t)$ agrega una perturbación aleatoria en la dirección de movimiento, para así incluir algo de realismo al modelo. Todo lo anterior debe ser calculado para cada uno de los pájaros dentro de la bandada, por lo que la complejidad de este modelo recae en el poder de cómputo disponible para calcular cada uno de los anteriores parámetros a través de todos los momentos (o épocas) necesarios para ver la evolución temporal de la bandada.</p>
<p>Todo el procedimiento anterior es explicado a continuación en forma de pseudo-algoritmo de la ejecución del modelo de Vicsek:</p>
<p>Para cada uno de los pájaros dentro de la bandada:</p>
<ol>
<li>Definir de forma aleatoria las posiciones $\vec{r}_i=(x,y)$ y el angulo inicial $\theta_i$.</li>
<li>Contamos cuántos vecinos están alrededor, dentro del radio $R$, y sus ángulos son considerados.</li>
<li>Calculamos el valor promedio de los ángulos $\langle \theta \rangle$.</li>
<li>Actualizamos la dirección de la la velocidad $\vec{v}$ utilizando el nuevo ángulo $\langle \theta \rangle$.</li>
<li>Agregamos el término de perturbación random $\eta$.</li>
<li>Finalmente, actualizamos la posición de cada pájaro usando la ecuación itinerario en el instante $t + \Delta t$.</li>
<li>Repetir por cada época deseada.</li>
</ol>
<p>Todo lo anterior es implementado en el siguiente script de python, usando como base la implementación de Philip Mocz (ver referencias). Para la siguiente simulación, se considerará una bandada de 3000 pájaros, en 200 épocas que se diferencian entre ellas por un tiempo $\Delta t=0.01$ segundos. No se diga más.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">

<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span>
<span class="kn">import</span> <span class="nn">matplotlib.pyplot</span> <span class="k">as</span> <span class="nn">plt</span>
<span class="kn">from</span> <span class="nn">matplotlib</span> <span class="kn">import</span> <span class="n">animation</span>
<span class="kn">import</span> <span class="nn">sys</span>
<span class="n">plt</span><span class="o">.</span><span class="n">style</span><span class="o">.</span><span class="n">use</span><span class="p">(</span><span class="s1">&#39;dark_background&#39;</span><span class="p">)</span>

<span class="c1">#Parámetros básico del modelo de Vicsek</span>
<span class="c1">#velocidad inicial:</span>
<span class="n">v0</span> <span class="o">=</span> <span class="mf">2.0</span>
<span class="c1">#Número de pájaros:</span>
<span class="n">N</span> <span class="o">=</span> <span class="mi">3000</span>
<span class="c1">#Parámetro de ruido angular:</span>
<span class="n">eta</span> <span class="o">=</span> <span class="mf">0.9</span>       
<span class="c1">#Tamaño de la caja:</span>
<span class="n">Lx</span> <span class="o">=</span> <span class="mi">4</span>           
<span class="n">Ly</span> <span class="o">=</span> <span class="mi">5</span>
<span class="c1">#Radio de interacción:</span>
<span class="n">R</span>  <span class="o">=</span> <span class="mf">0.1</span>        
<span class="c1">#paso temporal Delta t:</span>
<span class="n">dt</span> <span class="o">=</span> <span class="mf">0.01</span>
<span class="n">Dt</span><span class="o">=</span><span class="n">dt</span>
<span class="c1">#Número de épocas:</span>
<span class="n">Nt</span> <span class="o">=</span> <span class="mi">200</span>     

<span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">seed</span><span class="p">(</span><span class="n">N</span><span class="p">)</span>

<span class="c1">#Se eligen las posiciones y velocidades de forma random:</span>
<span class="n">x</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">rand</span><span class="p">(</span><span class="n">N</span><span class="p">)</span><span class="o">*</span><span class="n">Lx</span>
<span class="n">y</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">rand</span><span class="p">(</span><span class="n">N</span><span class="p">)</span><span class="o">*</span><span class="n">Ly</span>
<span class="n">v_init</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">rand</span><span class="p">(</span><span class="n">N</span><span class="p">)</span><span class="o">*</span><span class="n">v0</span>
<span class="n">theta</span> <span class="o">=</span> <span class="mi">2</span><span class="o">*</span><span class="n">np</span><span class="o">.</span><span class="n">pi</span><span class="o">*</span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">rand</span><span class="p">(</span><span class="n">N</span><span class="p">)</span>

<span class="c1">#Calculamos las componentes individuales</span>
<span class="n">vx</span> <span class="o">=</span> <span class="n">v_init</span> <span class="o">*</span> <span class="n">np</span><span class="o">.</span><span class="n">cos</span><span class="p">(</span><span class="n">theta</span><span class="p">)</span>
<span class="n">vy</span> <span class="o">=</span> <span class="n">v_init</span> <span class="o">*</span> <span class="n">np</span><span class="o">.</span><span class="n">sin</span><span class="p">(</span><span class="n">theta</span><span class="p">)</span>

<span class="c1">#Iniciamos el plot y método quiver para visualizar:</span>
<span class="n">fig</span><span class="p">,</span> <span class="n">ax</span> <span class="o">=</span> <span class="n">plt</span><span class="o">.</span><span class="n">subplots</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">4</span><span class="p">,</span> <span class="mi">5</span><span class="p">),</span> <span class="n">dpi</span><span class="o">=</span><span class="mi">100</span><span class="p">)</span>
<span class="n">quiver</span> <span class="o">=</span> <span class="n">ax</span><span class="o">.</span><span class="n">quiver</span><span class="p">(</span><span class="n">x</span><span class="p">,</span> <span class="n">y</span><span class="p">,</span> <span class="n">vx</span><span class="p">,</span> <span class="n">vy</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s1">&#39;yellow&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mf">3.9</span><span class="p">,</span> <span class="n">headwidth</span><span class="o">=</span><span class="mi">10</span><span class="p">,</span> <span class="n">headlength</span><span class="o">=</span><span class="mi">10</span><span class="p">)</span>

<span class="c1">#Función para crear el video:</span>
<span class="k">def</span> <span class="nf">dibujar_plot</span><span class="p">(</span><span class="n">frame</span><span class="p">,</span> <span class="n">quiver</span><span class="p">):</span>
    <span class="c1">#Iniciamos los valores para modificiarlos:</span>
    <span class="k">global</span> <span class="n">x</span><span class="p">,</span> <span class="n">y</span><span class="p">,</span> <span class="n">Lx</span><span class="p">,</span> <span class="n">Ly</span><span class="p">,</span> <span class="n">theta</span><span class="p">,</span> <span class="n">vx</span><span class="p">,</span> <span class="n">vy</span><span class="p">,</span> <span class="n">Dt</span>
    
    <span class="c1">#Limpiamos el gráfico:</span>
    <span class="n">ax</span><span class="o">.</span><span class="n">clear</span><span class="p">()</span>
    <span class="n">ax</span><span class="o">.</span><span class="n">set_title</span><span class="p">(</span><span class="s1">&#39;Simulación del modelo Vicsek&#39;</span><span class="p">)</span>
    <span class="n">ax</span><span class="o">.</span><span class="n">set_xlim</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="n">Lx</span><span class="p">)</span>
    <span class="n">ax</span><span class="o">.</span><span class="n">set_ylim</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="n">Ly</span><span class="p">)</span>

    <span class="c1">#Actualizamos la posicion de cada integrante</span>
    <span class="n">x</span> <span class="o">+=</span> <span class="n">vx</span> <span class="o">*</span> <span class="n">dt</span>
    <span class="n">y</span> <span class="o">+=</span> <span class="n">vy</span> <span class="o">*</span> <span class="n">dt</span>

    <span class="c1">#Condiciones de borde periódicas:</span>
    <span class="c1">#(esto me voló la cabeza)</span>
    <span class="c1">#https://pythoninchemistry.org/sim_and_scat/important_considerations/pbc.html</span>
    <span class="n">x</span> <span class="o">=</span> <span class="n">x</span> <span class="o">%</span> <span class="n">Lx</span>
    <span class="n">y</span> <span class="o">=</span> <span class="n">y</span> <span class="o">%</span> <span class="n">Ly</span>

    <span class="c1">#Contamos cuántos agentes están dentro del radio R:</span>
    <span class="n">mean_theta</span> <span class="o">=</span> <span class="n">theta</span><span class="p">[:]</span>
        
    <span class="k">for</span> <span class="n">b</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">N</span><span class="p">):</span>
        <span class="n">neighbors</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">sqrt</span><span class="p">((</span><span class="n">x</span> <span class="o">-</span> <span class="n">x</span><span class="p">[</span><span class="n">b</span><span class="p">])</span><span class="o">**</span><span class="mi">2</span> <span class="o">+</span> <span class="p">(</span><span class="n">y</span> <span class="o">-</span> <span class="n">y</span><span class="p">[</span><span class="n">b</span><span class="p">])</span><span class="o">**</span><span class="mi">2</span><span class="p">)</span> <span class="o">&lt;</span> <span class="n">R</span>
        <span class="n">sx</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">mean</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">cos</span><span class="p">(</span><span class="n">theta</span><span class="p">[</span><span class="n">neighbors</span><span class="p">]))</span>
        <span class="n">sy</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">mean</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">sin</span><span class="p">(</span><span class="n">theta</span><span class="p">[</span><span class="n">neighbors</span><span class="p">]))</span>
        <span class="n">mean_theta</span><span class="p">[</span><span class="n">b</span><span class="p">]</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arctan2</span><span class="p">(</span><span class="n">sy</span><span class="p">,</span> <span class="n">sx</span><span class="p">)</span>

    <span class="c1">#Añadimos el ruido, hay que restar 0.5 porque los valores random van entre 0 y 1:</span>
    <span class="n">theta</span> <span class="o">=</span> <span class="n">mean_theta</span> <span class="o">+</span> <span class="n">eta</span><span class="o">*</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">rand</span><span class="p">(</span><span class="n">N</span><span class="p">)</span><span class="o">-</span><span class="mf">0.5</span><span class="p">)</span>

    <span class="c1">#Actualizamos la velocidad:</span>
    <span class="n">vx</span> <span class="o">=</span> <span class="n">v_init</span> <span class="o">*</span> <span class="n">np</span><span class="o">.</span><span class="n">cos</span><span class="p">(</span><span class="n">theta</span><span class="p">)</span>
    <span class="n">vy</span> <span class="o">=</span> <span class="n">v_init</span> <span class="o">*</span> <span class="n">np</span><span class="o">.</span><span class="n">sin</span><span class="p">(</span><span class="n">theta</span><span class="p">)</span>
    <span class="c1">#Llevamos la cuenta del tiempo:</span>
    <span class="n">Dt</span> <span class="o">+=</span> <span class="n">dt</span>

    <span class="c1">#Actualizamos el plot con la nueva época:</span>
    <span class="n">quiver</span> <span class="o">=</span> <span class="n">ax</span><span class="o">.</span><span class="n">quiver</span><span class="p">(</span><span class="n">x</span><span class="p">,</span> <span class="n">y</span><span class="p">,</span> <span class="n">vx</span><span class="p">,</span> <span class="n">vy</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s1">&#39;yellow&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mf">3.9</span><span class="p">,</span> <span class="n">headwidth</span><span class="o">=</span><span class="mi">10</span><span class="p">,</span> <span class="n">headlength</span><span class="o">=</span><span class="mi">10</span><span class="p">)</span>
    <span class="n">ax</span><span class="o">.</span><span class="n">set_aspect</span><span class="p">(</span><span class="s1">&#39;equal&#39;</span><span class="p">)</span>
    <span class="n">ax</span><span class="o">.</span><span class="n">tick_params</span><span class="p">(</span><span class="n">axis</span><span class="o">=</span><span class="s2">&quot;x&quot;</span><span class="p">,</span> <span class="n">labelsize</span><span class="o">=</span><span class="mi">0</span><span class="p">)</span>
    <span class="n">ax</span><span class="o">.</span><span class="n">get_yaxis</span><span class="p">()</span><span class="o">.</span><span class="n">set_visible</span><span class="p">(</span><span class="kc">False</span><span class="p">)</span>
    <span class="n">ax</span><span class="o">.</span><span class="n">set_xlabel</span><span class="p">(</span><span class="s1">&#39;tiempo t=</span><span class="si">%.1f</span><span class="s1"> [s]&#39;</span> <span class="o">%</span><span class="k">Dt</span>)

<span class="c1">#Guardamos la simulación:</span>
<span class="n">ani</span> <span class="o">=</span> <span class="n">animation</span><span class="o">.</span><span class="n">FuncAnimation</span><span class="p">(</span><span class="n">fig</span><span class="p">,</span> <span class="n">dibujar_plot</span><span class="p">,</span> <span class="n">fargs</span><span class="o">=</span><span class="p">(</span><span class="n">quiver</span><span class="p">,),</span> <span class="n">frames</span><span class="o">=</span><span class="n">Nt</span><span class="p">,</span> <span class="n">interval</span><span class="o">=</span><span class="mi">100</span><span class="p">)</span>
<span class="n">ani</span><span class="o">.</span><span class="n">save</span><span class="p">(</span><span class="s1">&#39;simulation_vicsek.mp4&#39;</span><span class="p">,</span> <span class="n">writer</span><span class="o">=</span><span class="s1">&#39;ffmpeg&#39;</span><span class="p">,</span> <span class="n">fps</span><span class="o">=</span><span class="mi">100</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">close</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>
</div>


<p>Un video extendido de esta simulación puede ser encontrado en mi en mi <a href="https://www.youtube.com/shorts/AQeqIJLC8lM?feature=share" target="_blank">canal de youtube </a> o en mi cuenta de instagram <a href="https://www.instagram.com/nicomediap/" target="_blank">@nicomediap</a></p>
<p>¡Gracias por la atención!</p>



<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Referencias">Referencias<a class="anchor-link" href="#Referencias">;</a></h3><p><a href="https://github.com/pmocz/activematter-python" target="_blank">Simulate Active Matter: Viscek model for flocking birds</a>: Una gran fuente de inspiración, implementado por Philip Mocz (2021). Básicamente tomé este código y le agregé cosas de mi cosecha.</p>
<p><a href="https://www.youtube.com/watch?v=tsItaRGm62k" target="_blank">Active Matter: Modelling swarming behaviour using the Vicsek model</a>: Una exposición en Youtube sobre el tema.</p>

</div>
</div>
</div>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="kn">from</span> <span class="nn">IPython.display</span> <span class="kn">import</span> <span class="n">HTML</span>

<span class="c1"># Reemplaza &#39;AQeqIJLC8lM&#39; con el ID real del YouTube Short</span>
<span class="n">video_id</span> <span class="o">=</span> <span class="s1">&#39;AQeqIJLC8lM&#39;</span>

<span class="c1"># Crear la URL del iframe</span>
<span class="n">html_string</span> <span class="o">=</span> <span class="sa">f</span><span class="s1">&#39;&#39;&#39;</span>
<span class="s1">&lt;iframe width=&quot;560&quot; height=&quot;315&quot; src=&quot;https://www.youtube.com/embed/</span><span class="si">{</span><span class="n">video_id</span><span class="si">}</span><span class="s1">&quot; frameborder=&quot;0&quot; allow=&quot;accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture&quot; allowfullscreen&gt;&lt;/iframe&gt;</span>
<span class="s1">&#39;&#39;&#39;</span>
<span class="c1"># Mostrar el video en el notebook</span>
<span class="n">HTML</span><span class="p">(</span><span class="n">html_string</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">




<div class="output_html rendered_html output_subarea output_execute_result">
<iframe width="350" height="600" src="https://www.youtube.com/embed/AQeqIJLC8lM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

</div>

</div>
</div>

</div>
