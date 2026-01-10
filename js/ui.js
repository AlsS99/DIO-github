/**
 * Manipulação de DOM e Exibição de Resultados
 */

(function () {
  function $(selector, root) { return (root || document).querySelector(selector); }

  window.UI = {
    populateCitiesList: function (datalistId) {
      var datalist = document.getElementById(datalistId);
      if (!datalist || !window.RoutesDB) return;
      datalist.innerHTML = '';
      var cities = window.RoutesDB.getAllCities();
      cities.forEach(function (city) {
        var opt = document.createElement('option');
        opt.value = city;
        datalist.appendChild(opt);
      });
    },

    hideAllResults: function () {
      ['#results','#comparison','#carbon-credits'].forEach(function (sel) {
        var el = document.querySelector(sel);
        if (!el) return;
        el.classList.add('hidden');
        el.setAttribute('aria-hidden','true');
      });
    },

    showResults: function (emission, comparison, credits, distance, origin, destination, mode) {
      var results = $('#results-content');
      var comparisonEl = $('#comparison-content');
      var creditsEl = $('#carbon-credits-content');

      // Obter label do modo de transporte
      var modeLabel = window.CONFIG.TRANSPORT_MODES[mode] ? window.CONFIG.TRANSPORT_MODES[mode].label : mode;
      var modeIcon = window.CONFIG.TRANSPORT_MODES[mode] ? window.CONFIG.TRANSPORT_MODES[mode].icon : '🚗';

      // Resultado detalhado
      var resultsHTML = '<div class="result-card">';
      resultsHTML += '<div class="result-item"><span class="result-label">🛣️ Rota:</span> <span class="result-value">' + origin + ' → ' + destination + '</span></div>';
      resultsHTML += '<div class="result-item"><span class="result-label">📏 Distância:</span> <span class="result-value">' + distance.toFixed(2) + ' km</span></div>';
      resultsHTML += '<div class="result-item"><span class="result-label">🚗 Transporte:</span> <span class="result-value">' + modeIcon + ' ' + modeLabel + '</span></div>';
      resultsHTML += '<div class="result-item highlight"><span class="result-label">💨 Emissão de CO₂:</span> <span class="result-value">' + emission.kg.toFixed(2) + ' kg (' + emission.tons.toFixed(3) + ' t)</span></div>';
      resultsHTML += '</div>';
      results.innerHTML = resultsHTML;

      // Comparação com cards visuais
      var html = '<div class="comparison-grid">';
      var modes = ['bicycle', 'bus', 'car', 'truck'];
      var sustainabilityIcons = {
        bicycle: '🌿',
        bus: '♻️',
        car: '⚠️',
        truck: '🔴'
      };
      
      // Separar modo selecionado para colocar por último
      var otherModes = [];
      var selectedMode = null;
      
      modes.forEach(function (m) {
        if (m === mode) {
          selectedMode = m;
        } else {
          otherModes.push(m);
        }
      });
      
      // Renderizar outros modos primeiro
      otherModes.forEach(function (m) {
        var modeData = window.CONFIG.TRANSPORT_MODES[m];
        var sustainability = sustainabilityIcons[m] || '';
        
        html += '<div class="comparison-card">';
        html += '<div class="comparison-icon">' + modeData.icon + '</div>';
        html += '<div class="comparison-name">' + modeData.label + '</div>';
        html += '<div class="comparison-emission">' + comparison[m].kg.toFixed(2) + ' kg</div>';
        html += '<div class="comparison-sustainability">' + sustainability + '</div>';
        html += '</div>';
      });
      
      // Renderizar modo selecionado por último
      if (selectedMode) {
        var modeData = window.CONFIG.TRANSPORT_MODES[selectedMode];
        var sustainability = sustainabilityIcons[selectedMode] || '';
        
        html += '<div class="comparison-card comparison-card--selected">';
        html += '<div class="comparison-icon">' + modeData.icon + '</div>';
        html += '<div class="comparison-name">' + modeData.label + '</div>';
        html += '<div class="comparison-emission">' + comparison[selectedMode].kg.toFixed(2) + ' kg</div>';
        html += '<div class="comparison-sustainability">' + sustainability + '</div>';
        html += '<div class="comparison-badge">✓ Selecionado</div>';
        html += '</div>';
      }
      html += '</div>';
      comparisonEl.innerHTML = html;

      // Créditos com custo estimado
      var costMin = (credits * window.CONFIG.CARBON_CREDIT.PRICE_MIN_BRL).toFixed(2);
      var costMax = (credits * window.CONFIG.CARBON_CREDIT.PRICE_MAX_BRL).toFixed(2);
      
      var creditsHTML = '<div class="credits-card">';
      creditsHTML += '<div class="credit-item"><span class="credit-label">🎫 Créditos Necessários:</span> <span class="credit-value">' + credits.toFixed(2) + ' créditos</span></div>';
      creditsHTML += '<div class="credit-item"><span class="credit-label">💰 Custo Estimado:</span> <span class="credit-value">R$ ' + costMin + ' - R$ ' + costMax + '</span></div>';
      creditsEl.innerHTML = creditsHTML;

      // Mostrar seções
      ['#results','#comparison','#carbon-credits'].forEach(function (sel) {
        var el = document.querySelector(sel);
        if (!el) return;
        el.classList.remove('hidden');
        el.removeAttribute('aria-hidden');
      });
    }
  };
})();
