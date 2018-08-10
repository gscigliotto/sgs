angular.module('contabilidad.service.navigation', [])
       .factory('navigationService', [
          '$location',
           function ($location) {
               var sections = {
                   list: '/',
                   create: '/create/',
                   edit: '/edit/'
               };
               return {
                   goToList: function () {
                       $location.path(sections.list);
                   },
                   goToCreate: function (cuentaBancariaId) {
                       $location.path(sections.create + cuentaBancariaId);
                   },
                   goToEdit: function (id) {
                       $location.path(sections.edit + id);
                   }
               };
           }]);