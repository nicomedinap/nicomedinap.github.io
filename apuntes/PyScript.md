---
layout: post
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


  <py-config>
    packages = ["matplotlib", "numpy"]
  </py-config>

  <body>
  <py-script>
    import matplotlib.pyplot as plt
    import numpy as np

  	print("hola mundo")

    x = np.linspace(0,30,100)
    y = np.cos(x)

    plt.plot(y,x,"r-")

	</py-script>
  </body>
</html>