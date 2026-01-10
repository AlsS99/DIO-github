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

    showResults: function (emission, comparison, credits) {
      var results = $('#results-content');
      var comparisonEl = $('#comparison-content');
      var creditsEl = $('#carbon-credits-content');

      results.innerHTML = '<p><strong>Emissão estimada:</strong> ' + emission.kg.toFixed(2) + ' kg CO₂ (' + emission.tons.toFixed(3) + ' t)</p>';

      var html = '<h4>Comparação por modo</h4><ul>';
      Object.keys(comparison).forEach(function (m) {
        var mode = window.CONFIG.TRANSPORT_MODES[m];
        var label = mode ? mode.label : m;
        html += '<li>' + label + ': ' + comparison[m].kg.toFixed(2) + ' kg CO₂</li>';
      });
      html += '</ul>';
      comparisonEl.innerHTML = html;

      creditsEl.innerHTML = '<p>Créditos necessários: <strong>' + credits.toFixed(2) + '</strong> (1 crédito = ' + window.CONFIG.CARBON_CREDIT.KG_PER_CREDIT + ' kg)</p>';

      ['#results','#comparison','#carbon-credits'].forEach(function (sel) {
        var el = document.querySelector(sel);
        if (!el) return;
        el.classList.remove('hidden');
        el.removeAttribute('aria-hidden');
      });
    }
  };
})();
