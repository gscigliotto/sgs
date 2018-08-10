angular.module('sgs.service.filter', [])
       .factory('filterService', [               
           function () {
               var filter = null;
               
               return {                                      
                   setFilter: function (newFilter) {
                       filter = newFilter;
                   },
                   getFilter: function () {
                       var aux = angular.copy(filter);
                       filter = null;

                       return aux;
                   }
               };                                                        
       }]);