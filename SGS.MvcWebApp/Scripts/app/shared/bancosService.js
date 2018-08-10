angular.module('contabilidad.service.bancos', [])
       .factory('bancosService', [
           '$http',           
           function ($http) {
               return {                                      
                   getDataListInit: function () {
                       return $http({
                           method: 'POST',
                           url: '/Bancos/GetDataListInit'                           
                       });                       
                   },
                   getDataEditInit: function () {
                       return $http({
                           method: 'POST',
                           url: '/Bancos/GetDataEditInit'
                       });
                   },
                   getBanco: function (id) {
                       return $http({
                           method: 'POST',
                           url: '/Bancos/GetBanco',
                           data: { bancoId: id }
                       });
                   },
                   createBanco: function (banco) {
                       return $http({
                           method: 'POST',
                           url: '/Bancos/CreateBanco',
                           data: { banco: banco }
                       });
                   },
                   updateBanco: function (banco) {
                       return $http({
                           method: 'POST',
                           url: '/Bancos/UpdateBanco',
                           data: { banco: banco }
                       });
                   }                
               };                                                        
       }]);