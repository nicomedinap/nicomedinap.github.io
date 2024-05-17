---
layout: post
title: PyScript
---
<html>
<head>
<script defer src="https://pyscript.net/alpha/pyscript.min.js"></script>
<py-env>
    - numpy
    - matplotlib
</py-env>
</head>

<body>

<h1 style="font-size:12px">Este lugar estara destinado a probar las utilidades de pyscript: python ejecutado en html. 
    Al parecer es normal que tarde unos segundos en ejecutarse.
</h1>

<div id="animation"></div>

<py-script output="animation">
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import animation

plt.style.use('dark_background')

# Número de objetos:
N = 1
# gravedad
g = 9.8       
# Tamaño de la caja:
Lx = 5           
Ly = 10
# Radio de la pelota:
R = 0.2
# energía retenida:
E_retenida = 0.8
# paso temporal Delta t:
dt = 0.02
Dt = dt
# Número de epocas:
Nt = 800
# Masa:
m = 1

np.random.seed(N)

# Se elige la posición y velocidad de forma random:
x = 2.
y = 8.

# Calculamos las componentes individuales
v_init = 25
theta = 10
vx = v_init * np.cos(np.radians(theta))
vy = v_init * np.sin(np.radians(theta))

# Iniciamos el plot y metodo quiver para visualizar:
fig, ax = plt.subplots(figsize=(3.5, 6), dpi=100)

# Funciones para calcular la energía cinética y potencial:
def E_cinetica(vx, vy): return 0.5 * m * (vx**2 + vy**2)
def E_potencial(h): return m * h * g

# Función para crear el video:
def dibujar_plot(frame):
    global x, y, Lx, Ly, vx, vy, Dt, E_retenida

    # Limpiamos el grafico:
    ax.clear()
    ax.set_title(r'Pelota elástica sometida a un campo gravitatorio $\vec{g}$', fontsize=7)
    ax.set_xlim(0, Lx)
    ax.set_ylim(0, Ly)
    
    # Colisiones:
    if (y + R) >= Ly: 
        vy = -vy
        y = y - R / 4
        
    if (y - R) <= 0:
        vy = -E_retenida * vy
        y = y + R / 4
    
    if (x + R) >= Lx:
        x = x - R / 4
        vx = -vx * E_retenida
    if (x - R) <= 0:
        vx = -vx * E_retenida
        x = x + R / 4
            
    # Actualizamos la posición     
    y += vy * dt - (1 / 2.) * g * dt**2
    x += vx * dt

    # Actualizamos la velocidad:    
    vy += -g * dt

    # Calculamos la energia:
    Ecinetica = E_cinetica(vx, vy)
    Epotencial = E_potencial(y - R)
    
    Dt += dt
    
    plt.plot(x, y, 'ro', ms=15, mec='w')
    ax.quiver(x, y, vx, vy, color='yellow', scale=45, width=0.005)    
    
    ax.annotate(r'$E_{cinética}$=%0.1f' % Ecinetica, xy=(0.73, 0.97), xycoords='axes fraction', color='y', fontsize=6)
    ax.annotate(r'$E_{potencial}$=%0.1f' % Epotencial, xy=(0.73, 0.94), xycoords='axes fraction', color='r', fontsize=6)
    
    E_tot = Ecinetica + Epotencial
    ax.annotate(r'$E_{total}$=%0.1f' % E_tot, xy=(0.74, 0.89), xycoords='axes fraction', color='w', fontsize=7)
    
    if E_tot < 1.5:
        E_retenida = 0.3
    
    ax.set_aspect('equal')
    ax.tick_params(axis="x", labelsize=0)
    ax.get_yaxis().set_visible(False)
    ax.set_xlabel('tiempo t=%.1f [s]' % Dt)

ani = animation.FuncAnimation(fig, dibujar_plot, frames=Nt, interval=100)
ani.save('animation.mp4', writer='ffmpeg', fps=30, dpi=300)

from IPython.display import Video
Video("animation.mp4")
</py-script>

</body>
</html>
