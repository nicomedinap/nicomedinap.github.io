<!DOCTYPE html>
<html>
<head>
<style>
.timeline {
  position: relative;
  max-width: 250px;
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
  left: 30px;
}

.timeline-date {
  font-weight: bold;
  margin-bottom: 10px;
}

.timeline-description {
  margin-bottom: 10px;
}

.timeline-item:nth-child(even) .timeline-content {
  left: -50%;
}

.timeline-item:nth-child(odd) .timeline-content {
  left: 60%; /* Adjusted left position for odd items */
}
</style>
</head>

<body>

  <p> Fuente: https://www.memoriachilena.gob.cl/602/w3-article-100576.html#cronologia</p>

  <div class="timeline">
    <div class="timeline-item">
      <div class="timeline-content">
        <div class="timeline-date">1849</div>
        <div class="timeline-description">Se instala en el Cerro Santa Lucia un observatorio astronómico a cargo del científico estadounidense James Melville Gillis. Este es el primer observatorio de Latinoamérica</div>
        <div class="timeline-description">Event 2</div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-content">
        <div class="timeline-date">1850</div>
        <div class="timeline-description">Ignacio Domeyko propone la compra de las instalaciones del Cerro Santa Lucia</div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-content">
        <div class="timeline-date">1852</div>
        <div class="timeline-description">Se inaugura el Observatorio Nacional mediante un Decreto del Presidente Manuel Montt</div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-content">
        <div class="timeline-date">1855</div>
        <div class="timeline-description">Se decreta el traslado del Observatorio Nacional al Parque Quinta Normal de Agricultura</div>
      </div>
    </div>
  </div>
</body>
</html>
