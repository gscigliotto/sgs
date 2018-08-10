angular.module('contabilidad.service.empresas', [])
       .factory('empresasService', [
           '$http',           
           function ($http) {
               return {                                      
                   getDataListEmpresas: function () {
                       return $http({
                           method: 'GET',
                           url: '/CuentasBancarias/GetDataListEmpresas'
                       });                       
                   }           
               };                                                        
       }]);