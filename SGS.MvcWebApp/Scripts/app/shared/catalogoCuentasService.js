angular.module('contabilidad.service.catalogoCuentas', [])
       .factory('catalogoCuentasService', [
           '$http',           
           function ($http) {
               return {                 
                   getDataListInit: function (empresaId) {
                       return $http({
                           method: 'POST',
                           url: '/CatalogoCuentas/GetDataListInit',
                           data: { empresaId: empresaId }
                       });
                   },
                   getDataEditInit: function (id) {
                       return $http({
                           method: 'POST',
                           url: '/CatalogoCuentas/GetDataEditInit',
                           data: { empresaId: id }
                       });
                   },
                   getDataPrintInit: function (filter) {
                       return $http({
                           method: 'POST',
                           url: '/CatalogoCuentas/GetDataPrintInit',
                           data: { filter: filter }
                       });
                   },
                   getCatalogoCuenta: function (id) {
                       return $http({
                           method: 'POST',
                           url: '/CatalogoCuentas/GetCatalogoCuenta',
                           data: { catalogoCuentaId: id }
                       });
                   },
                   createCatalogoCuenta: function (catalogoCuenta) {
                       return $http({
                           method: 'POST',
                           url: '/CatalogoCuentas/CreateCatalogoCuenta',
                           data: { catalogoCuenta: catalogoCuenta }
                       });
                   },
                   updateCatalogoCuenta: function (catalogoCuenta) {
                       return $http({
                           method: 'POST',
                           url: '/CatalogoCuentas/UpdateCatalogoCuenta',
                           data: { catalogoCuenta: catalogoCuenta }
                       });
                   },
                   deleteCatalogoCuenta: function (catalogoCuentaId) {
                       return $http({
                           method: 'POST',
                           url: '/CatalogoCuentas/DeleteCatalogoCuenta',
                           data: { catalogoCuentaId: catalogoCuentaId }
                       });
                   }                                                         
               };                                                        
       }]);