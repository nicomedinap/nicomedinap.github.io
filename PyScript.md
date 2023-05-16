---
layout: page
title: PyScript
---

Este lugar estará destinado a probar las utilidades de pyscript: python ejecutado en html. Al parecer es normal que tarde unos segundos en ejecutarse.

Una linea de código al día :)

<html>

  <head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />

  <title>Writing to the page</title>

  <link rel="stylesheet" href="https://pyscript.net/latest/pyscript.css" />
  <script defer src="https://pyscript.net/latest/pyscript.js"></script>
  </head>

  <body>
  <py-script>
  	print("hola mundo")
    import numpy as np
    import matplotlib as plt

    x = np.linspace(0,100,5)
    plt.plot(np.cos(x), x,'r-', label='hola, soy una leyenda')
    plt.legend(loc="best")
    plt.show()

	</py-script>
  </body>
</html>