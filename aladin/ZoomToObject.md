---
layout: topbar
---

<html>
<head>
    <title>Aladin Zoom Animation</title>
    <script type="text/javascript" src="https://aladin.cds.unistra.fr/AladinLite/api/v3/latest/aladin.js" charset="utf-8"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        #aladin-lite-div {
            width: 100%;
            height: 1000px;
            margin: auto;
        }
    </style>
</head>
<body>
    <!-- Page content -->
    <h1>Zoom Animation to Object</h1>

    <!-- Aladin Lite viewer -->
    <div id="aladin-lite-div"></div>

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
        });
    </script>
</body>
</html>
