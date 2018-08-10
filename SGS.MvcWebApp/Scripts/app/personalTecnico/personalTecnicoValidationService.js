angular.module('sgs.service.personalTecnicoValidation', [])
       .factory('personalTecnicoValidationService', [
           function () {
               var validator;               
               
               return {
                   setValidator: function (callback) {
                       //$("#cuit").mask("99-99999999-9");
                       
                       $.validator.addMethod(
                            "myDate",
                            function (value, element) {                                
                                return !value || value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
                            },
                            "Formato de fecha inválido"
                        );
                       
                       validator = $('#ptForm').validate({
                           errorClass: 'has-error',
                           errorElement: "span",
                           rules: {
                               nick: {required: true, minlength: 5, maxlength: 20},
                               nombre: { required: true, maxlength: 50 },
                               apellido: { required: true, maxlength: 80 },
                               documento: { required: false, maxlength: 20 },
                               email: { required: true, email: true, maxlength: 100 },
                               telefono: { required: false, maxlength: 20 },
                               
                               cuit: { required: true },
                               fechaAltaAfip: { myDate: true },
                               celular: { maxlength: 20 },
                               telefonoUrgencia: { maxlength: 20 },
                               emailAlternativo: { email: true, maxlength: 100 },
                               cargo: { required: true },
                               categoria: { required: true },
                               art: { maxlength: 50 },
                               telefonoAseguradora: { maxlength: 20 },
                               poliza: { maxlength: 50 },
                               calle: { required: true, maxlength: 50 },
                               numero: { required: true, maxlength: 20 },
                               dpto: {  maxlength: 10 },
                               piso: {  number: true },
                               provincia: { required: true },
                               localidad: { required: true }                                                              
                           },                                                       

                           messages: {
                               nick: { required: 'Ingrese el nick', minlength: 'El nick debe tener un mínimo de {0} caracteres', maxlength: 'El nick debe tener un máximo de {0} caracteres' },
                               nombre: { required: 'Ingrese el nombre', maxlength: 'El nombre debe tener un máximo de {0} caracteres' },
                               apellido: { required: 'Ingrese el apellido', maxlength: 'El apellido debe tener un máximo de {0} caracteres' },
                               documento: { required: '', maxlength: 'El documento debe tener un máximo de {0} caracteres' },
                               email: { required: 'Ingrese el email', email: 'Formato de email inválido', maxlength: 'El email debe tener un máximo de {0} caracteres' },
                               telefono: { required: '', maxlength: 'El teléfono debe tener un máximo de {0} caracteres' },
                               cuit: { required: 'Ingrese el cuit' },
                               fechaAltaAfip: { date: 'Formato de fecha inválido' },
                               celular: { maxlength: 'El celular debe tener un máximo de {0} caracteres' },
                               telefonoUrgencia: { maxlength: 'El teléfono de urgencia debe tener un máximo de {0} caracteres' },
                               emailAlternativo: { email: 'Formato de email inválido', maxlength: 'El email alternativo debe tener un máximo de {0} caracteres' },
                               cargo: { required: 'Seleccione el cargo' },
                               categoria: { required: 'Seleccione la categoría' },
                               art: { maxlength: 'El art debe tener un máximo de {0} caracteres' },
                               telefonoAseguradora: { maxlength: 'El teléfono de la aseguradora debe tener un máximo de {0} caracteres' },
                               poliza: { maxlength: 'La póliza debe tener un máximo de {0} caracteres' },
                               calle: { required: 'Ingrese la calle', maxlength: 'La calle debe tener un máximo de {0} caracteres' },
                               numero: { required: 'Ingrese el número', maxlength: 'El número debe tener un máximo de {0} caracteres' },
                               dpto: { maxlength: 'El dpto. debe tener un máximo de {0} caracteres' },
                               piso: { number: 'El piso debe ser numérico' },
                               provincia: { required: 'Seleccione la provincia' },
                               localidad: { required: 'Seleccione la localidad' }                               
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