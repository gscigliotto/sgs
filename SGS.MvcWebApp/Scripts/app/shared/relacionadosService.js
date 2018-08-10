angular.module('contabilidad.service.relacionados', [])
       .factory('relacionadosService', [
           '$http',           
           function ($http) {
               return {                                      
                   getDataListInit: function () {
                       return $http({
                           method: 'POST',
                           url: '/Relacionados/GetDataListInit'                           
                       });                       
                   },
                   getDataEditInit: function () {
                       return $http({
                           method: 'POST',
                           url: '/Relacionados/GetDataEditInit'
                       });
                   },
                   getRelacionado: function (id) {
                       return $http({
                           method: 'POST',
                           url: '/Relacionados/GetRelacionado',
                           data: { relacionadoId: id }
                       });
                   },
                   createRelacionado: function (relacionado) {
                       return $http({
                           method: 'POST',
                           url: '/Relacionados/CreateRelacionado',
                           data: { relacionado: relacionado }
                       });
                   },
                   updateRelacionado: function (relacionado) {
                       return $http({
                           method: 'POST',
                           url: '/Relacionados/UpdateRelacionado',
                           data: { relacionado: relacionado }
                       });
                   }                
               };                                                        
       }]);