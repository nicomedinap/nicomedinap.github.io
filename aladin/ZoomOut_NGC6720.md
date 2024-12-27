<!DOCTYPE html>
<html lang="es">

<head>
    <title>Zoom en Aladin</title>
    <script type="text/javascript" src="https://aladin.cds.unistra.fr/AladinLite/api/v3/latest/aladin.js" charset="utf-8"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://nicomedinap.github.io/decosmos/PublicCSS/Zoom.css">
</head>
<body>

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
        </select>
        <input id="ra" type="text" placeholder="Enter RA (degrees)" />
        <input id="dec" type="text" placeholder="Enter Dec (degrees)" />
        <button id="start-zoom">Hacer Zoom</button>
    </div>

    <!-- JavaScript -->
<script>
    $(document).ready(function() {
        // Initialize AladinLite with a small FoV
        let aladin = A.aladin('#aladin-lite-div', {
            survey: "P/DSS2/color",
            fov: 0.1,  // Start with a small FoV
            target: "283.39504 +33.02932"  // Initial coordinates to center on
        });

        let initialFov = 0.1;  // Initial small FoV
        let maxFov = 180;  // Maximum FoV after zooming out
        let zoomSpeed = 1.02;  // Zoom speed factor (greater than 1 means zooming out)
        let intervalTime = 50;  // Time in milliseconds between each zoom step
        let zoomInterval;


        // Display the image and start the fade-in effect
        aladin.displayJPG('https://cdn.esawebb.org/archives/images/screen/weic2320b.jpg', null, function(ra, dec, fov) {
            // Set up the overlay and initialize opacity to 0
            //overlay = aladin.getOverlayImageLayer();
            let overlay = aladin.getOverlayImageLayer(); // Obtener el overlay de imagen
            overlay.setOpacity(0.7); // Fijar la opacidad al 50%
            fadeInImage();
            return true;
            });




        function startZoomOut(targetCoords) {
            clearInterval(zoomInterval);  // Clear any previous zoom intervals
            aladin.gotoObject(targetCoords);  // Go to the new coordinates
            aladin.setFov(initialFov);  // Reset the FoV to the initial small value 

            zoomInterval = setInterval(function() {
                let currentFov = aladin.getFov()[0];  // Get the current FoV
                
                if (currentFov < maxFov) {
                    // Zoom out by increasing the FoV
                    aladin.setFov(currentFov * zoomSpeed);
                } else {
                    // Stop the zooming animation
                    clearInterval(zoomInterval);
                }
            }, intervalTime);
        }

        // Automatic zoom out after 5 seconds
        setTimeout(function() {
            let targetCoords = "283.39504 +33.02932";  // Coordinates 
            startZoomOut(targetCoords);
        }, 6000);

        // Event handler for the Start Zoom button
        $('#start-zoom').click(function() {
            let ra = $('#ra').val().trim();
            let dec = $('#dec').val().trim();
            
            if (ra && dec) {
                let targetCoords = `${ra} ${dec}`;
                startZoomOut(targetCoords);
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