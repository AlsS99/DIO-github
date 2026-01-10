/**
 * Configuração Global da Aplicação
 * Contém fatores de emissão, metadados de transporte, créditos de carbono
 */

(function () {
  window.CONFIG = {
    EMISSION_FACTORS: {
      bicycle: 0,
      car: 0.12,
      bus: 0.069,
      truck: 0.09
    },

    TRANSPORT_MODES: {
      bicycle: {
        label: 'Bicicleta',
        icon: '🚲',
        color: '#859D6A'
      },
      car: {
        label: 'Carro',
        icon: '🚗',
        color: '#F4A259'
      },
      bus: {
        label: 'Ônibus',
        icon: '🚌',
        color: '#176A5A'
      },
      truck: {
        label: 'Caminhão',
        icon: '🚚',
        color: '#A64A44'
      }
    },

    CARBON_CREDIT: {
      KG_PER_CREDIT: 1000,
      PRICE_MIN_BRL: 50,
      PRICE_MAX_BRL: 150
    },

    fillCityAutocomplete: function (datalistId) {
      if (!window.RoutesDB) {
        console.warn('RoutesDB não está disponível');
        return;
      }

      var datalist = document.getElementById(datalistId);
      if (!datalist) {
        console.warn('Datalist com id "' + datalistId + '" não encontrado');
        return;
      }

      datalist.innerHTML = '';
      var cities = window.RoutesDB.getAllCities();
      cities.forEach(function (city) {
        var option = document.createElement('option');
        option.value = city;
        datalist.appendChild(option);
      });

      console.log('Datalist preenchido com ' + cities.length + ' cidades');
    },

    setupDistanceAutoFill: function () {
      if (!window.RoutesDB) {
        console.warn('RoutesDB não está disponível');
        return;
      }

      var originInput = document.getElementById('origin');
      var destInput = document.getElementById('destination');
      var manualCheckbox = document.getElementById('manual-distance');
      var distanceInput = document.getElementById('distance');

      function updateDistance() {
        if (manualCheckbox.checked) return;

        var origin = originInput.value.trim();
        var destination = destInput.value.trim();

        if (!origin || !destination) {
          distanceInput.value = '';
          var helpEl = distanceInput.parentElement.querySelector('.calculator__help');
          if (helpEl) {
            helpEl.textContent = 'A distância será preenchida automaticamente';
            helpEl.style.color = '#999';
          }
          return;
        }

        var distance = window.RoutesDB.findDistance(origin, destination);
        var helpEl = distanceInput.parentElement.querySelector('.calculator__help');

        if (distance) {
          distanceInput.value = distance;
          if (helpEl) {
            helpEl.textContent = '✓ Distância preenchida automaticamente';
            helpEl.style.color = '#00a86b';
          }
        } else {
          distanceInput.value = '';
          if (helpEl) {
            helpEl.textContent = '⚠ Rota não encontrada. Ative "Inserir distância manualmente"';
            helpEl.style.color = '#d9534f';
          }
        }
      }

      originInput.addEventListener('change', updateDistance);
      destInput.addEventListener('change', updateDistance);

      manualCheckbox.addEventListener('change', function () {
        if (this.checked) {
          distanceInput.readOnly = false;
          distanceInput.style.backgroundColor = '#fff';
          distanceInput.style.color = '#333';
          var helpEl = distanceInput.parentElement.querySelector('.calculator__help');
          if (helpEl) {
            helpEl.textContent = 'Digite a distância manualmente em km';
            helpEl.style.color = '#176A5A';
          }
          distanceInput.focus();
        } else {
          distanceInput.readOnly = true;
          distanceInput.style.backgroundColor = '#f5f5f5';
          distanceInput.style.color = '#888';
          updateDistance();
        }
      });

      console.log('Preenchimento automático de distância configurado');
    }
  };
})();
