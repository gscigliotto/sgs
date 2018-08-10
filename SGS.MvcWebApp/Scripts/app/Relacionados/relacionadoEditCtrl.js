angular.module('contabilidad.relacionados.ctrl.edit', [])
       .controller('editCtrl', [
           '$scope',
           '$routeParams',
           'relacionadosService',
           'navigationService',
           'validationService',
           function ($scope, $routeParams, relacionadosService, navigationService, validationService) {
               this.relacionadoInit = { id: 0, nombre: null, tipoRelacion: null, telefono: null, direccion: null };
               $scope.relacionado = null;
               $scope.tipoRelaciones = [];
               $scope.result = { hasErrors: false, messages: [] };             
               $scope.validationMessages = null;
               
               $scope.validationMessages = {                   
                   nombre: { required: 'Ingrese el nombre' },
                   tipoRelacion: { required: 'Seleccione el tipo de relación' }                                      
               };
               
               $scope.list = function() {
                   navigationService.goToList();
               };
               
               $scope.save = function () {
                   
                   $scope.result = validationService.validate($scope.relacionadosForm, $scope.validationMessages);

                   if ($scope.result.hasErrors) return;
                   
                   if ($scope.relacionado.id) {
                       
                       relacionadosService.updateRelacionado($scope.relacionado).then(function (response) {
                           
                           if (!response.data.result.hasErrors) 
                               navigationService.goToList();
                           
                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.result.messages;
                           

                       }, function () { throw 'Error on updateRelacionado'; });
                   } else {
                       relacionadosService.createRelacionado($scope.relacionado).then(function (response) {
                           
                           if (!response.data.result.hasErrors)
                               navigationService.goToList();
                           
                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.result.messages;
                           
                       }, function () { throw 'Error on createRelacionado'; });
                   }                  
               };                                       
              
               //#region Init
                                             
                $scope.getDataEditInit = function () {
                       
                    relacionadosService.getDataEditInit().then(function (response) {
                        $scope.tipoRelaciones = response.data.tipoRelaciones;
                    }, function () { throw 'Error on getDataEditInit'; });
                       
                };
                                                                         
               if (angular.isUndefined($routeParams.id)) {
                   $scope.relacionado = this.relacionadoInit;
                   $scope.getDataEditInit();
               } else {
                   relacionadosService.getRelacionado($routeParams.id).then(function (response) {
                       $scope.relacionado = response.data.data;
                       $scope.getDataEditInit();
                   }, function () { throw 'Error on getRelacionado'; });
               }               

               //#endregion
           }]);