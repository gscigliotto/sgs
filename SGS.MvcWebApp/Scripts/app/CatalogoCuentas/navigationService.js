﻿angular.module('contabilidad.service.navigation', [])
       .factory('navigationService', [
          '$location',
           function ($location) {
               var sections = {                 
                   list: '/',
                   create: '/create/',
                   edit: '/edit/',
                   print: '/print/'
               };
               return {                 
                   goToList: function (id) {
                       $location.path(sections.list + id);
                   },
                   goToCreate: function (id) {
                       $location.path(sections.create + id);
                   },
                   goToEdit: function (id) {
                       $location.path(sections.edit + id);
                   },
                   goToPrint: function (id) {
                       $location.path(sections.print + id);
                   }
               };
           }]);