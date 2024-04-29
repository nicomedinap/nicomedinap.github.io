<meta charset="UTF-8">

<html>
<head>
<style>
.timeline {
  position: relative;
  max-width: 300px;  /* tamaño del lugar donde irá el texto */
  margin: auto;
  padding: 40px 20px;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 1px;
  background-color: #000;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -1px;
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
  display: flex; /* Usa flexbox para alinear los elementos */
}

.timeline-item::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  top: 0;
  left: 50%;
  margin-left: -10px;
}

.timeline-content {
  position: relative;
  left: 200px;
  font-size: 14px; /* Adjust font size */
}

.timeline-date {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 24px;
}

p.timeline-title {
  text-align: center;
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  color: #333; /* Color de texto */
}

p.timeline-subtitle {
  text-align: center;
  font-size: 15px;
  margin-bottom: 20px;
  color: #333; 
}

.timeline-item:nth-child(even) .timeline-date { margin-left: 180px;}
.timeline-item:nth-child(even) .timeline-content { left: -60%; }

.timeline-item:nth-child(odd) .timeline-date { margin-left: -5px;}
.timeline-item:nth-child(odd) .timeline-content {left: 60%}
    
@media screen and (max-width: 700px) {
    .timeline {
        max-width: 200px;
        left: 1cm;
        font-size: 7px;
    }
    
    .timeline-item:nth-child(even) .timeline-date { margin-left: 125px;}
    .timeline-item:nth-child(even) .timeline-content { left: -90%; }
}

</style>
</head>

<body>

