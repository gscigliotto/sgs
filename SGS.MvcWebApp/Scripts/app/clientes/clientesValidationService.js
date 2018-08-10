angular.module('sgs.service.clientesValidation', [])
       .factory('clientesValidationService', [
           function () {
               var validator;               
               
               return {
                   setValidator: function (callback) {
                                            
                       validator = $('#clientesForm').validate({
                           errorClass: 'has-error',
                           errorElement: "span",
                           rules: {
                               razonSocial: {required: true, minlength: 5, maxlength: 100},
                               nombreComercial: { maxlength: 100 },
                               telefono: { required: true, maxlength: 20 },
                               email: { required: true, email: true, maxlength: 100 },
                               cuit: { required: true },
                               paginaWeb: { url: true },
                               nombreContactoComercial: { maxlength: 100 },
                               telefonoContactoComercial: {maxlength: 20},
                               emailContactoComercial: {  email: true, maxlength: 100 },
                               nombreContactoAdministrativo: { maxlength: 100 },
                               telefonoContactoAdministrativo: {maxlength: 20},
                               emailContactoAdministrativo: {  email: true, maxlength: 100 },
                               nombreContactoTecnico: { maxlength: 100 },
                               telefonoContactoTecnico: {maxlength: 20},
                               emailContactoTecnico: {  email: true, maxlength: 100 }                                                                                                                                                                                               
                           },                                                       

                           messages: {
                               razonSocial: { required: 'Ingrese la razón social', minlength: 'La razón social debe tener un mínimo de {0} caracteres', maxlength: 'La razón social debe tener un máximo de {0} caracteres' },
                               nombreComercial: { maxlength: 'El nombre comercial debe tener un máximo de {0} caracteres' },
                               telefono: { required: 'Ingrese el teléfono', maxlength: 'El teléfono debe tener un máximo de {0} caracteres' },
                               email: { required: 'Ingrese el email', email: 'Formato de email inválido', maxlength: 'El email debe tener un máximo de {0} caracteres' },                               
                               cuit: { required: 'Ingrese el cuit' },
                               paginaWeb: { url: 'Formato de url inválido' },

                               nombreContactoComercial: { maxlength: 'El nombre del contacto comercial debe tener un máximo de {0} caracteres' },
                               telefonoContactoComercial: { maxlength: 'El teléfono del contacto comercial debe tener un máximo de {0} caracteres' },
                               emailContactoComercial: { email: 'Formato de email inválido', maxlength: 'El email del contacto comercial debe tener un máximo de {0} caracteres' },

                               nombreContactoAdministrativo: { maxlength: 'El nombre del contacto administrativo debe tener un máximo de {0} caracteres' },
                               telefonoContactoAdministrativo: { maxlength: 'El teléfono del contacto administrativo debe tener un máximo de {0} caracteres' },
                               emailContactoAdministrativo: { email: 'Formato de email inválido', maxlength: 'El email del contacto administrativo debe tener un máximo de {0} caracteres' },

                               nombreContactoTecnico: { maxlength: 'El nombre del contacto técnico debe tener un máximo de {0} caracteres' },
                               telefonoContactoTecnico: { maxlength: 'El teléfono del contacto técnico debe tener un máximo de {0} caracteres' },
                               emailContactoTecnico: { email: 'Formato de email inválido', maxlength: 'El email del contacto técnico debe tener un máximo de {0} caracteres' }                                                  
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