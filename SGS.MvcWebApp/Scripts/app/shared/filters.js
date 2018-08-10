angular.module('sgs.filters', [])
       .filter('customDate', [
           '$filter',
           function ($filter) {
              return function(value) {
                  var regexIso8601 = /^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/;
                  var match;

                  value = $filter('json')(value);
                  value = value.replace(/\"/g, "");
                  
                  if (typeof value === "string" && (match = value.match(regexIso8601))) {
                      // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.                  
                      var milliseconds = Date.parse(match[0]);
                      if (!isNaN(milliseconds)) {
                          var d = new Date(milliseconds);

                          var day = d.getUTCDate().toString().length == 1 ? '0' + parseInt(d.getUTCDate()) : d.getUTCDate();
                          var month = d.getUTCMonth().toString().length == 1 ? '0' + parseInt(d.getUTCMonth() + 1) : d.getUTCMonth() + 1;
                          var year = d.getUTCFullYear();
                          value = day + '/' + month + '/' + year;
                      }
                  }
                  
                  return value;
              };
           }]);