<p class="timeline-title" >Línea de tiempo de los hitos de la mecánica cuántica.</p>
<p class="timeline-subtitle" >Fuente: Varios recursos.</p>

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1900</div>
        <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/497dcd1c34d321ae3c86ccfc9ca2968ba1dc9770" alt="Ecuación de Schrödinger" style="width: 180px; height: auto; margin-bottom: 10px;">
        <div class="timeline-description">Max Planck propone la idea de que la energía es cuantizada en unidades discretas, dando inicio a la teoría cuántica.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1905</div>
        <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/0a86bcbc02eb2b042bdc6adae9413e3bb569d1e1" alt="Efecto Fotoeléctrico" style="width: 180px; height: auto; margin-bottom: 10px;">
        <div class="timeline-description">Albert Einstein publica su trabajo sobre el efecto fotoeléctrico, mostrando la naturaleza cuántica de la luz y ganando un Premio Nobel por ello en 1921.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1913</div>
        <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/9338fa27ac6b5292cbff7eb36bd0d04db7b3a80a" alt="modelo de bohr" style="width: 120px; height: auto;margin-bottom: 10px;">
        <div class="timeline-description">Niels Bohr propone el modelo atómico cuántico, que incorpora cuantización del momento angular y niveles de energía cuantizados.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1924</div>
        <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/94df6d9afabe2a7d8f7d95e00d508f0f80eab2ab" alt="modelo de bohr" style="width: 100px; height: auto;margin-bottom: 10px;">
        <div class="timeline-description">Louis de Broglie propone la hipótesis de la dualidad onda-partícula, sugiriendo que las partículas también pueden exhibir comportamientos ondulatorios.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1925</div>
        <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/d913bf273188025700545fccdd36ea39a55ee001" alt=" " style="width: 180px; height: auto;margin-bottom: 10px;">
        <div class="timeline-description">Werner Heisenberg, Max Born y Pascual Jordan desarrollan la mecánica matricial, una de las formulaciones fundamentales de la mecánica cuántica.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1926</div>
        <img src="https://miro.medium.com/v2/resize:fit:1400/0*iZPs3b28ttOft7Xf.jpg" alt="Ecuación de Schrödinger" style="width: 180px; height: auto;margin-bottom: 10px;">
        <div class="timeline-description">Erwin Schrödinger formula la ecuación de onda de Schrödinger, otra formulación importante de la mecánica cuántica.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1927</div>
        <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/dfad4605bd5cc074dba10330bd766f60b113fa1b" alt=" " style="width: 120px; height: auto;margin-bottom: 10px;">
        <div class="timeline-description">Werner Heisenberg formula el principio de incertidumbre, que establece que es imposible conocer simultáneamente con precisión la posición y la velocidad de una partícula.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1927</div>
        <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/e9b6942692584f37d53ac71686a5f630f22d6772" alt=" " style="width: 180px; height: auto;margin-bottom: 10px;">
        <div class="timeline-description">Paul Dirac formula la ecuación de onda relativista para el electrón, que combina la teoría cuántica con la teoría de la relatividad.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1927</div>
        <!--<img src=" " alt=" " style="width: 180px; height: auto;"> -->
        <div class="timeline-description">La interpretación de Copenhague de la mecánica cuántica, propuesta por Niels Bohr y Werner Heisenberg, establece el papel fundamental de la observación en la determinación de los resultados de un experimento cuántico.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1930</div>
        <img src="https://useruploads.socratic.org/4Kfe7qHSQW2Qql76K7nj_pauliexample.jpg" alt=" " style="width: 180px; height: auto;margin-bottom: 10px;">
        <div class="timeline-description">El principio de exclusión de Pauli, propuesto por Wolfgang Pauli, establece que dos fermiones idénticos no pueden ocupar el mismo estado cuántico simultáneamente.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1948</div>
        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKt5yHAv_GFYP9K12CN94OZymI03ZPhGErE1JE-AGLxPbk6hGZlzKepkMm0bZZHsJnKWrPcTzu0X-BfPcz40mbvGbvxazdaotzNuVQosOGf6k78mns4X23S0s6HiBPDtg4FArY2A6Ppm9F/s1600/Path+Integral+Quantum+Mechanics+Picture.jpg" alt=" " style="width: 180px; height: auto;margin-bottom: 10px;">
        <div class="timeline-description">Richard Feynman publica un formalismo de la mecánica cuántica basado en sus integrales de camino .</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1957</div>
        <!--<img src=" " alt=" " style="width: 180px; height: auto;"> -->
        <div class="timeline-description">Hugh Everett propone una interpretación alternativa de la mecánica cuántica: los mundos múltiples.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1965</div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/90/Ley_de_Moore.png" alt=" " style="width: 240px; height: auto;margin-bottom: 10px;">
        <div class="timeline-description">Gordon Moore publica una relación empírica entre el número de transistores en circuitos electrónicos cada año, lo que se convierte en la "Ley de Moore": aproximadamente cada 2 años se duplica el número de transistores en un microprocesador.</div> 
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1967</div>
        <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/8bf31903c9d7582f47999568fce8372fab2e6709" alt=" " style="width: 230px; height: auto;margin-bottom: 10px;">
        <div class="timeline-description">John Bell formula el teorema de Bell, que establece una prueba experimental para distinguir entre la mecánica cuántica y teorías locales realistas.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1982</div>
        <img src="https://cdn.mos.cms.futurecdn.net/WHuxFyyB3J5fZnW7oLyF2h-1200-80.jpg" alt=" " style="width: 180px; height: auto;margin-bottom: 10px;">
        <div class="timeline-description">Alain Aspect realiza un experimento que confirma las predicciones de la mecánica cuántica y refuta las teorías locales realistas, apoyando la interpretación cuántica del entrelazamiento cuántico.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1994</div>
        <img src="https://miro.medium.com/v2/resize:fit:1400/1*bkN-PgZ8DnC7-bCihS-Isg.png " alt=" " style="width: 240px; height: auto;margin-bottom: 10px;">
        <div class="timeline-description">Peter Shor desarrolla un algoritmo cuántico para factorizar números enteros, demostrando el potencial de las computadoras cuánticas para resolver problemas de manera más eficiente en ciertas tareas.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">2011</div>
        <!--<img src=" " alt=" " style="width: 180px; height: auto;"> -->
        <div class="timeline-description">Se observa un estado cuántico del movimiento browniano, demostrando el efecto cuántico en objetos macroscópicos.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">2020</div>
        <!-- <img src=" " alt=" " style="width: 180px; height: auto;"> -->
        <div class="timeline-description">La computadora cuántica Sycamore logra avances signiticativos en la computación.</div>
    </div>
</div>

