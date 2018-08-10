angular.module('sgs.venues.ctrl.edit', [])
       .controller('editCtrl', [
           '$scope',
           '$routeParams',
           'venuesService',
           'navigationService',
           'venuesValidationService',
           function ($scope, $routeParams, venuesService, navigationService, venuesValidationService) {
               this.entityInit = {id: null, denominacion: null, direccionPrincipal: null, direccionEntregaProveedores: null, contactoReferencia: null, telefonoContacto: null, emailContacto: null, emailEmpresaSeguridad: null, tipoEstablecimiento: null, encomienda: null, planoTecnico: null, planoMecanico: null, planoElectrico: null, informacionTecnica: null, informacionMecanica: null, informacionElectrica: null };
     
               $scope.entity = null;
               $scope.operation = null;
               $scope.tipoEstablecimientoList = null;                                             
               $scope.result = { hasErrors: false, messages: [] };               
               
               $scope.list = function () {
                   navigationService.goToList();
               };               
               
               $scope.save = function () {                   

                   if ($scope.entity.id) {

                       venuesService.updateVenue($scope.entity).then(function (response) {

                           if (!response.data.hasErrors)
                               navigationService.goToList();

                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.messages;


                       }, function () { throw 'Error on updateVenue'; });
                   } else {
                       venuesService.createVenue($scope.entity).then(function (response) {

                           if (!response.data.hasErrors)
                               navigationService.goToList();

                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.messages;

                       }, function () { throw 'Error on createVenue'; });
                   }
               };              
                                                         
               
               //#region Init
               
               $scope.getDataEditInit = function (entity) {
                   venuesService.getDataEditInit(entity.id).then(function (response) {
                       $scope.tipoEstablecimientoList = response.data.tipoEstablecimientoList;                                              
                       $scope.entity = entity;

                       venuesValidationService.setValidator($scope.save, entity.id, response.data.files);
                   }, function () { throw 'Error on getDataEditInit'; });
               };

               if (angular.isUndefined($routeParams.id)) {                   
                   $scope.getDataEditInit(this.entityInit);
                   $scope.operation = 'Alta';
               } else {
                   $scope.operation = 'Edición';
                   
                   venuesService.getVenue($routeParams.id).then(function (response) {
                       $scope.getDataEditInit(response.data.venue);
                   }, function () { throw 'Error on getVenue'; });
               }
               

               //#endregion
           }]);