---
layout: post
title: PyScript
---

Este lugar estará destinado a probar las utilidades de pyscript: python ejecutado en html. Al parecer es normal que tarde unos segundos en ejecutarse.

Una linea de código al día :)

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
        "https://cdn.holoviz.org/panel/0.14.3/dist/wheels/bokeh-2.4.3-py3-none-any.whl",
        "numpy",
        "matplotlib"
        "pandas",
        "panel==0.13.1"
    ]
    plugins = [
        "https://pyscript.net/latest/plugins/python/py_tutor.py"
    ]
</py-config>

<style>
    div.mydiv{padding:20px;}
    h1{text-align:center; color:#00ccff;}
</style>

</head>
<body>

<div class="mydiv" id="py-out"></div>

<h1> Creamos un plot simple de matplotlib, unsando numpy:</h1>

<py-script output="py-out">
    import matplotlib.pyplot as plt
    import numpy as np

    plt.figure(figsize=(10,5))
    xs = np.linspace(0,2*np.pi,100)
    ys = np.sin(xs); 
    zs = np.cos(xs);
    plt.plot(xs,ys,c='red',label='y=sin(x)')
    plt.plot(xs,zs,c='blue',label='y=cos(x)')
    plt.legend();fig
</py-script>



<py-script>
    import panel as pn
    import numpy as np
    import pandas as pd

    from bokeh.models import ColumnDataSource
    from bokeh.plotting import figure

    df = pd.DataFrame(np.random.randn(10, 4), columns=list('ABCD')).cumsum()

    rollover = pn.widgets.IntInput(name='Rollover', value=15)
    follow = pn.widgets.Checkbox(name='Follow', value=True, align='end')

    tabulator = pn.widgets.Tabulator(df, height=450, width=400).servable(target='table')

    def color_negative_red(val):
        """
        Takes a scalar and returns a string with
        the css property `'color: red'` for negative
        strings, black otherwise.
        """
        color = 'red' if val &lt; 0 else 'green'
        return 'color: %s' % color

    tabulator.style.applymap(color_negative_red)

    p = figure(height=450, width=600)

    cds = ColumnDataSource(data=ColumnDataSource.from_df(df))

    p.line('index', 'A', source=cds, line_color='red')
    p.line('index', 'B', source=cds, line_color='green')
    p.line('index', 'C', source=cds, line_color='blue')
    p.line('index', 'D', source=cds, line_color='purple')

    def stream():
        data = df.iloc[-1] + np.random.randn(4)
        tabulator.stream(data, rollover=rollover.value, follow=follow.value)
        value = {k: [v] for k, v in tabulator.value.iloc[-1].to_dict().items()}
        value['index'] = [tabulator.value.index[-1]]
        cds.stream(value)

    cb = pn.state.add_periodic_callback(stream, 200)

    pn.pane.Bokeh(p).servable(target='plot')
    pn.Row(cb.param.period, rollover, follow, width=400).servable(target='controls')
</py-script>

</body>
</html>