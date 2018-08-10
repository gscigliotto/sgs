angular.module('sgs.service.venues', [])
       .factory('venuesService', [
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
                   getDataEditInit: function (id) {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/GetDataEditInit',
                           data: { venueId: id }
                       });
                   },
                   getVenue: function (id) {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/GetVenue',
                           data: { venueId: id }
                       });
                   },
                   createVenue: function (venue) {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/CreateVenue',
                           data: { venue: venue }
                       });
                   },
                   updateVenue: function (venue) {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/UpdateVenue',
                           data: { venue: venue }
                       });
                   },
                   removeInfoTecnicaFile: function (fileName, venueId) {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/RemoveInfoTecnicaFile',
                           data: { fileName: fileName, venueId: venueId }
                       });
                   },
                   removeInfoMecanicaFile: function (fileName, venueId) {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/RemoveInfoMecanicaFile',
                           data: { fileName: fileName, venueId: venueId }
                       });
                   },
                   removeInfoElectricaFile: function (fileName, venueId) {
                       return $http({
                           method: 'POST',
                           url: urlBase + '/RemoveInfoElectricaFile',
                           data: { fileName: fileName, venueId: venueId }
                       });
                   }
               };
           }]);