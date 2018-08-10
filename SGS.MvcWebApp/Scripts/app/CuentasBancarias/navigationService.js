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
                   goToCreate: function (id) {
                       $location.path(sections.create + id);
                   },
                   goToEdit: function (id) {
                       $location.path(sections.edit + id);
                   },
                   goToReport: function (id) {
                       $location.path(sections.report + id);
                   }
               };
           }]);