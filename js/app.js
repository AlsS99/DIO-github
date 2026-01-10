/**
 * Inicialização da Aplicação
 */

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Popular cidades via CONFIG
    if (window.CONFIG && window.CONFIG.fillCityAutocomplete) {
      window.CONFIG.fillCityAutocomplete('cities-list');
    }

    // Configurar preenchimento automático de distância
    if (window.CONFIG && window.CONFIG.setupDistanceAutoFill) {
      window.CONFIG.setupDistanceAutoFill();
    }

    // Event listeners para o formulário
    var origin = document.getElementById('origin');
    var destination = document.getElementById('destination');
    var manual = document.getElementById('manual-distance');
    var form = document.getElementById('calculator-form');

    if (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        window.UI.hideAllResults();

        var originVal = origin.value.trim();
        var destVal = destination.value.trim();
        var manualChecked = manual.checked;
        var distanceInput = document.getElementById('distance');
        var distance = Number(distanceInput.value || 0);

        if (!manualChecked) {
          var routeDistance = window.RoutesDB.findDistance(originVal, destVal);
          if (!routeDistance) {
            alert('Distância não encontrada para essa rota. Ative "Inserir distância manualmente" ou escolha cidades diferentes.');
            return;
          }
          distance = routeDistance;
        } else {
          if (!distance || distance <= 0) {
            alert('Insira uma distância válida.');
            return;
          }
        }

        var mode = (document.querySelector('input[name="transport"]:checked') || {}).value || 'car';
        var emission = window.CALCULATOR.calculateEmission(distance, mode);
        var comparison = window.CALCULATOR.compareModes(distance);
        var credits = emission.kg / (window.CONFIG.CARBON_CREDIT.KG_PER_CREDIT || 1000);

        window.UI.showResults(emission, comparison, credits, distance, originVal, destVal, mode);
      });
    }

  });
})();
