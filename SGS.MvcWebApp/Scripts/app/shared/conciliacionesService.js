angular.module('contabilidad.service.conciliaciones', [])
       .factory('conciliacionesService', [
           '$http',           
           function ($http) {
               return {                                      
                   getDataListInit: function (id) {
                       return $http({
                           method: 'POST',
                           url: '/Conciliaciones/GetDataListInit',
                           data: { cuentaBancariaId: id }
                       });
                   },
                   getDataEditInit: function () {
                       return $http({
                           method: 'GET',
                           url: '/Conciliaciones/GetDataEditInit'
                       });
                   },
                   getConciliacion: function (id) {
                       return $http({
                           method: 'POST',
                           url: '/Conciliaciones/GetConciliacion',
                           data: { conciliacionId: id }
                       });
                   },
                   getConciliacionesByFilter: function (filter) {
                       return $http({
                           method: 'POST',
                           url: '/Conciliaciones/GetConciliacionesByFilter',
                           data: { request: { filter: filter } }
                       });
                   },
                   createConciliacion: function (conciliacion) {
                       return $http({
                           method: 'POST',
                           url: '/Conciliaciones/CreateConciliacion',
                           data: { conciliacion: conciliacion }
                       });
                   },
                   updateConciliacion: function (conciliacion) {
                       return $http({
                           method: 'POST',
                           url: '/Conciliaciones/UpdateConciliacion',
                           data: { conciliacion: conciliacion }
                       });
                   },
                   processConciliacion: function (conciliacion) {
                       return $http({
                           method: 'POST',
                           url: '/Conciliaciones/ProcessConciliacion',
                           data: { conciliacion: conciliacion }
                       });
                   },
                   reopenConciliacion: function (id) {
                       return $http({
                           method: 'POST',
                           url: '/Conciliaciones/ReopenConciliacion',
                           data: { cuentaBancariaId: id }
                       });
                   }
                   
               };                                                        
       }]);