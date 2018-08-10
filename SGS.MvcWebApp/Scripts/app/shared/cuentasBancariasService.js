angular.module('contabilidad.service.cuentasBancarias', [])
       .factory('cuentasBancariasService', [
           '$http',           
           function ($http) {
               return {                                      
                   getDataListInit: function (empresaId) {
                       return $http({
                           method: 'POST',
                           url: '/CuentasBancarias/GetDataListInit',
                           data: { empresaId: empresaId }
                       });                       
                   },
                   getDataEditInit: function (empresaId) {
                       return $http({
                           method: 'POST',
                           url: '/CuentasBancarias/GetDataEditInit',
                           data: { empresaId: empresaId }
                       });
                   },
                   getCuentaBancaria: function (id) {
                       return $http({
                           method: 'POST',
                           url: '/CuentasBancarias/getCuentaBancaria',
                           data: { cuentaBancariaId: id }
                       });
                   },
                   createCuentaBancaria: function (cuentaBancaria) {
                       return $http({
                           method: 'POST',
                           url: '/CuentasBancarias/CreateCuentaBancaria',
                           data: { cuentaBancaria: cuentaBancaria }
                       });
                   },
                   updateCuentaBancaria: function (cuentaBancaria) {
                       return $http({
                           method: 'POST',
                           url: '/CuentasBancarias/UpdateCuentaBancaria',
                           data: { cuentaBancaria: cuentaBancaria }
                       });
                   }                
               };                                                        
       }]);