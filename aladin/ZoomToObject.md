---
layout: topbar
---

<html>
<head>
    <title>Zoom en Aladin</title>
    <script type="text/javascript" src="https://aladin.cds.unistra.fr/AladinLite/api/v3/latest/aladin.js" charset="utf-8"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        /* Default styles */
        #aladin-lite-div {
            width: 500px;
            height: 800px;
            margin: auto;
        }

        /* Survey buttons container */
        .survey-buttons {
            text-align: center;
            margin-top: 20px;
        }

        .survey-buttons input {
            margin: 0 10px;
        }

        /* Styles for smaller screens (phones) */
        @media only screen and (max-width: 600px) {
            #aladin-lite-div {
                width: 100%;
                height: 600px;
            }
            
            .survey-buttons {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
            }

            .survey-buttons input {
                margin: 5px;
            }
        }
    </style>
</head>
<body>
    <!-- Page content -->
    <h1>Zoom en Aladin</h1>

    <!-- Aladin Lite viewer -->
    <div id="aladin-lite-div"></div>

    <!-- Survey selection buttons -->
    <div class="survey-buttons">
        <input id="DSS" type="radio" name="survey" value="P/DSS2/color" checked><label for="DSS">DSS color</label>
        <input id="2MASS" type="radio" name="survey" value="P/2MASS/color"><label for="2MASS">2MASS</label>
        <input id="allwise" type="radio" name="survey" value="P/allWISE/color"><label for="allwise">AllWISE</label>
    </div>

    <!-- JavaScript -->
    <script>
        $(document).ready(function() {
            // Initialize AladinLite with a large FoV
            let aladin = A.aladin('#aladin-lite-div', {
                survey: "P/DSS2/color",
                fov: 60,  // Start with a large FoV (60 degrees)
                target: "271.259639 -24.417031"  // Coordinates to center on
            });

            let targetCoords = "271.259639 -24.417031";
            let finalFov = 0.1;  // Final FoV after zooming in
            let zoomSpeed = 0.98;  // Zoom speed factor (closer to 1 means slower zoom)
            let intervalTime = 50;  // Time in milliseconds between each zoom step

            let zoomInterval = setInterval(function() {
                let currentFov = aladin.getFov()[0];  // Get the current FoV
                
                if (currentFov > finalFov) {
                    // Zoom in by reducing the FoV
                    aladin.setFov(currentFov * zoomSpeed);
                } else {
                    // Stop the zooming animation
                    clearInterval(zoomInterval);
                    // Optionally, center precisely on the target object
                    aladin.gotoObject(targetCoords);
                }
            }, intervalTime);

            // Update survey image on radio button change
            $('input[name=survey]').change(function() {
                let selectedSurvey = $(this).val();
                aladin.setImageSurvey(selectedSurvey);
            });
        });
    </script>
</body>
</html>
