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
    packages = [
      "https://cdn.holoviz.org/panel/0.14.3/dist/wheels/bokeh-2.4.3-py3-none-any.whl",
      "numpy","panel==0.14.1"]
    plugins = [
      "https://pyscript.net/latest/plugins/python/py_tutor.py"]      
  </py-config>

  <py-script>
    import panel as pn

    slider = pn.widgets.FloatSlider(start=0, end=10, name='Amplitude')

    def callback(new):
      return f'Amplitude is: {new}'

    pn.Row(slider, pn.bind(callback, slider)).servable(target='simple_app');
  </py-script>

</html>