(function () {
    'use strict';

     function switchTab(tabName) {
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('tab-' + tabName)?.classList.add('active');
      document.querySelector(`.tab-btn[data-tab="${tabName}"]`)?.classList.add('active');

      // Botones amanecer/atardecer y selector de fecha: solo visibles en
      // Ciudades y Observatorios. En Ranking y Datos no aplican (el ranking
      // siempre es de atardecer, y el historial es de datos ya registrados).
      const toggle = document.querySelector('.prediction-toggle');
      if (toggle) {
        toggle.style.display = (tabName === 'cities' || tabName === 'observatories') ? 'flex' : 'none';
      }

      const daySelector = document.getElementById('daySelector');
      if (daySelector) {
        daySelector.style.display = (tabName === 'cities' || tabName === 'observatories') ? 'grid' : 'none';
      }

      const viewingPrediction = document.getElementById('appContainer').style.display === 'block';
      if (viewingPrediction) {
        if (tabName !== 'cities') document.getElementById('appContainer').style.display = 'none';
      } else {
        document.getElementById('cityMenu').style.display = tabName === 'cities' ? 'grid' : 'none';
        document.getElementById('appContainer').style.display = 'none';
      }
      if (tabName === 'observatories') {
        setTimeout(() => {
          if (typeof mountObservatoryCardView === 'function')
            mountObservatoryCardView().then(() => initObservatoriesMap());
        }, 50);
      }
      if (tabName === 'ranking' && typeof calculateRankings === 'function') calculateRankings();
      if (tabName === 'history') setTimeout(() => dataCollector.renderHistoryTab(), 100);
    }

    async function showPrediction(locationName, locationType = 'city', updateUrl = true) {
        const location = chileanCities[locationName];
        
        if (!location) return;
            currentLocation = { type: locationType, name: locationName, lat: location.lat, lon: location.lon, data: location, originalTab: getCurrentTab() };
            switchTab('cities');
            document.getElementById('cityMenu').style.display = 'none';
            document.getElementById('appContainer').style.display = 'block';
            
            const prefixes = { observatory: '🔭', park: '🌳', city: '🌇' };
            const labels = { observatory: 'Observatorio', park: 'Parque', city: 'Ciudad' };
            const prefix = prefixes[locationType] ?? '🌇';
            const label = labels[locationType] ?? 'Ciudad';
            const badge = `<span class="location-type-badge badge-${locationType}">${label}</span>`;
            document.getElementById('cityTitle').innerHTML = `${prefix} ${locationName} ${badge}`;
              
            localStorage.setItem('lastCity', locationName);
            localStorage.setItem('locationType', locationType);

            if (updateUrl) {
                const params = new URLSearchParams();
                params.set('ciudad', locationName);
            
                if (locationType !== 'city') params.set('tipo', locationType);
            
                history.pushState({ ciudad: locationName, tipo: locationType }, '', '?' + params.toString());
            }

        await predictRedSunset(location.lat, location.lon, locationName);
    }

    /* ==========================================================================
       SISTEMA DE PESTAÑAS
       ========================================================================== */

    function getCurrentTab() {
      const id = document.querySelector('.tab-content.active')?.id ?? 'tab-cities';
      return id.replace('tab-', '');
    }

    function closeDetailView() {
      document.getElementById('appContainer').style.display = 'none';
      MapUtils.clearMapLayers();
      const origin = currentLocation.originalTab;
      if (origin === 'cities') document.getElementById('cityMenu').style.display = 'grid';
      switchTab(origin || 'cities');
      currentLocation = { type: null, name: '', lat: null, lon: null, data: null, originalTab: null };
      localStorage.removeItem('lastCity');
      localStorage.removeItem('locationType');

      // Si el día cambió mientras estábamos viendo una ciudad, las
      // tarjetas del menú de Ciudades quedaron desactualizadas: se
      // refrescan recién ahora, al volver (no antes, para no recalcular
      // ciudades que no se estaban mostrando).
      // Nota: la pestaña Observatorios ya se auto-refresca dentro de
      // switchTab('observatories'), así que no necesita este chequeo.
      if (origin === 'cities' && _cardsStale.cities && typeof mountCityCardView === 'function') {
        _cardsStale.cities = false;
        mountCityCardView();
      }
    }

    function volverMenu() {
      closeDetailView();
      history.pushState({}, '', window.location.pathname);
    }

    /* ==========================================================================
       SELECTOR DE DÍA CONSULTADO (hoy .. +5 días)
       ========================================================================== */
    function getSelectedDayOffset() {
      // el desajuste de zona horaria en el teléfono).
      return timeUtils.getQueryDayOffset ? timeUtils.getQueryDayOffset() : 0;
    }

    // Etiqueta de dos líneas (arriba: "Hoy"/"Mañana"/día de semana, abajo:
    // número del día). Es deliberadamente corta para que quepa sin
    // desbordarse en pantallas angostas; la fecha completa queda en el
    // atributo title (tooltip) para quien pase el mouse o use lector de pantalla.
    function formatDayButtonLabel(offset) {
      const d = new Date();
      d.setDate(d.getDate() + offset);
      const dayNum = d.getDate();
      const fullDate = d.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });

      if (offset === 0) return { top: 'Hoy',     bottom: String(dayNum), title: fullDate };
      if (offset === 1) return { top: 'Mañana',  bottom: String(dayNum), title: fullDate };

      const weekday = d.toLocaleDateString('es-CL', { weekday: 'short' }).replace('.', '');
      return { top: weekday, bottom: String(dayNum), title: fullDate };
    }

    function renderDaySelector() {
      const container = document.getElementById('daySelector');
      if (!container) return;
      const currentOffset = getSelectedDayOffset();
      let html = '';
      for (let i = 0; i <= 5; i++) {
        const label = formatDayButtonLabel(i);
        html += `<button class="day-btn ${i === currentOffset ? 'active' : ''}" title="${label.title}" onclick="selectQueryDay(${i})">
          <span class="day-btn-top">${label.top}</span>
          <span class="day-btn-bottom">${label.bottom}</span>
        </button>`;
      }
      container.innerHTML = html;
    }


    function selectQueryDay(offset) {
      if (_dayChangeApplying) return; // bloqueado: se ignora hasta que termine el cambio en curso

      const target = new Date();
      target.setDate(target.getDate() + offset);
      timeUtils.setQueryDate(target);       // fecha real, la necesita SunCalc para amanecer/atardecer
      timeUtils.setQueryDayOffset(offset);  // offset directo, lo usa el gráfico (inmune a husos horarios)

      document.querySelectorAll('#daySelector .day-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx === offset);
      });
      updateQueryDateTime();

      _applyQueryDayChange();
    }

    async function _applyQueryDayChange() {
      _dayChangeApplying = true;
      setDaySelectorLocked(true);

      try {
        const viewingDetail = document.getElementById('appContainer').style.display === 'block';

        if (viewingDetail && currentLocation.lat != null) {
          // Dentro de una ciudad: solo se recalcula ESA ciudad.
          await predictRedSunset(currentLocation.lat, currentLocation.lon, currentLocation.name);
          _cardsStale.cities = true;
          _cardsStale.observatories = true;
        } else {
          // Viendo el menú (no el detalle): refresca solo la lista visible.
          const onObservatories = document.getElementById('tab-observatories')?.classList.contains('active');
          if (onObservatories) {
            await mountObservatoryCardView();
            _cardsStale.observatories = false;
          } else {
            await mountCityCardView();
            _cardsStale.cities = false;
          }
        }
      } finally {
        _dayChangeApplying = false;
        setDaySelectorLocked(false);
      }
    }

    function setDaySelectorLocked(locked) {
      const container = document.getElementById('daySelector');
      if (container) container.classList.toggle('day-selector--locked', locked);
    }

    function updateQueryDateTime() {
      const sel     = timeUtils.getQueryDate();
      const offset  = getSelectedDayOffset();
      const dateStr = sel.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });
      const suffix  = offset === 0 ? ' (hoy)' : offset === 1 ? ' (mañana)' : ` (en ${offset} días)`;
      document.getElementById('fechaPrediccion').innerHTML = `Fecha consultada: ${dateStr}${suffix}`;
    }

  window.showPrediction = showPrediction;
  window.switchTab = switchTab;
  window.getCurrentTab = getCurrentTab;
  window.closeDetailView = closeDetailView;
  window.volverMenu = volverMenu;
  window.getSelectedDayOffset = getSelectedDayOffset;
  window.formatDayButtonLabel = formatDayButtonLabel;
  window.renderDaySelector = renderDaySelector;
  window.selectQueryDay = selectQueryDay;
  window._applyQueryDayChange = _applyQueryDayChange;
  window.setDaySelectorLocked = setDaySelectorLocked;
  window.updateQueryDateTime = updateQueryDateTime

})(window)