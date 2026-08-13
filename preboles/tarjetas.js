(function () {
    'use strict';

    // ============================================================================
    // CONFIGURACIÓN
    // ============================================================================

    const BATCH_SIZE = 4;
    const DELAY_MS   = 60;

    window.cardPredictionMode = 'sunset';

    // ============================================================================
    // ESTILOS POR NIVEL DE PROBABILIDAD
    // ============================================================================

    function getProbabilityStyles(probability) {
        const p = probability * 100;
        let background, border, boxShadow, color = '#ffffff';

        if (p > 70) {
            background = 'rgba(255, 80, 80, 0.55)';
            boxShadow  = '0 4px 16px rgba(255, 80, 80, 0.1)';
            border     = '1px solid rgba(255, 80, 80, 0.3)';
        } else if (p > 50) {
            background = 'rgba(255, 165, 0, 0.3)';
            boxShadow  = '0 4px 16px rgba(255, 165, 0, 0.2)';
            border     = '1px solid rgba(255, 165, 0, 0.2)';
        } else if (p > 30) {
            background = 'rgba(255, 200, 0, 0.25)';
            border     = '1px solid rgba(255, 200, 0, 0.2)';
        } else if (p > 15) {
            background = 'rgba(200, 200, 255, 0.15)';
            border     = '1px solid rgba(200, 200, 255, 0.1)';
        } else {
            background = 'rgba(255, 255, 255, 0.05)';
            border     = '1px solid rgba(255, 255, 255, 0.05)';
        }

        return { background, border, color, boxShadow };
    }

    // ============================================================================
    // HELPERS DE DATOS
    // ============================================================================

    function getMomentPrediction(probs) {
        return window.cardPredictionMode === 'sunrise' ? probs.sunrise : probs.sunset;
    }

    function getMomentData(probs) {
        return window.cardPredictionMode === 'sunrise' ? probs.sunriseMoment : probs.sunsetMoment;
    }

    let _isSmallMobile = window.matchMedia('(max-width: 400px)').matches;
    let _isMobile      = window.matchMedia('(max-width: 768px)').matches;

    window.matchMedia('(max-width: 400px)').addEventListener('change', e => { _isSmallMobile = e.matches; });
    window.matchMedia('(max-width: 768px)').addEventListener('change', e => { _isMobile = e.matches; });

    function _probabilityFontSize(value) {
        const pct = Math.max(0, Math.min(50, value ?? 0));
        const t = pct / 30; // 0..1

        let min, max;
        if (_isSmallMobile)     { min = 0.75; max = 1.0;  }
        else if (_isMobile)     { min = 0.85; max = 1.15; }
        else                    { min = 1.6;  max = 2.3;  }

        return `${(min + t * (max - min)).toFixed(2)}rem`;
    }


    // Tamaño del mensaje de advertencia proporcional al grado de bloqueo
    function _visibilityFontSize(weighted) {
        const CAP = 0.7; // tope de normalización: valores típicos rara vez superan esto (?)
        const t = Math.max(0, Math.min(1, (weighted ?? 0) / CAP));

        let min, max;
        if (_isSmallMobile)      { min = 0.55; max = 0.72; }
        else if (_isMobile)      { min = 0.6;  max = 0.8;  }
        else                    { min = 0.8;  max = 1.05; }

        return `${(min + t * (max - min)).toFixed(2)}rem`;
    }

    function getIrradianceText(shortwave) {        if (shortwave == null) return 'Sin datos';
        if (shortwave >= 700) return 'Iluminación excelente';
        if (shortwave >= 500) return 'Buena iluminación';
        if (shortwave >= 300) return 'Iluminación moderada';
        return 'Iluminación débil';
    }

    // para hacer el texto más grande cuanto más probable es el bloqueo.
    function getWarningText(prediction) {
        if (!prediction) return { text: '', weighted: 0 };
        if (prediction.blockers?.length) {
            const b = prediction.blockers[0];
            return { text: '⚠ ' + b.label, weighted: b.weighted ?? 0.5 };
        }
        const irrUnc = prediction.factors?.find(f => f.isUncertainty);
        if (irrUnc) {
            // o el detalle en W/m²
            return { text: 'MALA VISIBILIDAD', weighted: irrUnc.weighted ?? 0 };
        }
        return { text: '✓ Sin limitaciones importantes', weighted: 0 };
    }

    // ============================================================================
    // RENDERIZADO DE TARJETAS
    // ============================================================================

    // Escalón de tamaño según el largo total del nombre.
    // Los cortos usan la fuente más grande porque igual les sobra la fila entera.
    function _nameSizeClass(name) {
        const len = name.length;
        if (len > 26) return 'city-name--xs';
        if (len > 20) return 'city-name--sm';
        if (len > 15) return 'city-name--md';
        return 'city-name--lg';
    }

    function _cardSkeleton(displayLabel, regionLabel, weatherCamera) {
        const safeLabel = displayLabel && displayLabel.trim() ? displayLabel : 'Ubicación sin nombre';
        const cameraIcon = weatherCamera
            ? `<a href="${weatherCamera}" target="_blank" rel="noopener" class="webcam-link" title="Ver cámara en vivo" onclick="event.stopPropagation()">📷</a>`
            : '';

        return `
            <div class="card-header">
                <div class="card-info">
                    <div class="city-region">${regionLabel || ''}</div>
                </div>
                <div class="card-score">
                    <div class="probability-big"><span class="probability-value">--</span>%</div>
                    <div class="probability-uncertainty">&nbsp;</div>
                </div>
            </div>
            <div class="city-name-row">
                <div class="city-name ${_nameSizeClass(safeLabel)}">${safeLabel}</div>
                ${cameraIcon}
            </div>
            <div class="card-meta">
                <div class="meta-row time-row">🕐 --:--</div>
                <div class="meta-row visibility-row">Calculando...</div>
            </div>
            <div class="probability-bar" style="width: 0%"></div>
        `;
    }

    function _renderCityCard(nombre, info) {
        const card = document.createElement('div');
        card.className = 'city-card';
        card.dataset.cityName = nombre;
        card.innerHTML = _cardSkeleton(nombre, info?.region, info?.weatherCamera);
        card.addEventListener('click', () => showPrediction(nombre, 'city'));
        return card;
    }

    function _renderObservatoryCard(nombre, info) {
        const displayName = nombre.replace('Observatorio ', '');
        const regionLabel = info?.altitude
            ? `${info.region} · ${info.altitude.toLocaleString()} m`
            : info?.region;

        const card = document.createElement('div');
        card.className = 'city-card';
        card.dataset.cityName = nombre;
        card.innerHTML = _cardSkeleton(`${displayName}`, regionLabel, info?.weatherCamera);
        card.addEventListener('click', () => showPrediction(nombre, 'observatory'));
        return card;
    }

    // ============================================================================
    // ACTUALIZACIÓN DE TARJETAS INDIVIDUALES
    // ============================================================================

    function _findCard(containerSelector, nombre) {
        return document.querySelector(`${containerSelector} .city-card[data-city-name="${CSS.escape(nombre)}"]`);
    }

    function _asPercent(n) {
        if (n == null) return null;
        return n <= 1 ? Math.round(n * 100) : Math.round(n);
    }

    function _formatTime(raw) {
        if (!raw) return '--:--';
        if (raw instanceof Date) {
            return raw.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
        }
        const d = new Date(raw);
        if (!isNaN(d)) return d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
        return String(raw);
    }

    // Pinta la tarjeta según window.cardPredictionMode. 
    function _applyProbabilityToCard(card, probs) {
        const prediction = getMomentPrediction(probs);
        const moment      = getMomentData(probs);

        if (!prediction) {
            _applyErrorToCard(card);
            return;
        }

        const value = _asPercent(prediction.probability);

        card.querySelector('.probability-value').textContent = value ?? '--';

        const probBig = card.querySelector('.probability-big');
        if (probBig) probBig.style.fontSize = _probabilityFontSize(value);

        card.querySelector('.probability-uncertainty').innerHTML = '&nbsp;';

        const timeRow = card.querySelector('.time-row');
        if (timeRow) timeRow.textContent = `🕐 ${_formatTime(moment?.optimalTime)}`;

        const visRow = card.querySelector('.visibility-row');
        if (visRow) {
            const warning = getWarningText(prediction);
            visRow.textContent = warning.text;
            visRow.style.fontSize = _visibilityFontSize(warning.weighted);
        }

        // Barra de probabilidad (la franja verde→amarillo→rojo)
        const bar = card.querySelector('.probability-bar');
        if (bar) bar.style.width = `${value ?? 0}%`;

        const styles = getProbabilityStyles((value ?? 0) / 100);
        card.style.background = styles.background;
        card.style.border     = styles.border    || '';
        card.style.boxShadow  = styles.boxShadow || 'none';
    }

    function _applyErrorToCard(card) {
        const visRow = card.querySelector('.visibility-row');
        if (visRow) visRow.textContent = 'Error al cargar';
        card.style.background = 'rgba(255, 0, 0, 0.1)';
    }

    // ============================================================================
    // OBTENCIÓN DE PROBABILIDADES
    // ============================================================================

    async function _computeCardProbability(info) {
        if (!window.PrebolesPredictor?.getProbabilities) {
            console.error(
                'Falta window.PrebolesPredictor.getProbabilities(lat, lon). ' +
                'Revisa que el módulo predictor esté cargado antes que test_tarjetas.js.'
            );
            return null;
        }
        return window.PrebolesPredictor.getProbabilities(info.lat, info.lon, {
            altitude: info.altitude || 0,
            nSimulations: 20 // liviano vs. 200 del detalle — ajusta si va lento en batch
        });
    }

    async function _loadCard(nombre, info, containerSelector, isObservatory, checkActiveFn) {
        if (checkActiveFn && !checkActiveFn()) return;

        const card = _findCard(containerSelector, nombre);
        if (!card) return;

        try {
            const probs = await _computeCardProbability(info);
            if (!probs) { _applyErrorToCard(card); return; }

            card._prediction = probs;
            _applyProbabilityToCard(card, probs);
        } catch (err) {
            console.error(`Error cargando ${nombre}:`, err);
            _applyErrorToCard(card);
        }
    }

    // ============================================================================
    // CARGA EN LOTES
    // ============================================================================

    async function _loadBatch(entries, containerSelector, isObservatory, checkActiveFn) {
        for (let i = 0; i < entries.length; i += BATCH_SIZE) {
            if (checkActiveFn && !checkActiveFn()) break;

            const batch = entries.slice(i, i + BATCH_SIZE);
            await Promise.allSettled(
                batch.map(([nombre, info]) =>
                    _loadCard(nombre, info, containerSelector, isObservatory, checkActiveFn)
                )
            );

            await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        }
    }

    // ============================================================================
    // PUNTO DE ENTRADA: VISTA DE CIUDADES
    // ============================================================================

    // Guard de reentrancy: evita que dos cargas en lote corran en paralelo
    // si el usuario cambia de día varias veces rápido, o si se vuelve a
    // llamar a esta función para refrescar tras elegir un nuevo día.
    let _cityLoading = false;

    // El delay artificial de 3s (para no mostrar la grilla "en blanco" antes
    // de que carguen las tarjetas) solo tiene sentido en la carga inicial de
    // la página. En los refrescos por cambio de día, la grilla ya existe y
    // está visible, así que mostrarla de inmediato se ve mejor.
    let _firstLoad = true;

    async function mountCityCardView() {
        if (_cityLoading) return;
        _cityLoading = true;

        const menu             = document.getElementById('cityMenu');
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (!menu) { _cityLoading = false; return; }

        // Limpia antes de repoblar: sin esto, llamar de nuevo a esta función
        // (p. ej. al cambiar el día consultado) duplicaría todas las tarjetas.
        menu.innerHTML = '';

        const cities = Object.entries(window.chileanCities || {}).filter(
            ([, info]) => !info.type || info.type !== 'observatory'
        );

        cities.forEach(([nombre, info]) =>
            menu.appendChild(_renderCityCard(nombre, info))
        );

        if (_firstLoad) {
            _firstLoad = false;
            setTimeout(() => {
                if (loadingIndicator) loadingIndicator.style.display = 'none';
                menu.style.display = 'grid';
            }, 3000);
        } else {
            if (loadingIndicator) loadingIndicator.style.display = 'none';
            menu.style.display = 'grid';
        }

        try {
            await _loadBatch(cities, '#cityMenu', false, null);
        } finally {
            _cityLoading = false;
        }
    }

    // ============================================================================
    // PUNTO DE ENTRADA: VISTA DE OBSERVATORIOS
    // ============================================================================

    let _obsLoading = false;

    async function mountObservatoryCardView() {
        if (_obsLoading) return;
        _obsLoading = true;

        const menu = document.getElementById('observatoryMenu');
        if (!menu) { _obsLoading = false; return; }

        const isObsActive = () =>
            document.getElementById('tab-observatories')?.classList.contains('active');

        const observatories = Object.entries(window.chileanCities || {}).filter(
            ([, info]) => info.type === 'observatory'
        );

        menu.innerHTML = '';
        observatories.forEach(([nombre, info]) =>
            menu.appendChild(_renderObservatoryCard(nombre, info))
        );

        if (isObsActive()) {
            await _loadBatch(observatories, '#observatoryMenu', true, isObsActive);
        }

        _obsLoading = false;
    }

    // ============================================================================
    // TOGGLE AMANECER / ATARDECER
    // ============================================================================

    function refreshCardProbabilities() {
        document.querySelectorAll('.city-card').forEach(card => {
            if (card._prediction) _applyProbabilityToCard(card, card._prediction);
        });
    }

    // ============================================================================
    // EXPORTAR
    // ============================================================================

    window.getProbabilityStyles      = getProbabilityStyles;
    window.mountCityCardView         = mountCityCardView;
    window.mountObservatoryCardView  = mountObservatoryCardView;
    window.refreshCardProbabilities  = refreshCardProbabilities;

})();