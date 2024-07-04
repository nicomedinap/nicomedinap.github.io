---
layout: topbar
---

<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Generador de Preguntas</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        #question-container {
            margin-top: 20px;
        }
        #question {
            font-size: 1.2em;
            font-weight: bold;
        }
        #options {
            list-style-type: none;
            padding: 0;
        }
        #options li {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <h1>Generador de Preguntas</h1>
    <button id="suggest-question">Sugerir pregunta</button>
    <div id="question-container" style="display: none;">
        <p id="question"></p>
        <ul id="options"></ul>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const suggestQuestionButton = document.getElementById('suggest-question');
            const questionContainer = document.getElementById('question-container');
            const questionElement = document.getElementById('question');
            const optionsElement = document.getElementById('options');
            
            let questions = [];

            // Función para obtener el archivo JSON desde la URL
            async function fetchQuestions() {
                try {
                    const response = await fetch('https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/apuntes/JavaScript/SugerirPreguntas/preguntas_astronomicas.json');
                    questions = await response.json();
                } catch (error) {
                    console.error('Error al cargar las preguntas:', error);
                }
            }

            // Función para mostrar una pregunta al azar
            function showRandomQuestion() {
                if (questions.length === 0) {
                    questionElement.textContent = 'No se pudieron cargar las preguntas.';
                    optionsElement.innerHTML = '';
                    return;
                }

                const randomIndex = Math.floor(Math.random() * questions.length);
                const question = questions[randomIndex];
                questionElement.textContent = question.question;
                optionsElement.innerHTML = '';
                question.options.forEach(option => {
                    const li = document.createElement('li');
                    li.textContent = option;
                    optionsElement.appendChild(li);
                });
                questionContainer.style.display = 'block';
            }

            // Evento para cargar una nueva pregunta al hacer clic en el botón
            suggestQuestionButton.addEventListener('click', showRandomQuestion);

            // Cargar las preguntas cuando se carga la página
            fetchQuestions();
        });
    </script>
</body>
</html>
