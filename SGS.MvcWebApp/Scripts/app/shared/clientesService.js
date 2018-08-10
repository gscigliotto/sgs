angular.module('sgs.service.clientes', [])
       .factory('clientesService', [
           '$http',
           function ($http) {
               var urlBase = 'http://' + window.location.host + window.location.pathname;

               return {                
                   getDataListInit: function () {
                       return $http({
                           method: 'GET',
                           url: urlBase + '/GetDataListInit'
                       });
                   },
                   getDataEditInit: function () {
                       return $http({
                           method: 'GET',
                           url: urlBase + '/GetDataEditInit'
                       });
                   },
                   getCliente: function (id) {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/GetCliente',
                           data: { ClienteId: id }
                       });
                   },
                   createCliente: function (cliente) {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/CreateCliente',
                           data: { cliente: cliente }
                       });
                   },
                   updateCliente: function (cliente) {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/UpdateCliente',
                           data: { cliente: cliente }
                       });
                   }
               };
           }]);