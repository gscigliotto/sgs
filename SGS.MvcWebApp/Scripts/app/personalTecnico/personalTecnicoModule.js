angular.module('sgs.personalTecnico', [
    'sgs.personalTecnico.ctrl.list',
    'sgs.personalTecnico.ctrl.edit',
    'sgs.service.personalTecnico',
    'sgs.service.personalTecnicoValidation',
    'sgs.service.navigation',            
    'sgs.filters',
    'ngRoute',
    'ngGrid',
    '$strap.directives',
    'ui.utils'
]).config([
    '$routeProvider',
    '$locationProvider',
    "$httpProvider",    
    function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: 'list',
            controller: 'listCtrl'
        });
              
        $routeProvider.when('/create', {
            templateUrl: 'edit',
            controller: 'editCtrl'
        });
        
        $routeProvider.when('/edit/:id', {
            templateUrl: 'edit',
            controller: 'editCtrl'
        });              
        
        $routeProvider.otherwise({
            redirectTo: '/'
        });
        
        var regexIso8601 = /^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/;
        
        $httpProvider.defaults.transformResponse.push(function (responseData) {
            convertDateStringsToDates(responseData);
            return responseData;
        });
        
        function convertDateStringsToDates(input) {
            // Ignore things that aren't objects.
            if (typeof input !== "object") return input;
                       

            for (var key in input) {
                if (!input.hasOwnProperty(key)) continue;

                var value = input[key];
                var match;
                // Check for string properties which look like dates.
                // TODO: Improve this regex to better match ISO 8601 date strings.
                if (typeof value === "string" && (match = value.match(regexIso8601))) {
                    // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.                  
                    var milliseconds = Date.parse(match[0]);
                    if (!isNaN(milliseconds)) {
                        
                        var d = new Date(milliseconds);


                        var day = d.getUTCDate().toString().length == 1 ? '0' + parseInt(d.getUTCDate()) : d.getUTCDate();
                        var month = d.getUTCMonth().toString().length == 1 ? '0' + parseInt(d.getUTCMonth() + 1) : d.getUTCMonth() + 1;
                        var year = d.getUTCFullYear();
                        var result = day + '/' + month + '/' + year;                       
                        input[key] = result;                        
                    }
                } else if (typeof value === "object") {
                    // Recurse into object
                    convertDateStringsToDates(value);
                }
            }
        };

    }
]).run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function () {
        setTimeout(pageSetUp, 200);
    });
}]);
      