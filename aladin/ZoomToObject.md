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

        /* Centered title */
        h1 {
            text-align: center;
        }

        /* Survey buttons container */
        .survey-buttons {
            text-align: center;
            margin-top: 20px;
        }

        .survey-buttons input {
            margin: 0 10px;
        }

        /* Coordinates input and button */
        .coord-input {
            text-align: center;
            margin-top: 20px;
        }

        /* Styles for smaller screens (phones) */
        @media only screen and (max-width: 600px) {
            #aladin-lite-div {
                width: 100%;
                height: 600px;
            }

            .survey-buttons, .coord-input {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
            }

            .survey-buttons input, .coord-input input, .coord-input select {
                margin: 5px;
            }
        }
    </style>
</head>
<body>
    <!-- Centered title -->
    <h1>Zoom a objeto astronómico usando Aladin</h1>

    <!-- Aladin Lite viewer -->
    <div id="aladin-lite-div"></div>

    <!-- Survey selection buttons -->
    <div class="survey-buttons">
        <input id="DSS" type="radio" name="survey" value="P/DSS2/color" checked><label for="DSS">DSS color</label>
        <input id="2MASS" type="radio" name="survey" value="P/2MASS/color"><label for="2MASS">2MASS</label>
        <input id="allwise" type="radio" name="survey" value="P/allWISE/color"><label for="allwise">AllWISE</label>
    </div>

    <!-- Coordinate input fields, suggestions, and button -->
    <div class="coord-input">
        <select id="object-select">
            <option value="" disabled selected>Elige un objeto popular</option>
            <option value="10.6847083 41.2690650">Andrómeda (M31)</option>
            <option value="201.3650633 -43.0191122">Omega Centauri</option>
            <option value="83.8220833 -5.3911111">Nebulosa de Orión (M42)</option>
            <option value="187.2779159 2.0523872">Cúmulo de Virgo (M87)</option>
            <option value="271.259639 -24.417031">SMACS 0723</option>
            <option value="344.076 -60.375">NGC 3132 - Nebulosa del Anillo del Sur</option>
            <option value="56.625 24.175">Stephan's Quintet</option>
            <option value="330.765 41.438">NGC 6822</option>
            <option value="314.972 -73.296">NGC 104 - 47 Tucanae</option>
            <option value="210.802 54.348">M13 - Cúmulo de Hércules</option>
            <option value="202.469 47.195">M51 - Galaxia del Remolino</option>
            <option value="266.416 -29.007">Sagittarius A*</option>
            <option value="287.466 43.946">NGC 6946 - Galaxia del Fuegos Artificiales</option>
            <option value="37.768 -13.503">NGC 2024 - Nebulosa de la Flama</option>
            <option value="204.253 48.691">M101 - Galaxia del Molinete</option>
            <option value="149.417 2.080">NGC 4038/4039 - Galaxias Antena</option>
            <option value="52.712 -27.691">GN-z11</option>
            <option value="343.00 -17.50">NGC 1365</option>
            <option value="150.025 2.087">MACS J1149.5+2223</option>
            <option value="83.633083 -5.3911111">Trapezium Cluster (Theta1 Ori)</option>
        </select>
        <input id="ra" type="text" placeholder="Enter RA (degrees)" />
        <input id="dec" type="text" placeholder="Enter Dec (degrees)" />
        <button id="start-zoom">Hacer Zoom</button>
    </div>

    <!-- JavaScript -->
    <script>
        $(document).ready(function() {
            // Initialize AladinLite with a large FoV
            let aladin = A.aladin('#aladin-lite-div', {
                survey: "P/DSS2/color",
                fov: 60,  // Start with a large FoV (60 degrees)
                target: "271.259639 -24.417031"  // Initial coordinates to center on
            });

            let finalFov = 0.1;  // Final FoV after zooming in
            let zoomSpeed = 0.98;  // Zoom speed factor (closer to 1 means slower zoom)
            let intervalTime = 50;  // Time in milliseconds between each zoom step
            let zoomInterval;

            // Function to start the zoom animation
            function startZoom(targetCoords) {
                clearInterval(zoomInterval);  // Clear any previous zoom intervals
                aladin.gotoObject(targetCoords);  // Go to the new coordinates
                aladin.setFov(60);  // Reset the FoV to the initial large value

                zoomInterval = setInterval(function() {
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
            }

            // Event handler for the Start Zoom button
            $('#start-zoom').click(function() {
                let ra = $('#ra').val().trim();
                let dec = $('#dec').val().trim();
                
                if (ra && dec) {
                    let targetCoords = `${ra} ${dec}`;
                    startZoom(targetCoords);
                } else {
                    alert("Please enter valid RA and Dec coordinates.");
                }
            });

            // Event handler for the object selection dropdown
            $('#object-select').change(function() {
                let coords = $(this).val().split(" ");
                $('#ra').val(coords[0]);
                $('#dec').val(coords[1]);
            });

            // Update survey image on radio button change
            $('input[name=survey]').change(function() {
                let selectedSurvey = $(this).val();
                aladin.setImageSurvey(selectedSurvey);
            });
        });
    </script>
</body>
</html>
