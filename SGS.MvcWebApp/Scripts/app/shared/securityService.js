angular.module('sgs.service.security', [])
       .factory('securityService', [
           '$http',
           function ($http) {
              

               return {
                   getRoles: function () {
                       return $http({
                           method: 'GET',
                           url:  '/Security/GetRoles'
                       });
                   },
                   getDataListInit: function () {
                       return $http({
                           method: 'GET',
                           url: '/Security/GetDataListInit'
                       });
                   },
                   getDataEditInit: function () {
                       return $http({
                           method: 'GET',
                           url: '/Security/GetDataEditInit'
                       });
                   },
                   getUsuario: function (id) {
                       return $http({
                           method: 'POST',
                           url: '/Security/GetUsuario',
                           data: { usuarioId: id }
                       });
                   },
                   createUsuario: function (usuario) {
                       return $http({
                           method: 'POST',
                           url: '/Security/CreateUsuario',
                           data: { usuario: usuario }
                       });
                   },
                   updateUsuario: function (usuario) {
                       return $http({
                           method: 'POST',
                           url: '/Security/UpdateUsuario',
                           data: { usuario: usuario }
                       });
                   }
               };
           }]);