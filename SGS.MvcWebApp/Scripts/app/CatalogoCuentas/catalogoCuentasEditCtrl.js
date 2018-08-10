angular.module('contabilidad.catalogoCuentas.ctrl.edit', [])
       .controller('editCtrl', [
           '$scope',
           '$routeParams',
           'catalogoCuentasService',
           'navigationService',
           'validationService',
           function ($scope, $routeParams, catalogoCuentasService,  navigationService, validationService) {
               this.catalogoCuentaInit = { id: null, numero: null, nombre: null, tipoAgrupacion: null, tipoFlujoEfectivo: null, tipoCuentaContableId: null, madre: null, empresaId: $routeParams.empresaId, enabled: true, tieneHijos: false };
               $scope.catalogoCuenta = null;
               $scope.tiposAgrupacion = [];
               $scope.tiposFlujoEfectivo = [];
               $scope.tiposCuentaContable = [];
               $scope.madres = [];
               $scope.madresBase = [];
               $scope.result = { hasErrors: false, messages: [] };                              
               
               $scope.validationMessages = {                   
                   numero: { required: 'Ingrese el número de cuenta' },
                   nombre: { required: 'Ingrese el nombre de la cuenta' },
                   tipoCuentaContableId: { required: 'Seleccione el tipo de cuenta contable' },
                   tipoAgrupacion: { required: 'Seleccione la agrupación' },
                   tipoFlujoEfectivo: { required: 'Seleccione el grupo flujo efectivo' }
               };
                                             
               //#region Oprations
               
               $scope.list = function() {
                   navigationService.goToList($scope.catalogoCuenta.empresaId);
               };
               
               $scope.save = function () {
                   
                   $scope.result = validationService.validate($scope.catalogoCuentaForm, $scope.validationMessages);

                   if ($scope.result.hasErrors) return;

                   if ($scope.catalogoCuenta.id) {
                       catalogoCuentasService.updateCatalogoCuenta($scope.catalogoCuenta).then(function (response) {

                           if (!response.data.result.hasErrors)
                               $scope.list();
                           
                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.result.messages;
                           

                       }, function () { throw 'Error on updateCatalogoCuenta'; });
                   } else {
                       catalogoCuentasService.createCatalogoCuenta($scope.catalogoCuenta).then(function (response) {
                           
                           if (!response.data.result.hasErrors)
                               $scope.list();
                           
                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.result.messages;
                           
                       }, function () { throw 'Error on createCatalogoCuenta'; });
                   }                  
               };              
               
               $scope.toRemove = function (madre) {
                   if (madre === null || typeof madre == 'undefined')
                       return false;
                   else if (madre.id == $scope.catalogoCuenta.id || madre.tipoCuentaContableId != $scope.catalogoCuenta.tipoCuentaContableId)
                       return true;
                   else
                       return $scope.toRemove(madre.madre);
               };

               $scope.setMadres = function () {                   
                   $scope.madres.length = 0;

                   $scope.madresBase.forEach(function (madre) {
                       if (!$scope.toRemove(madre)) {
                           $scope.madres.push(madre);
                       }
                   });                  
               };               

               $scope.getDateEditInit = function () {
                   catalogoCuentasService.getDataEditInit($scope.catalogoCuenta.empresaId).then(function (response) {
                       $scope.tiposAgrupacion = response.data.data.tiposAgrupacion;
                       $scope.tiposFlujoEfectivo = response.data.data.tiposFlujoEfectivo;
                       $scope.tiposCuentaContable = response.data.data.tiposCuentaContable;
                       $scope.empresa = response.data.data.empresa;
                       $scope.madresBase = response.data.data.madres;

                       $scope.setMadres();
                       
                       if ($scope.catalogoCuenta.madre) {
                           $scope.madres.forEach(function (madre) {
                               if (madre.id == $scope.catalogoCuenta.madre.id) {
                                   $scope.catalogoCuenta.madre = madre;
                                   return;
                               }
                           });
                       }                                            
                                                                    
                   }, function () { throw 'Error on getDataEditInit'; });
               };              

               //#endregion   
               
               //#region Watches
               
               $scope.$watch('catalogoCuenta.tipoCuentaContableId', function (newValue, oldValue) {
                   if ($scope.catalogoCuenta === null || $scope.catalogoCuenta.tipoCuentaContableId === oldValue || (oldValue === null && $scope.catalogoCuenta.id)) return;

                   $scope.catalogoCuenta.madre = null;
                   $scope.setMadres();
               });
               
               //#endregion   
               
               //#region Init 
                                                           
               if (angular.isUndefined($routeParams.id)) {
                   $scope.catalogoCuenta = this.catalogoCuentaInit;
                   $scope.getDateEditInit();
               } else {                                   
                   catalogoCuentasService.getCatalogoCuenta($routeParams.id).then(function (response) {
                       $scope.catalogoCuenta = response.data.data;
                       
                       $scope.getDateEditInit();
                       
                   }, function () { throw 'Error on getCatalogoCuenta'; });
               }               

               //#endregion
           }]);