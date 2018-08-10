angular.module('sgs.service.tareasValidation', [])
       .factory('tareasValidationService', [
           function () {
               var validator;               
               
               return {
                   setValidator: function (callback) {                                                                                       
                       validator = $('#tareasForm').validate({
                           errorClass: 'has-error',
                           errorElement: "span",
                           rules: {
                               titulo: {required: true, minlength: 3, maxlength: 100},
                               prioridad: { required: true },
                               usuarioId: { required: true },
                               estadoTarea: { required: true },                               
                               descripcion: {  maxlength: 2000 }
                           },                                                                                                            
                           messages: {
                               titulo: { required: 'Ingrese el título', minlength: 'EL título debe tener un mínimo de {0} caracteres', maxlength: 'El título debe tener un máximo de {0} caracteres' },
                               prioridad: { required: 'Seleccione la prioridad de la tarea' },
                               usuarioId: { required: 'Seleccione el usuario asignado' },
                               estadoTarea: { required: 'Seleccione el estado de la tarea' },
                               descripcion: { maxlength: 'La descripción debe tener un máximo de {0} caracteres' }
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