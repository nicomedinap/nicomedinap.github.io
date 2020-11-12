---
layout: post
mathjax: true
comments: true
title:  "Variación de brillo en las estrellas"
---
{% include mathjax.html %}


<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Cuando logras apartarte de la contaminación lumínica, las estrellas que habitan el cielo son abrumadoras. Muchos, incontables puntos brillantes que ostentan tenues y centellantes colores se posicionan a lo largo del disco de nuestra Vía Láctea. Luego de algunos días ya será posible reconocer estructuras y constelaciones, mira que dicen que hasta escorpiones es posible ver; hasta que de pronto, cuando estás mirando un puntito particular del cielo su brillo cambia, aumentando o disminuyendo de forma dramática: ¿Qué ha pasado?</p>
<p>Sea lo que sea que haya pasado, la explicación menos probable siempre será que fue un alien, un OVNI o vida extraterrestre. Resulta que el universo esta lleno de luces extrañas que cambian su brillo a lo largo del tiempo, y lo más probable es que nos hayamos topado con una <strong>estrella variable</strong>, una fuente estelar que cambia su brillo superficial mientras el tiempo pasa. La verdad que son muy comunes, existen de muchos tipos y hoy explicaré cómo podemos llegar a saber tantas cosas sobre estos puntitos luminosos.</p>
<table>
<thead><tr>
<th style="text-align:center"><img src="https://skyandtelescope.org/wp-content/uploads/M3movie_stanek_341px.gif" width="450" height="300">alt=""></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><em>Figura 1: Estrellas variables tipo RR Lyrae pulsando y cambiando s</em></td>
</tr>
<tr>
<td style="text-align:center"><em>su brillo mientras viven tranquilamente en el cúmulo globular Messier 3</em></td>
</tr>
<tr>
<td style="text-align:center"><em>Linda imagen tomada del blog <a href="https://skyandtelescope.org/astronomy-news/the-chaotic-music-of-variable-stars/">sky&amp;telescope</a></em></td>
</tr>
</tbody>
</table>
<h2 id="Bolas-de-gas-en-equilibrio-quem&#225;ndose-a-millones-de-kil&#243;metros-de-aqu&#237;">Bolas de gas en equilibrio quem&#225;ndose a millones de kil&#243;metros de aqu&#237;<a class="anchor-link" href="#Bolas-de-gas-en-equilibrio-quem&#225;ndose-a-millones-de-kil&#243;metros-de-aqu&#237;"></a></h2><p>Una estrella es una gigantezca esfera de gas la cual ha alcanzado las condiciones físicas necesarias para que en su centro se desencadenen una serie de reacciones nucleares a través de la <a href="https://es.wikipedia.org/wiki/Fusi%C3%B3n_nuclear">fusión nuclear</a>, las cuales liberan y transmiten energía hacia el exterior en forma de radiación electromagnética (luz y calor). Gran parte de las estrellas poseen su característica forma esférica dado que existe un balance entre dos fuerzas fundamentales: Primero está la <strong>gravedad</strong>, la cual es generada por la masa de la estrella y actua atrayendo y comprimiendo el gas hacia el centro. Y luego está la <strong>presión</strong> provocada por el mismo gas, que al estar a una temperatura elevada se expande y genera presión sobre su entorno, como en un globo de aire caliente (asumiendo que han visto uno, personalmente yo no). Cuando una estrella cumple esta condición de equilibrio, se dice que está en <strong>equilibrio hidrostático</strong> y la estrella adoptará una forma esférica estable. La figura 2 grafica cómo la gravedad (flecha roja) y la presión (flecha azul) actuan sobre una estrella, y se contrarrestan hasta alcanzar su LOGICA geometría.</p>
<table>
<thead><tr>
<th style="text-align:center"><a href="https://nicomedinap.github.io"> <div align="center"> <img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/imagenes/hydrosta.jpg" width="450" height="300"></div></a></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><em>Figura 2: Esquema del balance de la presión con la gravedad. La gravedad tratará de comprimir</em></td>
</tr>
<tr>
<td style="text-align:center"><em>todo el material hacia el centro del sistema, y la presión tratará de expandirlo, generando esta</em></td>
</tr>
<tr>
<td style="text-align:center"><em>esfera de gas incandescente.</em></td>
</tr>
</tbody>
</table>
<h2 id="El-Sol:-La-estrella">El Sol: La estrella<a class="anchor-link" href="#El-Sol:-La-estrella"></a></h2><p>El Sol es nuestra estrella, y es la fuente de energía que sostiene la vida en la tierra. Es el objeto que contiene más masa y produce mayor cantidad de radiación en estas vecindades galácticas. Pero no es sólo por su luz que es reconocido, sino que también por su gravedad, haciendo que polvo, piedras y bolas de gas cercanas giren a su alrededor e interactuen entre ellas para la formación de diferentes estructuras, como planetas por decir sólo alguno.</p>
<p>La raza humana tempranamente entendió que el sol jugaba un papel principal en su día a día, siendo elevado a la categoría de dios en gran parte de las culturas originarias, llegando al punto de provocar pánico colectivo cuando su brillo disminuía sin previo aviso, como en un con eclipses de luna. Que lata ser un maya y de repente pum, eclipse.</p>
<p>La observación prolongada de la posición relativa del sol en el cielo, y la naturaleza permitió distinguir las estaciones, y con ello a los cultivos selectivos, los pueblos sedentarios, las grandes ciudades y de un momento a otro la explosión demográfica, pasando por toda clase de invenciones relevantes para entender qué era lo que realmente pasaba en el cielo, buscando explicación a ese conjunto de fenómenos regulares que se apreciaban en el movimiento de los planetas, y qué tenían que ver todos esos otros puntos que no parecian para nada soles.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="kn">from</span> <span class="nn">IPython.lib.display</span> <span class="kn">import</span> <span class="n">YouTubeVideo</span>
<span class="kn">from</span> <span class="nn">datetime</span> <span class="kn">import</span> <span class="n">timedelta</span>
<span class="n">start</span><span class="o">=</span><span class="nb">int</span><span class="p">(</span><span class="n">timedelta</span><span class="p">(</span><span class="n">hours</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">minutes</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">seconds</span><span class="o">=</span><span class="mi">2</span><span class="p">)</span><span class="o">.</span><span class="n">total_seconds</span><span class="p">())</span>
<span class="n">YouTubeVideo</span><span class="p">(</span><span class="s2">&quot;wxmSlrI8DGM&quot;</span><span class="p">,</span> <span class="n">start</span><span class="o">=</span><span class="n">start</span><span class="p">,</span> <span class="n">autoplay</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">theme</span><span class="o">=</span><span class="s2">&quot;light&quot;</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s2">&quot;red&quot;</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">




<div class="output_html rendered_html output_subarea output_execute_result">

        <iframe
            width="400"
            height="300"
            src="https://www.youtube.com/embed/wxmSlrI8DGM?color=red&start=2&theme=light&autoplay=0"
            frameborder="0"
            allowfullscreen
        ></iframe>
        
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="&#191;Todas-las-estrellas-son-como-el-sol?-(spoilert-alert:-nope)">&#191;Todas las estrellas son como el sol? (spoilert alert: nope)<a class="anchor-link" href="#&#191;Todas-las-estrellas-son-como-el-sol?-(spoilert-alert:-nope)"></a></h2><p>Toda la cultura y las aventuras de la humanidad están confinadas en nuestro sistema solar y aún así, siento ser yo el que te lo diga, pero el sol es una estrella promedio, una más del montón de estrellas del grupo de baja masa. Nuestra estrella tiene un radio de <strong>697.000 [Km]</strong>, a una distancia de <strong>149.597.870.700 [metros] = 1,49$\times$10$^{8}$ [Km]</strong>, y una masa de <strong>1,99$\times$10$^{30}$ [Kg]</strong> (un uno seguido de 30 ceros), casi el 99,8% de la masa de todo nuestro sistema planetario, y aún así, <strong>es un cuerpo de baja masa D:</strong></p>
<p>Esta afirmación es el resultado del gran número de estrellas que se han observado a lo largo de los años, tanto dentro de nuestra galaxia como en galaxias vecinas. Hemos comparado todas estas estrellas con el sol y nos hemos dado cuenta que en universo hay estructuras casi <strong>inimaginablemente más grandes</strong>. Pero no importa Sol, nosotros te queremos mucho y vamos a entender el universo usandote como referencia. Has demostrado ser una estrella tranquila y calurosa, así que te usaremos como una regla cósmica, te definiremos y usaremos como unidad básicas:</p>
<ol>
<li>la Masa Solar 1 $M_{\odot} := 1,99\times10^{30}\ [Kg]$ </li>
<li>El Radio Solar 1 $M_{\odot} := 697.000\ [Km]$  </li>
<li>la Luminosidad Solar 1 $L_{\odot} := 697.000\ [Km]$ </li>
<li>Distancia tierra-sol: la unidad astronómica 1 $[UA]:=  1,49\times10^{8}\ [Km]$</li>
</ol>
<p>Sabiendo esto, ahora podremos hablar de las otras estrellas usando como comparación al Sol. Por ejemplo, la estrella que ostenta el record de más masiva habita la Nebulosa de la Tarántula, en la nube de magallanes, y se llama R136a1, con $M=265M_{\odot}$, o sea que esta estrella tiene 265 veces la masa de nuestro humilde Sol.</p>
<p>Entonces, como podrán darse cuenta en esta búsqueda se han encontrado toda una gama de diferentes escenarios, y se han definido distintas formas de clasificación, siendo la más importante la clasificación por <strong>tipo espectral</strong>, donde las estrellas se arreglan en base a sus temperaturas superficiales (o efectivas), y se les asigna una clase de <a href="https://es.wikipedia.org/wiki/Clasificaci%C3%B3n_estelar#Clasificaci%C3%B3n_por_tipos_espectrales">tipo espectral</a> ('O','B','A','F','G','K','M'). Diferentes clases poseerán diferentes <a href="https://es.wikipedia.org/wiki/Clasificaci%C3%B3n_estelar#Clasificaci%C3%B3n_por_tipos_espectrales">temperaturas efectivas</a>, las cuales también tiene relación con el color superficial. Si se preguntan por qué se eligieron esas letras, es porque este tipo de clasificación estelar está basado en la llamada <em>clasificación de Harvard</em>.</p>
<p>La siguiente tabla compara las propiedades de estrellas clasificadas en distintas clases espectrales, usando como base las unidades solares:</p>
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
<p>Además, a modo de comparación visual, la figura 3 muestra estrellas clasificadas en diferentes tipos espectrales. De forma visual es posible relacionar sus propiedades, como el tamaño, la masa y su color superficial, este último es muy importante para definor la temperatura superficial de la estrella, que es medido en Kelvin [K].</p>
<table>
<thead><tr>
<th style="text-align:center"><a href="https://nicomedinap.github.io"> <div align="center"> <img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Morgan-Keenan_spectral_classification.png" width="550" height="400"></div></a></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><em>Figura 3:  Relación entre el color y el tamaño de estrellas de diferentes tipos espectrales</em></td>
</tr>
</tbody>
</table>
<p>Usando la tabla y la figura 3: ¿Cuál sería el tipo espectral del sol? ¿Y dónde estaría posicionado aproximadamente en la figura 3?</p>
<p>Lo interesante de esta clasificación es que si construimos una representación visual (aka, un gráfico) donde ordenamos las estrellas con respecto a su color (de azules a rojas) y luminosidad (más brillantes a menos brillantes), podemor ver que existe una coherencia, la cual nos habla del <strong>estado evolutivo</strong> de estas estrellas. El siguiente video lo grafica de una manera magistral:</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="n">start</span><span class="o">=</span><span class="nb">int</span><span class="p">(</span><span class="n">timedelta</span><span class="p">(</span><span class="n">hours</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">minutes</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">seconds</span><span class="o">=</span><span class="mi">15</span><span class="p">)</span><span class="o">.</span><span class="n">total_seconds</span><span class="p">())</span>
<span class="n">YouTubeVideo</span><span class="p">(</span><span class="s1">&#39;jiSN95WX1NA&#39;</span><span class="p">,</span> <span class="n">start</span><span class="o">=</span><span class="n">start</span><span class="p">,</span> <span class="n">autoplay</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">theme</span><span class="o">=</span><span class="s2">&quot;light&quot;</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s2">&quot;red&quot;</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">




<div class="output_html rendered_html output_subarea output_execute_result">

        <iframe
            width="400"
            height="300"
            src="https://www.youtube.com/embed/jiSN95WX1NA?color=red&start=15&theme=light&autoplay=0"
            frameborder="0"
            allowfullscreen
        ></iframe>
        
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>El diagrama antes mostrado, se conoce popularmente como el <a href="https://es.wikipedia.org/wiki/Diagrama_de_Hertzsprung-Russell"><strong>Diagrama de Hertzsprung-Russell</strong></a> o <strong>diagrama HR</strong> para no gastar tanto lápiz. Hay diferentes versiones del diagrama HR, pero todos apuntan a la caracterización del estado evolutivo de las estrellas en estudio. Dependiendo de las caracteristicas de las estrellas (principalmente la masa), éstas recorrerán diferentes lugares del diagrama HR.</p>
<p>En la figura 4 es posible ver un famoso y autoexplicativo diagrama HR, el cual ilustra en qué posición del diagrama se localizan estrellas con diferentes colores, luminosidades, masas, tipo espectral, y también se estima el tiempo aproximado de vida que poseen cada uno de esos puntitos luminosos. Es posible ver que la mayor parte de las estrellas están distribuidas a lo largo de la llamada <a href="https://es.wikipedia.org/wiki/Secuencia_principal"><strong>Secuencia principal</strong></a>. Esta secuencia se caracteriza por contener estrellas que, en ese momento de sus vidas, están fusionando hidrógeno (el elemento más abundante en las estrellas) para convertirlo en Helio a través de la fusión nuclear, particularmente usando la cadena protón-protón. Justamente aquí, en esta secuencia <strong>es donde vive nuestro Sol</strong>, por lo que se puede deducir que hay muchas, muchísimias estrellas similares a nuestra querida bola nuclear.</p>
<table>
<thead><tr>
<th style="text-align:center"><a href="http://www.caosyciencia.com/ideas/articulo.php?id=030204"> <div align="center"> <img src="http://www.caosyciencia.com/img/carlos5_2.jpg" width="450" height="600"></div></a></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><em>Figura 4: Diagrama Hertzsprung-Russell comparando los parámetros físicos de estrellas.</em></td>
</tr>
</tbody>
</table>
<h2 id="Las-estrellas-cambian-a-trav&#233;s-del-tiempo">Las estrellas cambian a trav&#233;s del tiempo<a class="anchor-link" href="#Las-estrellas-cambian-a-trav&#233;s-del-tiempo"></a></h2><p>Conforme pasa el tiempo, las estrellas van evolucionando y moviéndose por el diagrama HR. Esto implica que sufrirán diferentes procesos físicos que provocarán cámbios en sus propiedades (cambios de temperatura, tamaño, luminosidad, entre otros). Una de las grandes misiones de la astronomía del siglo XXI es caracterizar los cambios de brillo que pueden sufrir mientras las estrellas se mueven por el diagrama HR</p>
<p>Supongamos que cada uno tiene a disposición un telescopio para explorar el cielo. Si en vez de observar directamente con él, montamos una cámara fotográfica, podriamos tomar susesivas fotos y unirlas para constriur un mapa nocturno del cielo, o también se podrian tomar muchas fotos de una misma región celeste y ver cómo las fuentes luminosas se comportan a través del tiempo. Al comparar esas imágenes, es posible que veamos fuentes que cambien su luminosidad, de manera regular, irregular o que sencillamente que aparezcan y desaparezcan. A modo de ejemplo, en la figura 4 se muestra un campo estelar que ha sido observado en 4 oportunidades diferentes. Y en el centro de cada imagen, es posible ver una fuente que cambia su brillo en cada una de esas observaciones.</p>
<table>
<thead><tr>
<th style="text-align:center"><a href="https://nicomedinap.github.io"> <div align="center"> <img src="https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/imagenes/Epocas.png" width="550" height="400"></div></a></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><em>Figura 5: Ejemplo de un mismo campo estelar observado en diferentes fechas (épocas).</em></td>
</tr>
<tr>
<td style="text-align:center"><em>En el círculo rojo del centro se muestra una fuente que cambia su brillo a lo largo del tiempo.</em></td>
</tr>
<tr>
<td style="text-align:center"><em>Las imágenes fueron tomadas con el telescopio VISTA, ubicado en Paranal.</em></td>
</tr>
</tbody>
</table>
<p>¿Qué está pasando aquí? Bueno, imposible saberlo sin información adicional. Pero partamos simplificando el problema con una pregunta fundamental: ¿Es normal que la luminosidad de las fuentes astronómicas cambie a lo largo del tiempo? Para tener una pista, podemos examinar nuestra estrella más cercana, y ver si sufre de algún tipo de cambio de luminosidad.</p>
<h2 id="De-nuevo-el-sol:-&#191;una-estrella-variable?">De nuevo el sol: &#191;una estrella variable?<a class="anchor-link" href="#De-nuevo-el-sol:-&#191;una-estrella-variable?"></a></h2><p>El sol no es una bola de gas tan estable como nosotros la percibimos. Está muy bien documentado que en la superficie del sol aparecen manchas oscuras o <a href="https://es.wikipedia.org/wiki/Mancha_solar">'manchas solares'</a> con regularidad, que obecede el llamado <a href="http://primerfoton.cl/2016/06/15/ciclo-solar/">'ciclo solar'</a>. Este ciclo se caracteriza por tener una duración de alrededor de 11 años, donde las manchas solares aparecen progresivamente, alcanzando un número máximo en la superficie y luego desaparecen, comenzando nuevamente el ciclo. Esta aparición/desaparición de manchas está asociado a la variación del campo magnético de nuestra estrella.</p>
<p>Contraintuitivamente, se conoce que el máximo de brillo del sol aparece cuando el número de manchas es máximo. Y es mínimo cuando desaparecen casi por completo. Esa variación de intensidad, medida en energía emitida por superficie [Watts/metro cuadrado] sin embargo, es de tan solo un 0.1% (1365,5-1367 [Watts/metro cuadrado], en relación a la <a href="https://es.wikipedia.org/wiki/Constante_solar">constante solar</a> $K=1366\ [W / m^2]$) por lo que la variación producida por las manchas es <strong>casi despreciable</strong>. La figura 6 muestra la evolución de la superficie de nuestro sol a lo largo de 10 años.</p>
<table>
<thead><tr>
<th style="text-align:center"><a href="https://nicomedinap.github.io"> <div align="center"> <img src="https://www.iaa.csic.es/sites/default/files/524990main_faq10_full.jpg" width="450" height="300"></div></a></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><em>Figura 6: El ciclo solar muestra la evolución de las manchas solares</em></td>
</tr>
</tbody>
</table>
<p>Además, nuestra querida bola de gas incandescente es la protagonista de diferentes eventos eruptivos y explosiones que emanan grandes cantidades de materia al espacio circundante. Gran parte de estos eventos suceden en las regiones activas asociadas a manchas solares, donde emergen intensos campos magnéticos de la superficie del Sol hacia la corona. Estas fulguraciones solares tiene una escala de tiempo muy cortas (astronómicamente hablando :p) de tan solo minutos. En el siguiente video, es posible ver un evento eruptivo en nuestro sol.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="n">start</span><span class="o">=</span><span class="nb">int</span><span class="p">(</span><span class="n">timedelta</span><span class="p">(</span><span class="n">hours</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">minutes</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">seconds</span><span class="o">=</span><span class="mi">27</span><span class="p">)</span><span class="o">.</span><span class="n">total_seconds</span><span class="p">())</span>
<span class="n">YouTubeVideo</span><span class="p">(</span><span class="s1">&#39;HFT7ATLQQx8&#39;</span><span class="p">,</span> <span class="n">start</span><span class="o">=</span><span class="n">start</span><span class="p">,</span> <span class="n">autoplay</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">theme</span><span class="o">=</span><span class="s2">&quot;light&quot;</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s2">&quot;red&quot;</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">




<div class="output_html rendered_html output_subarea output_execute_result">

        <iframe
            width="400"
            height="300"
            src="https://www.youtube.com/embed/HFT7ATLQQx8?color=red&start=27&theme=light&autoplay=0"
            frameborder="0"
            allowfullscreen
        ></iframe>
        
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Las-escala-de-distancias-y-la-detecci&#243;n-de-la-variabilidad">Las escala de distancias y la detecci&#243;n de la variabilidad<a class="anchor-link" href="#Las-escala-de-distancias-y-la-detecci&#243;n-de-la-variabilidad"></a></h2><p>Todas esas manchas solares sólo modificaron la luminosidad del sol en un 0.1%. Y la mala noticia es que este mísero porcentaje sólo es detectable porque nosotros estamos cerca del sol. Recordemos que nosotros <strong>sólo a 149.597.870.700 metros = 1,49$\times$10$^{8}$Kilometros = 1 UA</strong>. Alfa Centauri, que es nuestra estrella vecina más cercana, está sólo unos pasos más allá, a <strong>276363,5 [UA]</strong>, y así las distancias van aumentando exponencialmente hasta convertirse en numeros astronómicos. Ni si quiera es conveniente hablar ya de estas distancias en [UA], para eso se usa los años luz y el parsec.</p>
<p>Aquí debemos hacer una pausa y pensar qué implica estar lejos de las fuentes. Destaco dos ideas principales:–</p>
<ol>
<li><p>La variabilidad de una fuente puede deberse a un proceso físico que ocurre en la fuente. ¿Verdad? Algo pasó dentro del sol, y gatilló esos poderosos campos magnéticos. Esta fue la causa del cambio de su brillo.</p>
</li>
<li><p>Por el hecho de estár <em>muy lejos</em> de las fuentes, es muy difícil poder medir con exactitud todos los procesos físicos involucrados.</p>
</li>
</ol>
<p>Consideremos una Galaxia, como por ejemplo <a href="https://upload.wikimedia.org/wikipedia/commons/3/3c/Merging_galaxies_NGC_4676_%28captured_by_the_Hubble_Space_Telescope%29.jpg">las galáxias de los ratones</a>, las cuales se encuentran a una respetable distancia de $89\ Megaparsecs = 2,746\times10^{21} [Km] = 1,83\times10^{13} [UA]$. A esa distancia, nos perderemos gran parte de los procesos estelares, sólo por decir algo.</p>
<p>Considerando todos estos aspectos, nuestra premisa será que <strong>todas</strong> las fuentes estelares <strong>son variables</strong>, pero si observamos <strong>lo suficiente</strong>. Es decir, si contamos con equipamiento con <em>resolución</em> y el tiempo necesario para registrar dicha fuente, se podrá caracterizar algún tipo de variación de luminosidad, dejandonos así inferir resultados a partir de dicha medición.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Ya-bueno:-&#191;y-cu&#225;ntas-fuentes-luminosas-variables-existen?">Ya bueno: &#191;y cu&#225;ntas fuentes luminosas variables existen?<a class="anchor-link" href="#Ya-bueno:-&#191;y-cu&#225;ntas-fuentes-luminosas-variables-existen?"></a></h2><p>A lo largo de la historia, muchos astrónomos e instituciones han catalogado <strong>demasiados</strong> tipos como para ser nombrados aquí.</p>
<p>Así que mejor consultaremos el arbol de la variabilidad y toda su complejidad :D</p>
<table>
<thead><tr>
<th style="text-align:center"><a href="https://nicomedinap.github.io"> <div align="center"> <img src="https://www.ast.cam.ac.uk/sites/default/files/assets/images/research/milkyway_localgroup/VariabilityTree(1).png" width="550" height="400"></div></a></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><em>Figura 7: Árbol de la variabilidad", el cual fue sacado de L. Eyer &amp; N. Mowlavi.</em></td>
</tr>
</tbody>
</table>
<p>De aquí en adelante, usaré este arbol de variabilidad para ir hablando de diferentes fuentes que cambian su brillo.</p>
<p>¡Hasta entonces!</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span> 
</pre></div>

    </div>
</div>
</div>

</div>
 

