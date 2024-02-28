---
layout: post
title: PyScript
---

<!DOCTYPE html>
<html>
<head>

<!-- Tomado desde -->
<!-- https://www.educative.io/answers/how-to-create-a-timeline-in-html -->

<style>
.timeline {
  position: relative;
  max-width: 800px;
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
  margin-bottom: 50px;
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

.timeline-item.left .timeline-content {
  left: 70%;
}

.timeline-item.right .timeline-content {
  left: 20%;
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
</style>



  <title>Timeline</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
  <div class="timeline">
    <div class="timeline-item right">
      <div class="timeline-content">
        <div class="timeline-date">1849</div>
        <div class="timeline-description">Se instala en el Cerro Santa \nLucia un observatorio astronómico \na cargo del científico estadounidense James \nMelville Gillis. Este es el primer \nobservatorio de Latinoamérica</div>
        <div class="timeline-description">Event 2</div>
      </div>
    </div>
    <div class="timeline-item left">
      <div class="timeline-content">
        <div class="timeline-date">1850</div>
        <div class="timeline-description">Ignacio Domeyko propone la \ncompra de las instalaciones del Cerro \nSanta Lucia</div>
      </div>
    </div>
    <div class="timeline-item right">
      <div class="timeline-content">
        <div class="timeline-date">1852</div>
        <div class="timeline-description">Se inaugura el Observatorio Nacional mediante un Decreto del Presidente Manuel Montt'</div>
      </div>
    <div class="timeline-item right">
      <div class="timeline-content">
        <div class="timeline-date">1855</div>
        <div class="timeline-description">Se decreta el traslado del Observatorio Nacional al Parque Quinta Normal de Agricultura'</div>
    </div>
    </div>
  </div>
</body>
</html>
