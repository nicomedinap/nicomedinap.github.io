---
layout: page
title: Catálogo V⁴
---
El Catálogo V⁴ contendrá la información que he sa recolectado usando el método descrito en [mi primer paper](https://arxiv.org/pdf/1806.04061.pdf){:target="_blank"}, usando los datos disponibles en la base de datos VVV.
Para cada tile analizado, habrá un link donde estarán disponibles todas las curvas de luz dentro del catálogo, y un plot con la serie de tiempo.





* [d001](https://nicomedinap.github.io/V4_html/Variables_d001.html){:target="_blank"}
* [d002](https://nicomedinap.github.io/V4_html/Variables_d002.html){:target="_blank"}

* [d045]
* [d046]
* [d083]
* [d084]





<html>
  <head>
    <title>N-Body Simulation</title>
    <script type="module">
      import pyscript as ps
      import random
      
      // Define some constants
      G = 6.674e-11;  // Gravitational constant
      dt = 3600;  // Time step
      
      // Define the Body class
      class Body {
        constructor(x, y, mass, vx=0, vy=0) {
          this.x = x;
          this.y = y;
          this.mass = mass;
          this.vx = vx;
          this.vy = vy;
        }
        
        // Calculate the force exerted on this body by another body
        forceFrom(other) {
          const dx = other.x - this.x;
          const dy = other.y - this.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const force = G * this.mass * other.mass / (dist * dist);
          const theta = Math.atan2(dy, dx);
          const fx = force * Math.cos(theta);
          const fy = force * Math.sin(theta);
          return [fx, fy];
        }
        
        // Update this body's position and velocity based on the forces exerted by other bodies
        update(bodies) {
          let fx = 0;
          let fy = 0;
          for (const other of bodies) {
            if (other !== this) {
              const [f1, f2] = this.forceFrom(other);
              fx += f1;
              fy += f2;
            }
          }
          const ax = fx / this.mass;
          const ay = fy / this.mass;
          this.vx += ax * dt;
          this.vy += ay * dt;
          this.x += this.vx * dt;
          this.y += this.vy * dt;
        }
      }
      
      // Create the canvas
      const canvas = ps.createCanvas(600, 400);
      ps.appendToElement(canvas, document.body);
      
      // Create some random bodies
      const bodies = [];
      for (let i = 0; i < 10; i++) {
        const x = random.uniform(50, 550);
        const y = random.uniform(50, 350);
        const mass = random.uniform(1e5, 1e6);
        const vx = random.uniform(-100, 100);
        const vy = random.uniform(-100, 100);
        bodies.push(new Body(x, y, mass, vx, vy));
      }
      
      // Define the draw function
      function draw() {
        ps.clear();
        ps.stroke(255);
        for (const body of bodies) {
          ps.circle(body.x, body.y, Math.log10(body.mass));
        }
        for (const body of bodies) {
          body.update(bodies);
          ps.stroke(255);
          for (const other of bodies) {
            if (other !== body) {
              ps.line(body.x, body.y, other.x, other.y);
            }
          }
        }
        ps.requestAnimationFrame(draw);
      }
      
      // Start the animation loop
      draw();
    </script>
  </head>
  <body>
  </body>
</html>