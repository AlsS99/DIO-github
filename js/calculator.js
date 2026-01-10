/**
 * Lógica de Cálculo de Emissões de CO₂
 */

(function () {
  window.CALCULATOR = {
    /**
     * Calcula emissão de CO₂ para uma distância e modo de transporte
     */
    calculateEmission: function (distanceKm, mode) {
      distanceKm = Number(distanceKm) || 0;
      var factor = (window.CONFIG && window.CONFIG.EMISSION_FACTORS && window.CONFIG.EMISSION_FACTORS[mode]) || 0;
      var kg = distanceKm * factor;
      return {
        kg: kg,
        tons: kg / 1000
      };
    },

    /**
     * Compara emissões entre todos os modos de transporte
     */
    compareModes: function (distanceKm) {
      var modes = Object.keys(window.CONFIG.EMISSION_FACTORS || {});
      var res = {};
      modes.forEach(function (m) {
        res[m] = this.calculateEmission(distanceKm, m);
      }, this);
      return res;
    }
  };
})();
