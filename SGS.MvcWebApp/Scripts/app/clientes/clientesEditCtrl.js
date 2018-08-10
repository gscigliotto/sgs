angular.module('sgs.clientes.ctrl.edit', [])
       .controller('editCtrl', [
           '$scope',
           '$routeParams',
           'clientesService',
           'navigationService',
           'clientesValidationService',
           function ($scope, $routeParams, clientesService, navigationService, clientesValidationService) {
               this.entityInit = {id: null, razonSocial: null, nombreComercial: null, telefono: null, email: null, cuit: null, paginaWeb: null, nombreContactoComercial: null, telefonoContactoComercial: null, emailContactoComercial: null, nombreContactoAdministrativo: null, telefonoContactoAdministrativo: null, emailContactoAdministrativo: null, nombreContactoTecnico: null,  telefonoContactoTecnico: null, emailContactoTecnico: null };                   
               $scope.operation = null;
               $scope.result = { hasErrors: false, messages: [] };
               
               $scope.list = function () {
                   navigationService.goToList();
               };               
               
               $scope.save = function () {                   

                   if ($scope.entity.id) {

                       clientesService.updateCliente($scope.entity).then(function (response) {

                           if (!response.data.hasErrors)
                               navigationService.goToList();

                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.messages;


                       }, function () { throw 'Error on updateCliente'; });
                   } else {
                       clientesService.createCliente($scope.entity).then(function (response) {

                           if (!response.data.hasErrors)
                               navigationService.goToList();

                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.messages;

                       }, function () { throw 'Error on createCliente'; });
                   }
               };

                                         
               //#region Init
               
               $scope.getDataEditInit = function (entity) {
                   clientesService.getDataEditInit().then(function (response) {                      
                       $scope.entity = entity;
                   }, function () { throw 'Error on getDataEditInit'; });
               };

               if (angular.isUndefined($routeParams.id)) {                   
                   $scope.getDataEditInit(this.entityInit);
                   $scope.operation = 'Alta';
               } else {
                   $scope.operation = 'Edición';
                   
                   clientesService.getCliente($routeParams.id).then(function (response) {
                       $scope.getDataEditInit(response.data.cliente);
                   }, function () { throw 'Error on getCliente'; });
               }

               clientesValidationService.setValidator($scope.save);

               //#endregion
           }]);