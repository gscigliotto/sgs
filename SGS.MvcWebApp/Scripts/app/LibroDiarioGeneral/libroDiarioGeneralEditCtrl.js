angular.module('contabilidad.libroDiarioGeneral.ctrl.edit', [])
       .controller('editCtrl', [
           '$scope',
           '$routeParams',
           'libroDiarioGeneralService',
           'navigationService',
           'validationService',
           function ($scope, $routeParams, libroDiarioGeneralService, navigationService, validationService) {
               this.diarioGeneralInit = { id: null, empresaId: null, fecha: null, fechaDocumento: null, descripcion: null, status: null, moduloOrigen: 'EntradaDiario', monto: null, referenciaId: null, transaccionesDiario: [], enabled: true };
               $scope.transaccionDiario = { id: null, catalogoCuenta: null, debito: null, credito: null, memo: null, enabled: true, catalogoCuentaNombre: null, relacionado: null, relacionadoNombre: null  };
               $scope.diarioGeneral = null;
               $scope.transaccion = null;
               $scope.debitoDisabled = false;
               $scope.creditoDisabled = false;
               $scope.catalogoCuentas = [];
               $scope.relacionados = [];
               $scope.result = { hasErrors: false, messages: [] };
               $scope.resultTransacciones = { hasErrors: false, messages: [] };                             
               
               $scope.validationMessages = {                                      
                   fecha: { required: 'Ingrese la fecha' },
                   fechaDocumento: { required: 'Ingrese la fecha del documento' },
                   monto: { required: 'Ingrese el monto', number: 'El monto debe ser numérico' }
               };
               
               $scope.list = function () {
                   navigationService.goToList($scope.diarioGeneral.empresaId);
               };
               
               $scope.save = function () {
                   
                   $scope.result = validationService.validate($scope.diarioGeneralForm, $scope.validationMessages);
                   $scope.resultTransacciones.hasErrors = $scope.transaccionesHasErrors();

                   if ($scope.result.hasErrors || $scope.resultTransacciones.hasErrors) return;

                   if ($scope.diarioGeneral.id) {
                       libroDiarioGeneralService.updateDiarioGeneral($scope.diarioGeneral).then(function (response) {
                           
                           if (!response.data.result.hasErrors) 
                               $scope.list();
                           
                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.result.messages;
                           

                       }, function () { throw 'Error on updateDiarioGeneral'; });
                   } else {
                       libroDiarioGeneralService.createDiarioGeneral($scope.diarioGeneral).then(function (response) {
                           
                           if (!response.data.result.hasErrors)
                               $scope.list();
                           
                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.result.messages;
                           
                       }, function () { throw 'Error on createDiarioGeneral'; });
                   }                  
               };
               
               $scope.addTransaccionDiario = function () {
                   var transaccion = angular.copy($scope.transaccionDiario);
                   var valid = false;                   
                
                   var validDebito = !transaccion.debito || !transaccion.debito == "0" || (transaccion.debito && /^\d+(\.\d{1,2})?$/.exec(transaccion.debito) != null);
                   var validCredito = !transaccion.credito || !transaccion.debito == "0" || (transaccion.credito && /^\d+(\.\d{1,2})?$/.exec(transaccion.credito) != null);
                   var validCreditoDebito =  (transaccion.debito && !transaccion.credito) || (!transaccion.debito && transaccion.credito);
                   var validCuenta = transaccion.catalogoCuenta;

                   if(validDebito && validCredito && validCreditoDebito &&  validCuenta )
                        valid = true;
                   else
                        valid = false;
                   
                   if (!valid) {
                        $scope.resultTransacciones.hasErrors = true;
                        $scope.resultTransacciones.messages = ["La cuenta es obligatoria y los montos de débito y crédito deben ser numéricos. Además sólo uno de ellos debe ingresarse."];
                        
                       return;
                   }
                   
                   $scope.diarioGeneral.transaccionesDiario.push(transaccion);
                   $scope.clearTransaccionDiario();
               };
               
               $scope.clearTransaccionDiario = function () {
                   $scope.resultTransacciones.hasErrors = false;
                   $scope.transaccionDiario.catalogoCuenta = null;
                   $scope.transaccionDiario.catalogoCuentaNombre = null;
                   $scope.transaccionDiario.relacionado = null;
                   $scope.transaccionDiario.relacionadoNombre = null;
                   $scope.transaccionDiario.debito = null;
                   $scope.transaccionDiario.credito = null;
                   $scope.transaccionDiario.memo = null;                                                         
               };                              
               
               $scope.removeTransaccion = function (transaccion) {
                   if (!confirm('Desea eliminar la transacción?')) return;
                   
                   var index = $scope.diarioGeneral.transaccionesDiario.indexOf(transaccion);
                   $scope.diarioGeneral.transaccionesDiario.splice(index, 1);

                   $scope.resultTransacciones.hasErrors = false;
               };
               
               $scope.setCatalogoCuenta = function (catalogoCuenta) {
                   $scope.transaccionDiario.catalogoCuenta = catalogoCuenta;
                   $scope.transaccionDiario.catalogoCuentaNombre = catalogoCuenta.nombre;
               };
               
               $scope.setRelacionado = function (relacionado) {
                   $scope.transaccionDiario.relacionado = relacionado;
                   $scope.transaccionDiario.relacionadoNombre = relacionado.nombre;
               };

               $scope.diarioGeneralEnabled = function () {
                   return $scope.diarioGeneral && $scope.diarioGeneral.enabled;
               };

               $scope.transaccionesHasErrors = function () {                   
                   var sumCredito = 0;
                   var sumDebito = 0;
                   
                   if (!$scope.diarioGeneral.transaccionesDiario.length) {
                       $scope.resultTransacciones.messages = ["Debe completar la grilla de transacciones diario."];

                       return true;
                   }
                   
                   $scope.diarioGeneral.transaccionesDiario.forEach(function (transaccion) {
                       sumCredito += transaccion.credito ? parseFloat(transaccion.credito) : 0;
                       sumDebito += transaccion.debito ? parseFloat(transaccion.debito) : 0;
                   });
                   
                   if (sumCredito != $scope.diarioGeneral.monto || sumDebito != $scope.diarioGeneral.monto) {
                       $scope.resultTransacciones.messages = ["La suma de las columnas Débito y Crédito deben coincidir con el monto ingresado."];

                       return true;
                   }

                   return false;
               };
               
               $scope.order = function (catalogoCuentas) {
                   catalogoCuentas.forEach(function (item) {
                       item.hijas = [];

                       catalogoCuentas.forEach(function (item2) {
                           if (item2.madre && item2.madre.id == item.id)
                               item.hijas.push(item2);
                       });

                       if (!item.madre)
                           $scope.catalogoCuentas.push(item);
                   });
               };
               
               $scope.toggleDetail = function (cuenta) {
                   if (cuenta.showDetail === null || typeof cuenta.showDetail == 'undefined')
                       cuenta.showDetail = false;

                   cuenta.showDetail = !cuenta.showDetail;
               };                             
               
               

               //#region Grids 

               $scope.gridTransaccionesDiario = {
                   data: 'diarioGeneral.transaccionesDiario',
                   columnDefs: [{ field: 'catalogoCuenta', displayName: 'Cuenta', width: 150, cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{row.entity.catalogoCuenta ? row.entity.catalogoCuenta.nombre: " "}}</span></div>' },
                                { field: 'debito', displayName: 'Débito', cellFilter: 'currency', width: 120 },
                                { field: 'credito', displayName: 'Crédito', cellFilter: 'currency', width: 120 },
                                { field: 'memo', displayName: 'Memo' },
                                { field: 'relacionado', displayName: 'Relacionado', width: 150, cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{row.entity.relacionado ? row.entity.relacionado.nombre: " "}}</span></div>' },
                                { displayName: 'Acciones', cellTemplate: $("#gridActionsTransaccionesDiario").html(), width: 80 }],
                   enableRowSelection: false,
                   showFooter: true,
                   enablePaging: false,
                   enableCellEditOnFocus: false
               };
               
               $scope.gridRelacionados = {
                   data: 'relacionados',
                   columnDefs: [{ field: 'id', displayName: 'Id' },
                                { field: 'nombre', displayName: 'Nombre' },
                                { field: 'tipoRelacion', displayName: 'Tipo de relación' },
                                { field: 'telefono', displayName: 'Teléfono' },
                                { displayName: 'Acciones', cellTemplate: $("#gridActionsRelacionados").html(), width: 80 }],
                   enableRowSelection: false,
                   showFooter: true,
                   enablePaging: false,
                   enableCellEditOnFocus: false
               };
                                                      
               //#endregion                             
                                            
               //#region Init     

               $scope.getDataEditInit = function (empresaId) {
                   libroDiarioGeneralService.getDataEditInit(empresaId).then(function (response) {                       
                       $scope.order(response.data.catalogoCuentaList);
                       $scope.relacionados = response.data.relacionados;
                   }, function () { throw 'Error on getDataEditInit'; });
               };                                          
                             
               if (angular.isUndefined($routeParams.id)) {
                   $scope.diarioGeneral = this.diarioGeneralInit;
                   $scope.diarioGeneral.empresaId = $routeParams.empresaId;
                   $scope.getDataEditInit($routeParams.empresaId);
               } else {
                   libroDiarioGeneralService.getDiarioGeneral($routeParams.id).then(function (response) {
                       $scope.diarioGeneral = response.data.data;                       
                       $scope.getDataEditInit($scope.diarioGeneral.empresaId);
                     
                   }, function () { throw 'Error on getDiarioGeneral'; });
               }                             

               //#endregion
           }]);