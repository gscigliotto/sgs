angular.module("sgs.validation", [])
       .directive("number", [function() {
           return {
               restrict: 'A',
               require: 'ngModel',
               link: function (scope, element, attrs, ngModel) {
                  function validate(newValue) {
                      var valid = newValue && /^\d+(\.\d{1,2})?$/.exec(newValue);

                      ngModel.$setValidity('number', valid);

                      return valid ? newValue : '';
                  }

                  ngModel.$parsers.push(validate);
                  ngModel.$formatters.push(validate);                   
               }
           };
       }])
       .factory("validationService", [function() {
           return {               
                validate: function(formCtrl, messages) {
                    var result = { hasErrors: false, messages: [] };

                    for (var inputMessage in messages) {
                        if (!messages.hasOwnProperty(inputMessage)) continue;

                        var input = formCtrl[inputMessage];

                        if (!input.$invalid) continue;

                        result.hasErrors = true;

                        for (var error in input.$error) {
                            if (!input.$error.hasOwnProperty(error) || !input.$error[error]) continue;

                            result.messages.push(messages[inputMessage][error]);
                        }
                    }

                    return result;
                }     
           };
       }]);