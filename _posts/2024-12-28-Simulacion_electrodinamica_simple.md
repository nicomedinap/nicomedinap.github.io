---
layout: post
title: Visualizando el campo eléctrico
mathjax: true

---
{% include mathjax.html %}

\documentclass{article}
\usepackage{amsmath}
\usepackage{amssymb}
\usepackage{geometry}
\usepackage{graphicx}

\geometry{a4paper, margin=1in}
\title{Simulaciones de Campo Eléctrico y Movimiento de Partículas}
\author{}
\date{}

\begin{document}

\maketitle

\section*{Introducción}

En estas simulaciones, modelamos el movimiento de partículas cargadas bajo la influencia de sus interacciones mutuas, considerando el campo eléctrico resultante de sus posiciones y cargas. Además, utilizamos condiciones de borde cíclicas para simular un dominio continuo.

\section*{Ecuaciones Utilizadas}

\subsection*{Campo Eléctrico}

El campo eléctrico en un punto \((x, y)\) debido a \(N\) partículas cargadas se calcula a partir de la ley de Coulomb:

\[
\vec{E}(x, y) = \sum_{i=1}^N \frac{k q_i}{|\vec{r}_i|^3} \vec{r}_i,
\]

donde:
\begin{itemize}
    \item \(k = \frac{1}{4 \pi \epsilon_0}\) es la constante de Coulomb.
    \item \(q_i\) es la carga de la partícula \(i\).
    \item \(\vec{r}_i = (x - x_i, y - y_i)\) es el vector posición relativo entre el punto \((x, y)\) y la posición de la partícula \(i\).
    \item \(|\vec{r}_i| = \sqrt{(x - x_i)^2 + (y - y_i)^2}\) es la distancia entre el punto \((x, y)\) y la partícula \(i\).
\end{itemize}

\subsection*{Fuerzas y Movimiento de las Partículas}

Las partículas se mueven bajo la acción de las fuerzas eléctricas que ejercen unas sobre otras. La fuerza sobre una partícula \(i\) está dada por:

\[
\vec{F}_i = \sum_{\substack{j=1 \\ j \neq i}}^N \frac{k q_i q_j}{|\vec{r}_{ij}|^3} \vec{r}_{ij},
\]

donde:
\begin{itemize}
    \item \(\vec{r}_{ij} = \vec{r}_i - \vec{r}_j\) es el vector posición relativo entre las partículas \(i\) y \(j\).
    \item \(|\vec{r}_{ij}| = \sqrt{(x_i - x_j)^2 + (y_i - y_j)^2}\) es la distancia entre las partículas \(i\) y \(j\).
\end{itemize}

La aceleración de la partícula \(i\) se obtiene utilizando la segunda ley de Newton:

\[
\vec{a}_i = \frac{\vec{F}_i}{m},
\]

donde \(m\) es la masa de la partícula. Las posiciones y velocidades se actualizan en cada paso de tiempo utilizando:

\[
\vec{v}_i(t + \Delta t) = \vec{v}_i(t) + \vec{a}_i \Delta t,
\]
\[
\vec{r}_i(t + \Delta t) = \vec{r}_i(t) + \vec{v}_i(t) \Delta t.
\]

\subsection*{Condiciones de Borde Periódicas}

Para mantener las partículas dentro del dominio simulado, usamos condiciones de borde cíclicas. Si una partícula cruza un borde, reaparece en el lado opuesto. Matemáticamente, esto se expresa como:

\begin{itemize}
    \item En el eje \(x\):
    \[
    x \to x \mod \text{width}.
    \]
    \item En el eje \(y\):
    \[
    y \to y \mod \text{height}.
    \]
\end{itemize}

Esto garantiza que el dominio es efectivamente un toroide.

\section*{Visualización}

En la simulación, visualizamos:
\begin{itemize}
    \item Las posiciones de las partículas, con colores que indican el signo de su carga (rojo para cargas positivas y azul para cargas negativas).
    \item El campo eléctrico representado mediante líneas de corriente (\textit{streamlines}).
\end{itemize}

Además, añadimos una leyenda fuera del gráfico para indicar que las líneas representan el campo eléctrico.

\section*{Parámetros de Simulación}

\begin{itemize}
    \item Dimensiones del dominio: \( \text{width} = 10.0 \, \text{m}, \, \text{height} = 20.0 \, \text{m} \).
    \item Número de partículas: \(N = 40\).
    \item Paso de tiempo: \(\Delta t = 0.001 \, \text{s}\).
    \item Masa de cada partícula: \(m = 9.109 \times 10^{-31} \, \text{kg}\).
    \item Cargas: \(q = \pm 1.602 \times 10^{-19} \, \text{C}\).
    \item Factor de disipación: \(0.99\) (para simular pérdida de energía).
\end{itemize}

\section*{Conclusión}

La simulación ilustra cómo las partículas cargadas interactúan a través del campo eléctrico y cómo se puede modelar un dominio continuo utilizando condiciones de borde cíclicas. Estas herramientas permiten analizar sistemas dinámicos de múltiples partículas con interacciones complejas.

\end{document}
