---
published: true
title: Prueba N
layout: post
---

<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h1 id="El-sol,-nuestra-estrella-protectora">El sol, nuestra estrella protectora<a class="anchor-link" href="#El-sol,-nuestra-estrella-protectora">&#182;</a></h1><p>Hoy estamos aquí gracias al Sol. Toda nuestra realidad y cultura está inmersa en el sistema Solar, del cual el sol es el gran protagonista (es la gran estrella :p), ya que es la fuente de energía que sostiene la vida en la tierra. Nuestra estrella tiene un radio de <strong>697.000 [Km]</strong>, a una distancia de <strong>sólo a 149.597.870.700 metros = 1,49$\times$10$^{8}$ [Km] = 1 [UA]</strong>, y una masa de <strong>1,99$\times$10$^{30}$ [Kg]</strong> (un uno seguido de 30 ceros), casi el 99,8% de la masa de todo nuestro sistema planetario.</p>
<p>Pero: ¿qué es una estrella? ¿Cómo y por qué genera su propia luz? ¿Por qué es esférica y no tiene otra forma? ¿Por qué podemos ver otras estrellas sólo como puntitos luminosos de noche? ¿Cuánto tiempo llevan ahí generando luz?</p>
<h2 id="Una-esfera-de-gas-en-equilibrio.">Una esfera de gas en equilibrio.<a class="anchor-link" href="#Una-esfera-de-gas-en-equilibrio.">&#182;</a></h2><p>Una estrella es una gigantezca esfera de gas caliente la cual ha alcanzado las condiciones físicas necesarias para que en su centro se desencadenen una serie de reacciones nucleares (principalmente <a href="https://es.wikipedia.org/wiki/Fusi%C3%B3n_nuclear">fusión nuclear</a>), las cuales liberan y transmiten energía hacia el exterior en forma de radiación electromagnética (luz y calor).</p>
<p>Las estrellas poseen esta característica forma esférica dado que existe un <em>balance</em> entre dos fuerzas fundamentales. Primero está la <em>gravedad</em>, la cual es generada por la masa de la estrella y actua atrayendo y comprimiendo el gas hacia el centro. Y luego (pero no menos importante) está la <em>presión</em> provocada por el mismo gas, que al estar a una temperatura elevada, éste se expande y genera presión sobre su entorno. Como en un globo de aire caliente. Cuando una estrella cumple esta condición de <strong>equilibrio hidrostático</strong>, la estrella adoptará una forma esférica estable. La figura 1 grafica cómo las gravedad y presión actuan sobre una estrella, y se contrarrestan para generar su geometría.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[52]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="kn">from</span> <span class="nn">IPython.display</span> <span class="kn">import</span> <span class="n">Image</span>
<span class="k">print</span> <span class="s1">&#39;Figura 1: Esquema del balance de la presión con la gravedad. La gravedad tratará de comprimir todo el material hacia el centro del sistema, y la presión tratará de expandirlo, generando esta esfera de gas incandescente.&#39;</span>
<span class="n">Image</span><span class="p">(</span><span class="n">url</span><span class="o">=</span><span class="s2">&quot;https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/imagenes/hydrosta.jpg&quot;</span><span class="p">,</span><span class="n">width</span><span class="o">=</span><span class="mi">600</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

<div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Figura 1: Esquema del balance de la presión con la gravedad. La gravedad tratará de comprimir todo el material hacia el centro del sistema, y la presión tratará de expandirlo, generando esta esfera de gas incandescente.
</pre>
</div>
</div>

<div class="output_area">

<div class="prompt output_prompt">Out[52]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/imagenes/hydrosta.jpg" width="600"/>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="&#191;Todas-las-estrellas-son-como-el-sol?-(spoilert-alert:-nope)">&#191;Todas las estrellas son como el sol? (spoilert alert: nope)<a class="anchor-link" href="#&#191;Todas-las-estrellas-son-como-el-sol?-(spoilert-alert:-nope)">&#182;</a></h2><p>A lo largo de los años, se han estudiado un número enorme de estrellas para compararlas con nuestro Sol, buscando entender si ésta es una estrella particular y única comparada con las demás. En esta búsqueda se han encontrado toda una gama de diferentes escenarios, y se han definido distintas formas de clasificación, siendo la más importante (o la más usada) la clasificación por <strong>tipo espectral</strong>, donde las estrellas se clasifican en base a sus temperaturas superficiales (o efectivas), y se les asigna una clase de <a href="https://es.wikipedia.org/wiki/Clasificaci%C3%B3n_estelar#Clasificaci%C3%B3n_por_tipos_espectrales">tipo espectral</a> ('O','B','A','F','G','K','M'). Diferentes clases poseerán diferentes <a href="https://es.wikipedia.org/wiki/Clasificaci%C3%B3n_estelar#Clasificaci%C3%B3n_por_tipos_espectrales">temperaturas efectivas</a>, las cuales también tiene relación con el color superficial. Si se preguntan por qué se eligieron esas letras, es porque este tipo de clasificación estelar está basado en la llamada <em>clasificación de Harvard</em>.</p>
<p>La siguiente tabla compara las propiedades de estrellas clasificadas en distintas clases espectrales :</p>
<table>
<thead><tr>
<th style="text-align:center">Clase</th>
<th style="text-align:center">Temperatura</th>
<th style="text-align:center">Color</th>
<th style="text-align:center">Masa</th>
<th style="text-align:center">Radio</th>
<th style="text-align:center">Luminosidad bolométrica</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">O</td>
<td style="text-align:center">≥ 33.000 K</td>
<td style="text-align:center">azul</td>
<td style="text-align:center">≥ 16 M☉</td>
<td style="text-align:center">≥ 6,6 R☉</td>
<td style="text-align:center">≥ 30.000 L☉</td>
</tr>
<tr>
<td style="text-align:center">B</td>
<td style="text-align:center">10.000–33.000 K</td>
<td style="text-align:center">azul a blanco azulado</td>
<td style="text-align:center">2,1–16 M☉</td>
<td style="text-align:center">1,8–6,6 R☉</td>
<td style="text-align:center">25–30.000 L☉</td>
</tr>
<tr>
<td style="text-align:center">A</td>
<td style="text-align:center">7.500–10.000 K</td>
<td style="text-align:center">blanco</td>
<td style="text-align:center">1,4–2,1M☉</td>
<td style="text-align:center">1,4–1,8 R☉</td>
<td style="text-align:center">5–25 L☉</td>
</tr>
<tr>
<td style="text-align:center">F</td>
<td style="text-align:center">6,000–7,500 K</td>
<td style="text-align:center">blanco amarillento</td>
<td style="text-align:center">1,04–1,4 M☉</td>
<td style="text-align:center">1,15–1,4 R☉</td>
<td style="text-align:center">1,5–5 L☉</td>
</tr>
<tr>
<td style="text-align:center">G</td>
<td style="text-align:center">5.200–6,000 K</td>
<td style="text-align:center">amarillo</td>
<td style="text-align:center">0,8–1,04 M☉</td>
<td style="text-align:center">0,96–1,15 R☉</td>
<td style="text-align:center">0,6–1,5 L☉</td>
</tr>
<tr>
<td style="text-align:center">K</td>
<td style="text-align:center">3.700–5.200 K</td>
<td style="text-align:center">naranja</td>
<td style="text-align:center">0,45–0,8 M☉</td>
<td style="text-align:center">0,7–0,96 R☉</td>
<td style="text-align:center">0,08–0,6 L☉</td>
</tr>
<tr>
<td style="text-align:center">M</td>
<td style="text-align:center">≤ 3.700 K</td>
<td style="text-align:center">rojo</td>
<td style="text-align:center">≤ 0,45 M☉</td>
<td style="text-align:center">≤ 0,7 R☉</td>
<td style="text-align:center">≤ 0,08 L☉</td>
</tr>
</tbody>
</table>
<p>Además, a modo de comparación visual, la figura 2 muestra estrellas clasificadas en diferentes tipos espectrales. Siguiendo la tabla: ¿Cuál sería el tipo espectral del sol? ¿Y dónde estaría posicionado aproximadamente en la figura 2?</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[37]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="k">print</span> <span class="s1">&#39;Figura 2: Relación entre el color y el tamaño de estrellas de diferentes tipos espectrales&#39;</span>
<span class="n">Image</span><span class="p">(</span><span class="n">url</span><span class="o">=</span><span class="s2">&quot;https://upload.wikimedia.org/wikipedia/commons/8/8b/Morgan-Keenan_spectral_classification.png&quot;</span><span class="p">,</span><span class="n">width</span><span class="o">=</span><span class="mi">900</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

<div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Figura 2: Relación entre el color y el tamaño de estrellas de diferentes tipos espectrales
</pre>
</div>
</div>

<div class="output_area">

<div class="prompt output_prompt">Out[37]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Morgan-Keenan_spectral_classification.png" width="900"/>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Lo interesante de esta clasificación es que si construimos una representación visual (es decir, un gráfico) donde ordenamos las estrellas con respecto a su color (de azules a rojas) y luminosidad (más brillantes a menos brillantes), podemor ver que existe una coherencia, la cual nos habla del <em>estado evolutivo</em> de estas estrellas. El siguiente video lo grafica de una manera magistral:</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[38]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="kn">from</span> <span class="nn">IPython.lib.display</span> <span class="kn">import</span> <span class="n">YouTubeVideo</span>
<span class="n">YouTubeVideo</span><span class="p">(</span><span class="s1">&#39;jiSN95WX1NA&#39;</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

<div class="prompt output_prompt">Out[38]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">

        <iframe
            width="400"
            height="300"
            src="https://www.youtube.com/embed/jiSN95WX1NA"
            frameborder="0"
            allowfullscreen
        ></iframe>
        
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="El-sol,-una-estrella-com&#250;n">El sol, una estrella com&#250;n<a class="anchor-link" href="#El-sol,-una-estrella-com&#250;n">&#182;</a></h2><p>El diagrama antes mostrado, se conoce popularmente como el <a href="https://es.wikipedia.org/wiki/Diagrama_de_Hertzsprung-Russell"><strong>Diagrama de Hertzsprung-Russell</strong></a> o <em>diagrama HR</em> para no gastar tanto lápiz. Hay diferentes versiones del diagrama HR, pero todos apuntan a la caracterización del estado evolutivo de las estrellas en estudio. Dependiendo de las caracteristicas de las estrellas (principalmente la masa), éstas recorrerán diferentes lugares del diagrama HR.</p>
<p>En la figura 3 es posible ver un famoso y autoexplicativo diagrama HR, el cual ilustra en qué posición del diagrama se localizan estrellas con diferentes colores, luminosidades, masas, tipo espectral, y también se estima el tiempo aproximado de vida que poseen cada uno de esos puntitos luminosos. Es posible ver que la mayor parte de las estrellas están distribuidas a lo largo de la llamada <a href="https://es.wikipedia.org/wiki/Secuencia_principal"><strong>Secuencia principal</strong></a>. Esta secuencia se caracteriza por contener estrellas que, en ese momento de sus vidas, están fusionando hidrógeno (el elemento más abundante en las estrellas) para convertirlo en Helio a través de la fusión nuclear. Justamente en esta secuencia <strong>es donde vive nuestro Sol</strong>, por lo que se puede deducir que hay <em>muchas</em> estrellas similares a nuestra querida bola nuclear.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[43]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="k">print</span> <span class="s1">&#39;Figura 3: BlaBla&#39;</span>
<span class="n">Image</span><span class="p">(</span><span class="n">url</span><span class="o">=</span><span class="s2">&quot;https://upload.wikimedia.org/wikipedia/commons/1/17/Hertzsprung-Russel_StarData.png&quot;</span><span class="p">,</span><span class="n">width</span><span class="o">=</span><span class="mi">600</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

<div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Figura 3: BlaBla
</pre>
</div>
</div>

<div class="output_area">

<div class="prompt output_prompt">Out[43]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<img src="https://upload.wikimedia.org/wikipedia/commons/1/17/Hertzsprung-Russel_StarData.png" width="600"/>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Las-estrellas-cambian-a-trav&#233;s-del-tiempo">Las estrellas cambian a trav&#233;s del tiempo<a class="anchor-link" href="#Las-estrellas-cambian-a-trav&#233;s-del-tiempo">&#182;</a></h2><p>Conforme pasa el tiempo, las estrellas van evolucionando y moviéndose por el diagrama HR. Esto implica que sufrirán diferentes procesos físicos que provocarán cámbios en sus propiedades (cambios de temperatura, tamaño, luminosidad, entre otros)</p>
<p>Una de las grandes misiones de la astronomía del siglo XXI es caracterizar los cambios de brillo que pueden sufrir mientras las estrellas se mueven por el diagrama HR</p>
<p>Supongamos que cada uno tiene a disposición un telescopio para explorar el cielo. Si en vez de observar directamente con él, montamos una cámara fotográfica, podriamos tomar susesivas fotos y unirlas para constriur un mapa nocturno del cielo, o también se podrian tomar muchas fotos de una misma región celeste y ver cómo las fuentes luminosas se comportan a través del tiempo.</p>
<p>Al comparar esas imágenes, es posible que veamos fuentes que cambien su luminosidad, de manera regular, irregular o que sencillamente que aparezcan y desaparezcan. A modo de ejemplo, en la figura 4 se muestra un campo estelar que ha sido observado en 4 oportunidades diferentes. Y en el centro de cada imagen, es posible ver una fuente que cambia su brillo en cada una de esas observaciones.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[50]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="k">print</span> <span class="s1">&#39;Figura 4: Ejemplo de un mismo campo estelar observado en diferentes fechas (épocas). En el círculo rojo del centro se muestra una fuente que cambia su brillo a lo largo del tiempo. Las imágenes fueron tomadas con el telescopio     VISTA, ubicado en Paranal.&#39;</span>
<span class="n">Image</span><span class="p">(</span><span class="n">url</span><span class="o">=</span><span class="s2">&quot;https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/imagenes/Epocas.png&quot;</span><span class="p">,</span><span class="n">width</span><span class="o">=</span><span class="mi">1000</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

<div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Figura 4: Ejemplo de un mismo campo estelar observado en diferentes fechas (épocas). En el círculo rojo del centro se muestra una fuente que cambia su brillo a lo largo del tiempo. Las imágenes fueron tomadas con el telescopio     VISTA, ubicado en Paranal.
</pre>
</div>
</div>

<div class="output_area">

<div class="prompt output_prompt">Out[50]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/imagenes/Epocas.png" width="1000"/>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>¿Qué está pasando aquí? Bueno, imposible saberlo sin información adicional. Pero partamos simplificando el problema con una pregunta fundamental: ¿Es normal que la luminosidad de las fuentes astronómicas cambie a lo largo del tiempo?</p>
<p>Para tener una pista, podemos examinar nuestra estrella más cercana, y ver si sufre de algún tipo de cambio de luminosidad.</p>
<h2 id="De-nuevo-el-sol:-&#191;una-estrella-variable?">De nuevo el sol: &#191;una estrella variable?<a class="anchor-link" href="#De-nuevo-el-sol:-&#191;una-estrella-variable?">&#182;</a></h2><p>El sol no es una bola de gas tan estable como nosotros la percibimos. Está muy bien documentado que en la superficie del sol aparecen manchas oscuras o <a href="https://es.wikipedia.org/wiki/Mancha_solar">'manchas solares'</a> con regularidad, que obecede el llamado <a href="http://primerfoton.cl/2016/06/15/ciclo-solar/">'ciclo solar'</a>. Este ciclo se caracteriza por tener una duración de alrededor de 11 años, donde las manchas solares aparecen progresivamente, alcanzando un número máximo en la superficie y luego desaparecen, comenzando nuevamente el ciclo. Esta aparición/desaparición de manchas está asociado a la variación del campo magnético de nuestra estrella.</p>
<p>Contraintuitivamente, se conoce que el máximo de brillo del sol aparece cuando el número de manchas es máximo. Y es mínimo cuando desaparecen casi por completo. Esa variación de intensidad, sin embargo, es de tan solo un 0.1% (1365,5 - 1367 $W/m^2$, en relación a la <a href="https://es.wikipedia.org/wiki/Constante_solar">constante solar</a> K=1366 $W/m^2$) por lo que la variación producida por las manchas es <strong>casi despreciable</strong>. La figura 5 muestra la evolución de la superficie de nuestro sol a lo largo de 10 años.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[44]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="kn">from</span> <span class="nn">IPython.display</span> <span class="kn">import</span> <span class="n">Image</span>
<span class="k">print</span> <span class="s1">&#39;Figura 5: Comparación de observaciones del sol en diferentes fechas. Fuente: Nasa&#39;</span>
<span class="n">Image</span><span class="p">(</span><span class="n">url</span><span class="o">=</span><span class="s2">&quot;https://www.iaa.csic.es/sites/default/files/524990main_faq10_full.jpg&quot;</span><span class="p">,</span><span class="n">width</span><span class="o">=</span><span class="mi">600</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

<div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Figura 5: Comparación de observaciones del sol en diferentes fechas. Fuente: Nasa
</pre>
</div>
</div>

<div class="output_area">

<div class="prompt output_prompt">Out[44]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<img src="https://www.iaa.csic.es/sites/default/files/524990main_faq10_full.jpg" width="600"/>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Además, nuestra querida bola de gas incandescente es la protagonista de diferentes eventos eruptivos y explosiones que emanan grandes cantidades de materia al espacio circundante. Gran parte de estos eventos suceden en las regiones activas asociadas a manchas solares, donde emergen intensos campos magnéticos de la superficie del Sol hacia la corona. Estas fulguraciones solares tiene una escala de tiempo muy cortas (astronómicamente hablando :p) de tan solo minutos. En el siguiente video, es posible ver un evento eruptivo en nuestro sol.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[25]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="kn">from</span> <span class="nn">IPython.lib.display</span> <span class="kn">import</span> <span class="n">YouTubeVideo</span>
<span class="n">YouTubeVideo</span><span class="p">(</span><span class="s1">&#39;HFT7ATLQQx8&#39;</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

<div class="prompt output_prompt">Out[25]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">

        <iframe
            width="400"
            height="300"
            src="https://www.youtube.com/embed/HFT7ATLQQx8"
            frameborder="0"
            allowfullscreen
        ></iframe>
        
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Las-escala-de-distancias-y-la-detecci&#243;n-de-la-variabilidad">Las escala de distancias y la detecci&#243;n de la variabilidad<a class="anchor-link" href="#Las-escala-de-distancias-y-la-detecci&#243;n-de-la-variabilidad">&#182;</a></h2><p>Todas esas manchas solares sólo modificaron la luminosidad del sol en un 0.1%. Y la mala noticia es que este mísero porcentaje sólo es detectable porque nosotros estamos cerca del sol. Recordemos que nosotros <strong>sólo a 149.597.870.700 metros = 1,49$\times$10$^{8}$Kilometros = 1 UA</strong>. Alfa Centauri, que es nuestra estrella vecina más cercana, está sólo unos pasos más allá, a <strong>41,3 billones de kilómetros</strong>. Y así las distancias van aumentando exponencialmente hasta convertirse en numeros astronómicos. En la tabla ustedes pueden comparativos de distancias.</p>
<p>Aquí debemos hacer una pausa y pensar qué implica estar lejos de las fuentes. Destaco dos ideas principales:</p>
<ol>
<li><p>La variabilidad de una fuente puede deberse a un proceso físico que ocurre en la fuente. ¿Verdad? Algo pasó dentro del sol, y gatilló esos poderosos campos magnéticos. Esta fue la causa del cambio de su brillo.</p>
</li>
<li><p>Por el hecho de estár <em>muy lejos</em> de las fuentes, es muy difícil poder medir con exactitud todos los procesos físicos involucrados.</p>
</li>
</ol>
<p>Consideremos una Galaxia, como por ejemplo <a href="https://upload.wikimedia.org/wikipedia/commons/3/3c/Merging_galaxies_NGC_4676_%28captured_by_the_Hubble_Space_Telescope%29.jpg">las galáxias de los ratones</a>, las cuales se encuentran a una respetable distancia de 89 Megaparsecs (2,746$\times$10$^{21}$ Kilómetros). A esa distancia, nos perderemos gran parte de los procesos estelares, sólo por decir algo.</p>
<p>Considerando todos estos aspectos, nuestra premisa será que <strong>todas</strong> las fuentes estelares <strong>son variables</strong>, pero si observamos <strong>lo suficiente</strong>. Es decir, si contamos con equipamiento con <em>resolución</em> y el tiempo necesario para registrar dicha fuente, se podrá caracterizar algún tipo de variación de luminosidad, dejandonos así inferir resultados a partir de dicha medición.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Ya-bueno:-&#191;y-cu&#225;ntas-fuentes-luminosas-variables-existen?">Ya bueno: &#191;y cu&#225;ntas fuentes luminosas variables existen?<a class="anchor-link" href="#Ya-bueno:-&#191;y-cu&#225;ntas-fuentes-luminosas-variables-existen?">&#182;</a></h2><p>A lo largo de la historia, muchos astrónomos e instituciones han catalogado <strong>demasiados</strong> tipos como para ser nombrados aquí. Quizá podría ser un tema para otra clase o para hablar investirar :p</p>
<p>Así que mejor consultaremos el arbol de la variabilidad y toda su complejidad :D</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[33]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="k">print</span> <span class="s1">&#39;Figura 3: &quot;Árbol de la variabilidad&quot;, el cual fue sacado de L. Eyer &amp; N. Mowlavi&#39;</span>
<span class="n">Image</span><span class="p">(</span><span class="n">url</span><span class="o">=</span><span class="s2">&quot;https://www.ast.cam.ac.uk/sites/default/files/assets/images/research/milkyway_localgroup/VariabilityTree(1).png&quot;</span><span class="p">,</span><span class="n">width</span><span class="o">=</span><span class="mi">700</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

<div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Figura 3: &#34;Árbol de la variabilidad&#34;, el cual fue sacado de L. Eyer &amp; N. Mowlavi
</pre>
</div>
</div>

<div class="output_area">

<div class="prompt output_prompt">Out[33]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<img src="https://www.ast.cam.ac.uk/sites/default/files/assets/images/research/milkyway_localgroup/VariabilityTree(1).png" width="700"/>
</div>

</div>

</div>
</div>

</div>
 

