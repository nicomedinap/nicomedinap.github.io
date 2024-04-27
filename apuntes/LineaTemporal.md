<!DOCTYPE html>
<meta charset="UTF-8">

<html>
<head>
<style>
.timeline {
  position: relative;
  max-width: 350px;
  margin: 0 auto;
  padding: 40px 20px;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 2px;
  background-color: #000;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -1px;
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
}

.timeline-item::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #000;
  border-radius: 50%;
  top: 0;
  left: 50%;
  margin-left: -10px;
}

.timeline-content {
  position: relative;
  left: 70px;
  font-size: 14px; /* Adjust font size */
}

.timeline-date {
  font-weight: bold;
  margin-bottom: 10px;
}

.timeline-description {
  margin-bottom: 10px;
}

.timeline-item:nth-child(even) .timeline-content {
  left: -60%;
}

.timeline-item:nth-child(odd) .timeline-content {
  left: 60%; /* Adjusted left position for odd items */
}
</style>
</head>

<body>

  <p>Fuente: Varios recursos.</p>

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1900</div>
      <div class="timeline-description">Max Planck propone la idea de que la energía es cuantizada en unidades discretas, dando inicio a la teoría cuántica.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1905</div>
      <div class="timeline-description">Albert Einstein publica su trabajo sobre el efecto fotoeléctrico, mostrando la naturaleza cuántica de la luz y ganando un Premio Nobel por ello en 1921.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1913</div>
      <div class="timeline-description">Niels Bohr propone el modelo atómico cuántico, que incorpora cuantización del momento angular y niveles de energía cuantizados.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1924</div>
      <div class="timeline-description">Louis de Broglie propone la hipótesis de la dualidad onda-partícula, sugiriendo que las partículas también pueden exhibir comportamientos ondulatorios.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1925</div>
      <div class="timeline-description">Werner Heisenberg desarrolla la mecánica matricial, una de las formulaciones fundamentales de la mecánica cuántica.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1926</div>
      <img src="https://miro.medium.com/v2/resize:fit:1400/0*iZPs3b28ttOft7Xf.jpg" alt="Ecuación de Schrödinger" style="width: 180px; height: auto;">
      <div class="timeline-description">Erwin Schrödinger formula la ecuación de onda de Schrödinger, otra formulación importante de la mecánica cuántica.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1927</div>
      <div class="timeline-description">Werner Heisenberg formula el principio de incertidumbre, que establece que es imposible conocer simultáneamente con precisión la posición y la velocidad de una partícula.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1927</div>
      <div class="timeline-description">Paul Dirac formula la ecuación de onda relativista para el electrón, que combina la teoría cuántica con la teoría de la relatividad.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1927</div>
      <div class="timeline-description">La interpretación de Copenhague de la mecánica cuántica, propuesta por Niels Bohr y Werner Heisenberg, establece el papel fundamental de la observación en la determinación de los resultados de un experimento cuántico.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1930</div>
      <div class="timeline-description">El principio de exclusión de Pauli, propuesto por Wolfgang Pauli, establece que dos fermiones idénticos no pueden ocupar el mismo estado cuántico simultáneamente.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1957</div>
      <div class="timeline-description">Hugh Everett propone la interpretación de los mundos múltiples, una interpretación alternativa de la mecánica cuántica que sugiere la existencia de universos paralelos.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1967</div>
      <div class="timeline-description">John Bell formula el teorema de Bell, que establece una prueba experimental para distinguir entre la mecánica cuántica y teorías locales realistas.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1982</div>
      <div class="timeline-description">Alain Aspect realiza un experimento que confirma las predicciones de la mecánica cuántica y refuta las teorías locales realistas, apoyando la interpretación cuántica del entrelazamiento cuántico.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">1994</div>
      <div class="timeline-description">Peter Shor desarrolla un algoritmo cuántico para factorizar números enteros, demostrando el potencial de las computadoras cuánticas para resolver problemas de manera más eficiente que las computadoras clásicas en ciertas tareas.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">2011</div>
      <div class="timeline-description">Los científicos anuncian la observación del estado cuántico del movimiento browniano, demostrando el efecto cuántico en objetos macroscópicos.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">2020</div>
      <div class="timeline-description">Google anuncia que su computadora cuántica Sycamore ha logrado una tarea específica en un tiempo increíblemente corto, marcando un hito importante en el desarrollo de la computación cuántica.</div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">2022</div>
      <div class="timeline-description">Se continúa la investigación en computación cuántica, con avances prometedores hacia la construcción de sistemas cuánticos más grandes y estables.</div>
    </div>
  </div>

