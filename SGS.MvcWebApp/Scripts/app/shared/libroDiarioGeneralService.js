angular.module('contabilidad.service.libroDiarioGeneral', [])                
       .factory('libroDiarioGeneralService', [
           '$http',           
           function ($http) {
               return {                  
                   getDataListInit: function (empresaId) {
                       return $http({
                           method: 'POST',
                           url: '/LibroDiarioGeneral/GetDataListInit',
                           data: { empresaId: empresaId }
                       });
                   },
                   getDataEditInit: function (empresaId) {
                       return $http({
                           method: 'POST',
                           url: '/LibroDiarioGeneral/GetDataEditInit',
                           data: { empresaId: empresaId }
                       });
                   },
                   getDiarioGeneralListByFilter: function (filter) {
                       return $http({
                           method: 'POST',
                           url: '/LibroDiarioGeneral/GetDiarioGeneralListByFilter',
                           data: { request: { filter: filter } }
                       });
                   },
                   getDiarioGeneral: function (id) {
                       return $http({
                           method: 'POST',
                           url: '/LibroDiarioGeneral/GetDiarioGeneral',
                           data: { diarioGeneralId: id }
                       });
                   },                 
                   createDiarioGeneral: function (diarioGeneral) {
                       return $http({
                           method: 'POST',
                           url: '/LibroDiarioGeneral/CreateDiarioGeneral',
                           data: { diarioGeneral: diarioGeneral }
                       });
                   },
                   updateDiarioGeneral: function (diarioGeneral) {
                       return $http({
                           method: 'POST',
                           url: '/LibroDiarioGeneral/UpdateDiarioGeneral',
                           data: { diarioGeneral: diarioGeneral }
                       });
                   },
                   deleteDiarioGeneral: function (catalogoCuentaId) {
                   return $http({
                       method: 'POST',
                       url: '/CatalogoCuentas/DeleteCatalogoCuenta',
                       data: { catalogoCuentaId: catalogoCuentaId }
                   });
               }    
               };                                                        
       }]);