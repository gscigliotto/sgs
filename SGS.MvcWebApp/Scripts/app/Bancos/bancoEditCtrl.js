angular.module('contabilidad.bancos.ctrl.edit', [])
       .controller('editCtrl', [
           '$scope',
           '$routeParams',
           'bancosService',
           'navigationService',
           'validationService',
           function ($scope, $routeParams, bancosService, navigationService, validationService) {
               this.bancoInit = { id: 0, nombre: null, gerente: null, oficinaPrincipal: null, bancoRnc: null, telefono1: null, telefono2: null  };                                                                           
               $scope.banco = null;               
               $scope.result = { hasErrors: false, messages: [] };             
               $scope.validationMessages = null;
               
               $scope.validationMessages = {                   
                   nombre: { required: 'Ingrese el nombre' }
               };
               
               $scope.list = function() {
                   navigationService.goToList();
               };
               
               $scope.save = function () {
                   
                   $scope.result = validationService.validate($scope.bancosForm, $scope.validationMessages);

                   if ($scope.result.hasErrors) return;
                   
                   if ($scope.banco.id) {                       
                       
                       bancosService.updateBanco($scope.banco).then(function (response) {
                           
                           if (!response.data.result.hasErrors) 
                               navigationService.goToList();
                           
                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.result.messages;
                           

                       }, function () { throw 'Error on updateBanco'; });
                   } else {
                       bancosService.createBanco($scope.banco).then(function (response) {
                           
                           if (!response.data.result.hasErrors)
                               navigationService.goToList();
                           
                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.result.messages;
                           
                       }, function () { throw 'Error on createBanco'; });
                   }                  
               };                                       
              
               //#region Init
                                             
                $scope.getDataEditInit = function () {
                       
                    bancosService.getDataEditInit().then(function (response) {
                    }, function () { throw 'Error on getDataEditInit'; });
                       
                };
                                                                         
               if (angular.isUndefined($routeParams.id)) {
                   $scope.banco = this.bancoInit;
                   $scope.getDataEditInit();
               } else {
                   bancosService.getBanco($routeParams.id).then(function (response) {
                       $scope.banco = response.data.data;
                       $scope.getDataEditInit();
                   }, function () { throw 'Error on getBanco'; });
               }               

               //#endregion
           }]);