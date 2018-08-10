angular.module('sgs.service.tareas', [])
       .factory('tareasService', [
           '$http',
           function ($http) {
               var urlBase = 'http://' + window.location.host + window.location.pathname;

               return {                
                   getDataListInit: function () {
                       return $http({
                           method: 'GET',
                           url: urlBase + '/GetDataListInit'
                       });
                   },
                   getDataEditInit: function () {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/GetDataEditInit'
                       });
                   },
                   getTarea: function (id) {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/GetTarea',
                           data: { tareaId: id }
                       });
                   },
                   createTarea: function (tarea) {
                       return $http({
                           method: 'POST',
                           url: urlBase +  '/CreateTarea',
                           data: { tarea: tarea }
                       });
                   },
                   updateTarea: function (tarea) {
                       return $http({
                           method: 'POST',
                           url: urlBase +  '/UpdateTarea',
                           data: { tarea: tarea }
                       });
                   }
               };
           }]);