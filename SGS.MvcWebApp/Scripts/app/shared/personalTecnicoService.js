angular.module('sgs.service.personalTecnico', [])
       .factory('personalTecnicoService', [
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
                           method: 'GET',
                           url: urlBase + '/GetDataEditInit'
                       });
                   },
                   getPersonalTecnico: function (id) {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/GetPersonalTecnico',
                           data: { personalTecnicoId: id }
                       });
                   },
                   createPersonalTecnico: function (personalTecnico) {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/CreatePersonalTecnico',
                           data: { personalTecnico: personalTecnico }
                       });
                   },
                   updatePersonalTecnico: function (personalTecnico) {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/UpdatePersonalTecnico',
                           data: { personalTecnico: personalTecnico }
                       });
                   }
               };
           }]);