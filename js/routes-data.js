/**
 * Banco de Dados de Rotas Brasileiras
 * Contém rotas entre principais cidades e capitais do Brasil
 * com distâncias reais (em km)
 */

(function () {
  window.RoutesDB = {
    /**
     * Array de rotas com origin, destination e distanceKm
     * Cobre todas as principais regiões: Sudeste, Sul, Nordeste, Centro-Oeste e Norte
     */
    routes: [
      // ===== SUDESTE =====
      { origin: 'São Paulo, SP', destination: 'Rio de Janeiro, RJ', distanceKm: 430 },
      { origin: 'São Paulo, SP', destination: 'Belo Horizonte, MG', distanceKm: 586 },
      { origin: 'São Paulo, SP', destination: 'Campinas, SP', distanceKm: 95 },
      { origin: 'São Paulo, SP', destination: 'Santos, SP', distanceKm: 71 },
      { origin: 'Rio de Janeiro, RJ', destination: 'Niterói, RJ', distanceKm: 13 },
      { origin: 'Rio de Janeiro, RJ', destination: 'Belo Horizonte, MG', distanceKm: 434 },
      { origin: 'Belo Horizonte, MG', destination: 'Ouro Preto, MG', distanceKm: 100 },
      { origin: 'Belo Horizonte, MG', destination: 'Uberlândia, MG', distanceKm: 516 },

      // ===== CENTRO-OESTE =====
      { origin: 'São Paulo, SP', destination: 'Brasília, DF', distanceKm: 1015 },
      { origin: 'Rio de Janeiro, RJ', destination: 'Brasília, DF', distanceKm: 1148 },
      { origin: 'Belo Horizonte, MG', destination: 'Brasília, DF', distanceKm: 716 },
      { origin: 'Brasília, DF', destination: 'Goiânia, GO', distanceKm: 209 },
      { origin: 'Brasília, DF', destination: 'Cuiabá, MT', distanceKm: 928 },

      // ===== NORDESTE =====
      { origin: 'São Paulo, SP', destination: 'Salvador, BA', distanceKm: 1666 },
      { origin: 'Rio de Janeiro, RJ', destination: 'Salvador, BA', distanceKm: 1447 },
      { origin: 'Brasília, DF', destination: 'Salvador, BA', distanceKm: 1386 },
      { origin: 'Salvador, BA', destination: 'Recife, PE', distanceKm: 838 },
      { origin: 'Salvador, BA', destination: 'Fortaleza, CE', distanceKm: 1329 },
      { origin: 'Recife, PE', destination: 'Fortaleza, CE', distanceKm: 792 },
      { origin: 'Fortaleza, CE', destination: 'Petrolina, PE', distanceKm: 591 },

      // ===== SUL =====
      { origin: 'São Paulo, SP', destination: 'Curitiba, PR', distanceKm: 408 },
      { origin: 'São Paulo, SP', destination: 'Porto Alegre, RS', distanceKm: 1103 },
      { origin: 'Curitiba, PR', destination: 'Porto Alegre, RS', distanceKm: 710 },
      { origin: 'Curitiba, PR', destination: 'Florianópolis, SC', distanceKm: 300 },
      { origin: 'Porto Alegre, RS', destination: 'Florianópolis, SC', distanceKm: 474 },

      // ===== NORTE =====
      { origin: 'Brasília, DF', destination: 'Manaus, AM', distanceKm: 2285 },
      { origin: 'Brasília, DF', destination: 'Belém, PA', distanceKm: 1963 },
      { origin: 'Manaus, AM', destination: 'Belém, PA', distanceKm: 1678 },
      { origin: 'Salvador, BA', destination: 'Manaus, AM', distanceKm: 3341 },

      // ===== ROTAS ADICIONAIS REGIONAIS =====
      { origin: 'Campinas, SP', destination: 'Rio de Janeiro, RJ', distanceKm: 515 },
      { origin: 'Campinas, SP', destination: 'Belo Horizonte, MG', distanceKm: 604 },
      { origin: 'Santos, SP', destination: 'Belo Horizonte, MG', distanceKm: 657 },
      { origin: 'Ouro Preto, MG', destination: 'Rio de Janeiro, RJ', distanceKm: 534 },
      { origin: 'Goiânia, GO', destination: 'Cuiabá, MT', distanceKm: 719 },
      { origin: 'Recife, PE', destination: 'Maceió, AL', distanceKm: 258 },
      { origin: 'Florianópolis, SC', destination: 'Curitiba, PR', distanceKm: 300 },
      { origin: 'Porto Alegre, RS', destination: 'Pelotas, RS', distanceKm: 270 },
      { origin: 'Manaus, AM', destination: 'Boa Vista, RR', distanceKm: 797 },
      { origin: 'Belém, PA', destination: 'Macapá, AP', distanceKm: 595 }
    ],

    /**
     * Retorna um array único e ordenado com todos os nomes de cidades
     */
    getAllCities: function () {
      var citiesSet = {};
      this.routes.forEach(function (route) {
        citiesSet[route.origin] = true;
        citiesSet[route.destination] = true;
      });
      var cities = Object.keys(citiesSet).sort();
      return cities;
    },

    /**
     * Encontra a distância entre duas cidades
     */
    findDistance: function (origin, destination) {
      if (!origin || !destination) return null;
      var originNorm = origin.trim().toLowerCase();
      var destNorm = destination.trim().toLowerCase();

      for (var i = 0; i < this.routes.length; i++) {
        var route = this.routes[i];
        var routeOrigin = route.origin.trim().toLowerCase();
        var routeDestination = route.destination.trim().toLowerCase();

        if (routeOrigin === originNorm && routeDestination === destNorm) {
          return route.distanceKm;
        }
        if (routeOrigin === destNorm && routeDestination === originNorm) {
          return route.distanceKm;
        }
      }
      return null;
    }
  };
})();
