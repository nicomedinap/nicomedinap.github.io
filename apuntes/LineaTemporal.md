---
layout: post
title: PyScript
---

<!DOCTYPE html>
<html>
<head>

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
        <div class="timeline-date">2022</div>
        <div class="timeline-description">Event 1</div>
        <div class="timeline-description">Event 2</div>
        <div class="timeline-description">Event 3</div>
      </div>
    </div>
    <div class="timeline-item left">
      <div class="timeline-content">
        <div class="timeline-date">2023</div>
        <div class="timeline-description">Event 2</div>
      </div>
    </div>
    <div class="timeline-item right">
      <div class="timeline-content">
        <div class="timeline-date">2024</div>
        <div class="timeline-description">Event 3</div>
      </div>
    </div>
  </div>
</body>
</html>
