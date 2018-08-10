angular.module('sgs.service.venuesValidation', [])
       .factory('venuesValidationService', ['venuesService',
           function (venuesService) {
               var validator;               
               
               return {
                   setValidator: function (callback, venueId, files) {
                       this.setDropZone(venueId, files);
                                             
                       validator = $('#venuesForm').validate({
                           errorClass: 'has-error',
                           errorElement: "span",
                           rules: {
                               denominacion: {required: true, minlength: 3, maxlength: 100},
                               direccionPrincipal: { required: true, maxlength: 150 },
                               direccionEntregaProveedores: { maxlength: 150 },
                               contactoReferencia: { required: true, maxlength: 100 },
                               telefonoContacto: {  maxlength: 20 },
                               emailContacto: { email: true, maxlength: 100 },
                               emailEmpresaSeguridad: { email: true, maxlength: 100 },
                               tipoEstablecimiento: { required: true }                                                 
                           },                                                       

                           messages: {
                               denominacion: { required: 'Ingrese la denominación', minlength: 'La denominación debe tener un mínimo de {0} caracteres', maxlength: 'La denominación debe tener un máximo de {0} caracteres' },
                               direccionPrincipal: { required: 'Ingrese la dirección principal', maxlength: 'La dirección principal debe tener un máximo de {0} caracteres' },
                               direccionEntregaProveedores: { maxlength: 'La dirección de entrega proveedores debe tener un máximo de {0} caracteres' },
                               contactoReferencia: { required: 'Ingrese el contacto de referencia', maxlength: 'El contacto de referencia debe tener un máximo de {0} caracteres' },
                               telefonoContacto: { maxlength: 'El teléfono de contacto debe tener un máximo de {0} caracteres' },
                               emailContacto: { email: 'Formato de email inválido', maxlength: 'El email de contacto debe tener un máximo de {0} caracteres' },
                               emailEmpresaSeguridad: { email: 'Formato de email inválido', maxlength: 'El email de la empresa de seguridad debe tener un máximo de {0} caracteres' },                               
                               tipoEstablecimiento: { required: 'Seleccione el tipo de establecimiento' }
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
                   },
                   setDropZone: function (venueId, files) {
                       Dropzone.options.infoTecnicaDropzone = {
                           uploadMultiple: false,
                           addRemoveLinks: true,
                           dictRemoveFile: "Eliminar",
                           init: function () {
                               
                               this.on("success", function (file, response) {
                                   $("#infoTecnicaErrors").text('');
                                   $("#infoTecnicaErrors").hide();

                                   if (!response.hasErrors) return;

                                   $("#infoTecnicaErrors").text(response.messages[0]);
                                   $("#infoTecnicaErrors").show();

                                   file.local = true;
                                   this.removeFile(file);
                               });

                               this.on("removedfile", function (file) {
                                   if (file.local) return;

                                   $("#infoTecnicaErrors").text('');
                                   $("#infoTecnicaErrors").hide();

                                   venuesService.removeInfoTecnicaFile(file.name, venueId);
                               });

                               if (!files) return;

                               for (var i = 0; i < files.infoTecnicaFiles.length; i++) {
                                   
                                   var mockFile = { name: files.infoTecnicaFiles[i], size: 0};                                   
                                   this.emit("addedfile", mockFile);

                                   var fullPath = window.location.origin + '/Files/Venues/InfoTecnica/' + venueId + '_' + files.infoTecnicaFiles[i];

                                   this.emit("thumbnail", mockFile, fullPath);
                               }

                           }
                       };

                       Dropzone.options.infoMecanicaDropzone = {
                           uploadMultiple: false,
                           addRemoveLinks: true,
                           dictRemoveFile: "Eliminar",
                           init: function () {

                               this.on("success", function (file, response) {
                                   $("#infoMecanicaErrors").text('');
                                   $("#infoMecanicaErrors").hide();

                                   if (!response.hasErrors) return;

                                   $("#infoMecanicaErrors").text(response.messages[0]);
                                   $("#infoMecanicaErrors").show();

                                   file.local = true;
                                   this.removeFile(file);
                               });

                               this.on("removedfile", function (file) {
                                   if (file.local) return;

                                   $("#infoMecanicaErrors").text('');
                                   $("#infoMecanicaErrors").hide();

                                   venuesService.removeInfoMecanicaFile(file.name, venueId);
                               });

                               if (!files) return;

                               for (var i = 0; i < files.infoMecanicaFiles.length; i++) {

                                   var mockFile = { name: files.infoMecanicaFiles[i], size: 0 };
                                   this.emit("addedfile", mockFile);

                                   var fullPath = window.location.origin + '/Files/Venues/InfoMecanica/' + venueId + '_' + files.infoMecanicaFiles[i];

                                   this.emit("thumbnail", mockFile, fullPath);
                               }

                           }
                       };

                       Dropzone.options.infoElectricaDropzone = {
                           uploadMultiple: false,
                           addRemoveLinks: true,
                           dictRemoveFile: "Eliminar",
                           init: function () {

                               this.on("success", function (file, response) {
                                   $("#infoElectricaErrors").text('');
                                   $("#infoElectricaErrors").hide();

                                   if (!response.hasErrors) return;

                                   $("#infoElectricaErrors").text(response.messages[0]);
                                   $("#infoElectricaErrors").show();

                                   file.local = true;
                                   this.removeFile(file);
                               });

                               this.on("removedfile", function (file) {
                                   if (file.local) return;

                                   $("#infoElectricaErrors").text('');
                                   $("#infoElectricaErrors").hide();

                                   venuesService.removeInfoElectricaFile(file.name, venueId);
                               });

                               if (!files) return;

                               for (var i = 0; i < files.infoElectricaFiles.length; i++) {

                                   var mockFile = { name: files.infoElectricaFiles[i], size: 0 };
                                   this.emit("addedfile", mockFile);

                                   var fullPath = window.location.origin + '/Files/Venues/InfoElectrica/' + venueId + '_' + files.infoElectricaFiles[i];

                                   this.emit("thumbnail", mockFile, fullPath);
                               }

                           }
                       };

                       $("#infoTecnicaDropzone, #infoMecanicaDropzone, #infoElectricaDropzone ").dropzone();                     
                   }
               };
           }]);
