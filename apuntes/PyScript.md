---
layout: post
title: PyScript
---

Este lugar estará destinado a probar las utilidades de pyscript: python ejecutado en html. Al parecer es normal que tarde unos segundos en ejecutarse.

<html>
<head>
<!--code at: https://github.com/ostad-ai/Miscellaneous-->
<script defer src="https://pyscript.net/alpha/pyscript.min.js"></script>

<py-env>
    - matplotlib
    - numpy

</py-env>

<py-config>
    packages = [
        "numpy",
        "matplotlib.pyplot"
        "matplotlib.animations"
        "collections"
    ]
    plugins = [
        "https://pyscript.net/latest/plugins/python/py_tutor.py"
    ]
</py-config>


<py-env>
- sentence-transformers
</py-env>

<style>
    div.mydiv{padding:20px;}
    h1{text-align:center; color:#00ccff;}
</style>

</head>
<body>

<div class="mydiv" id="py-out"></div>

<h1> Creamos un plot simple de matplotlib, unsando numpy:</h1>


<py-script output="matplotlib-bar">
    # Python Code
    # importing the matplotlib library
    import matplotlib.pyplot as plt
    fig, ax = plt.subplots()
    # x axis
    x = ["Python", "C++", "JavaScript", "Golang"]
    # y axis
    y = [10, 5, 9, 7]
    plt.bar(x, y)
    # Naming the x-label
    plt.xlabel('Language')
    # Naming the y-label
    plt.ylabel('Score')
    # Naming the title of the plot
    plt.title('Language vs Score')
    plt.show()
</py-script>

<div id="matplotlib-bar"></div>

</body>
</html>



