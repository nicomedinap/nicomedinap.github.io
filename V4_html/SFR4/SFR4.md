---
layout: topbar
---

<html>
<head>
    <title>La Región de formación estelar 4 (SFR4)</title>
    <script type="text/javascript" src="https://aladin.cds.unistra.fr/AladinLite/api/v3/latest/aladin.js" charset="utf-8"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        /* Default styles for PC */
        #aladin-lite-div {
            width: 900px;
            height: 1000px;
            margin: auto;
        }

        /* Styles for smaller screens (phones) */
        @media only screen and (max-width: 600px) {
            #aladin-lite-div {
                width: 100%;
                height: 700px;
            }
        }

        /* Survey selection buttons inline */
        .survey-buttons {
            display: flex;
            gap: 10px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <!-- Page content -->
    <h1>La Región de formación estelar 4 (SFR4)</h1>

    <p>Nebulosa de la laguna, Nebula trífida:</p>

    <!-- Aladin Lite viewer -->
    <div id="aladin-lite-div"></div>

    <!-- Survey selection -->
    <div class="survey-buttons">
        <input id="DSS" type="radio" name="survey" value="P/DSS2/color">
        <label for="DSS">DSS color</label>
        <input id="2MASS" type="radio" name="survey" value="P/2MASS/color">
        <label for="2MASS">2MASS</label>
        <input id="allwise" type="radio" name="survey" value="P/allWISE/color">
        <label for="allwise">AllWISE</label>
    </div>

    <!-- JavaScript -->
    <script>
        $(document).ready(function() {
            // Initialize AladinLite
            let aladin = A.aladin('#aladin-lite-div', {
                survey: "P/DSS2/color",
                fov: 3.5,
                target: "18 06 03 -23 41 20"
            });

            // Fetch the JSON data
            $.getJSON('https://raw.githubusercontent.com/nicomedinap/nicomedinap.github.io/master/V4_html/SFR4/SFR4_coordinates.json')
            .done(function(data) {
                // Process the data and create markers
                let markers = data.data.map(item => A.marker(item[0], item[1], {popupTitle: item[2], popupDesc: 'Object details'}));

                // Create a marker layer and add markers
                let markerLayer = A.catalog();
                markerLayer.addSources(markers);

                // Add marker layer to AladinLite
                aladin.addCatalog(markerLayer);
            })
            .fail(function() {
                console.error("Failed to fetch data from JSON.");
            });
            
            // Update survey image on radio button change
            $('input[name=survey]').change(function() {
                aladin.setImageSurvey($(this).val());
            });
        });
    </script>
</body>
</html>
