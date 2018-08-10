angular.module('sgs.service.usuarioValidation', [])
       .factory('usuarioValidationService', [
           function () {
               var validator;               
               
               return {
                   setValidator: function (callback) {
                       validator = $('#usuarioForm').validate({
                           errorClass: 'has-error',
                           errorElement: "span",
                           rules: {
                               nick: {required: true, minlength: 5, maxlength: 20},
                               nombre: { required: true, maxlength: 50 },
                               apellido: { required: true, maxlength: 80 },
                               documento: { required: false, maxlength: 20 },
                               email: { required: true, email: true, maxlength: 100 },
                               telefono: { required: false, maxlength: 20 }
                           },                           
                           messages: {
                               nick: { required: 'Ingrese el nick', minlength: 'El nick debe tener un mínimo de {0} caracteres', maxlength: 'El nick debe tener un máximo de {0} caracteres' },
                               nombre: { required: 'Ingrese el nombre', maxlength: 'El nombre debe tener un máximo de {0} caracteres' },
                               apellido: { required: 'Ingrese el apellido', maxlength: 'El apellido debe tener un máximo de {0} caracteres' },
                               documento: { required: '', maxlength: 'El documento debe tener un máximo de {0} caracteres' },
                               email: { required: 'Ingrese el email', email: 'Formato de email inválido', maxlength: 'El email debe tener un máximo de {0} caracteres' },
                               telefono: { required: '', maxlength: 'El teléfono debe tener un máximo de {0} caracteres' }
                           },                         
                           errorPlacement: function (error, element) {
                               error.insertAfter($('.help-block i', element.parent()));
                           },
                           highlight: function(element, errorClass, validClass) {
                               $(element).parent().parent().addClass(errorClass);
                               $('.help-block', $(element).parent()).show();
                           },
                           unhighlight: function (element, errorClass, validClass) {
                               $(element).parent().parent().removeClass(errorClass);
                               $('.help-block', $(element).parent()).hide();
                           },
                           submitHandler: function () {
                               callback();
                           }
                       });
                   }
               };
           }]);