angular.module('contabilidad.conciliaciones.ctrl.edit', [])
       .controller('editCtrl', [
           '$scope',
           '$routeParams',
           'conciliacionesService',
           'libroBancoService',
           'navigationService',
           'validationService',
           function ($scope, $routeParams, conciliacionesService, libroBancoService, navigationService, validationService) {
               this.conciliacionInit = { id: null, cuentaBancariaId: null, transaccionesConciliadas: [], fechaConciliacion: null, balanceFinalEstadoBancario: null, diferencia: null, procesada: null };
               $scope.conciliacion = null;               
               $scope.transaccionesDisponibles = [];
               $scope.transaccionesSeleccionadas = [];               
               $scope.result = { hasErrors: false, messages: [] };
               $scope.editInt = false;
               $scope.computed = { totalCheques: null, totalDepositos: null, balanceFinalBancario: null, balanceFinalLibroBanco: null };
               
               $scope.validationMessages = {                   
                   fechaConciliacion: { required: 'Ingrese la fecha de conciliación' },                   
                   balanceFinalEstadoBancario: { required: 'Ingrese el balance final', number: 'El balance final debe ser numérico' }
               };
                                             
               //#region Oprations
               
               $scope.list = function() {
                   navigationService.goToList();
               };
               
               $scope.save = function () {
                   
                   $scope.result = validationService.validate($scope.conciliacionForm, $scope.validationMessages);

                   if ($scope.result.hasErrors) return;

                   if ($scope.conciliacion.id) {
                       conciliacionesService.updateConciliacion($scope.conciliacion).then(function (response) {
                           
                           if (!response.data.result.hasErrors) 
                               navigationService.goToList();
                           
                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.result.messages;
                           

                       }, function () { throw 'Error on updateConciliacion'; });
                   } else {
                       conciliacionesService.createConciliacion($scope.conciliacion).then(function (response) {
                           
                           if (!response.data.result.hasErrors)
                               navigationService.goToList();
                           
                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.result.messages;
                           
                       }, function () { throw 'Error on createConciliacion'; });
                   }                  
               };
               
               $scope.process = function () {

                   $scope.result = validationService.validate($scope.conciliacionForm, $scope.validationMessages);

                   if ($scope.result.hasErrors) return;
                   
                   conciliacionesService.processConciliacion($scope.conciliacion).then(function (response) {
                        if (!response.data.result.hasErrors)
                            navigationService.goToList();

                        $scope.result.hasErrors = true;
                        $scope.result.messages = response.data.result.messages;                       
                   }, function () { throw 'Error on processConciliacion'; });                   
               };
               
               $scope.getTransacciones = function () {
                   $scope.result.hasErrors = false;
                   $scope.transaccionesDisponibles = [];
                   var transacciones = [];

                   var filter = { fecha: $scope.conciliacion.fechaConciliacion, cuentaBancariaId: $scope.conciliacion.cuentaBancariaId };
                   
                   libroBancoService.getTransaccionesConciliacion(filter).then(function (response) {

                       $scope.computed.balanceFinalLibroBanco = response.data.data.balanceFinalLibroBanco.toFixed(2);
                                               
                       response.data.data.transacciones.forEach(function (transaccion) {
                           var exists = false;
                           
                           for (var i = 0; i < $scope.conciliacion.transaccionesConciliadas.length; i++) {
                               if ($scope.conciliacion.transaccionesConciliadas[i].transaccionBancaria.id == transaccion.id) {                                  
                                   exists = true;
                                   break;
                               }
                           }

                           if (!exists) {
                               transacciones.push(transaccion);
                           }
                       });

                       $scope.transaccionesDisponibles = transacciones;

                   }, function () { throw 'Error on GetTransaccionesConciliacion'; });
               };
               
               $scope.addTransacciones = function () {
                   $scope.transaccionesSeleccionadas.forEach(function (transaccion) {
                       var exists = false;

                       for (var i = 0; i < $scope.conciliacion.transaccionesConciliadas.length; i++) {
                           if ($scope.conciliacion.transaccionesConciliadas[i].transaccionBancaria.id == transaccion.id) {
                               exists = true;
                               break;
                           }
                       }
                       
                       if (!exists) {
                           var transaccionConciliada = { transaccionBancaria: transaccion };
                           $scope.conciliacion.transaccionesConciliadas.push(transaccionConciliada);
                       }

                   });

                   $scope.transaccionesSeleccionadas.forEach(function (transaccion) {                       
                       $scope.transaccionesDisponibles.splice($scope.transaccionesDisponibles.indexOf(transaccion), 1);
                   });                  
                   
                   $scope.transaccionesSeleccionadas.length = 0;
               };
               
               $scope.removeTransaccion = function (transaccion) {                   
                   $scope.conciliacion.transaccionesConciliadas.splice($scope.conciliacion.transaccionesConciliadas.indexOf(transaccion), 1);
                   $scope.transaccionesDisponibles.push(transaccion.transaccionBancaria);                   
               };
               
               $scope.toggleCheck = function (transaccion) {
                   if ($scope.transaccionesSeleccionadas.indexOf(transaccion) === -1) {
                       $scope.transaccionesSeleccionadas.push(transaccion);
                   } else {
                       $scope.transaccionesSeleccionadas.splice($scope.transaccionesSeleccionadas.indexOf(transaccion), 1);
                   }                   
               };

               $scope.showProcesar = function () {
                   if (!$scope.conciliacion) return false;
                   
                   return (!$scope.conciliacion.procesada || $scope.conciliacion.procesada == 'No') && $scope.conciliacion.transaccionesConciliadas.length && $scope.conciliacion.diferencia === 0.00;
               };
               
               $scope.message = function () {
                   var result = null;

                   if (!$scope.conciliacion) return result;

                   if (!$scope.conciliacion.transaccionesConciliadas.length)
                       result = "* Seleccione una o más transacciones";
                   else if ($scope.conciliacion.transaccionesConciliadas.length && ($scope.conciliacion.diferencia > 0.00 || ($scope.conciliacion.diferencia < 0.00)))
                       result = "* No podrá finalizar con la conciliación hasta que no existan diferencias";
                   else if ($scope.conciliacion.transaccionesConciliadas.length && $scope.conciliacion.diferencia === 0.00)
                       result = "* Conciliación habilitada para ser procesada";

                   return result;
               };
               
               $scope.messageClass = function () {
                   var result = null;

                   if (!$scope.conciliacion) return result;
                   
                   if (!$scope.conciliacion.transaccionesConciliadas.length)
                       result = "alert-warning";
                   else if ($scope.conciliacion.transaccionesConciliadas.length && ($scope.conciliacion.diferencia > 0.00 || ($scope.conciliacion.diferencia < 0.00)))
                       result = "alert-warning";
                   else if ($scope.conciliacion.transaccionesConciliadas.length && $scope.conciliacion.diferencia === 0.00)
                       result = "alert-success";

                   return result;
               };
               
               //#endregion
                              
               //#region Grid

               $scope.gridTrxDisponiblesOptions = {
                   data: 'transaccionesDisponibles',
                   columnDefs: [{ field: 'tipoTransaccion', displayName: 'Tipo de transacción', width: 180 },
                                { field: 'fecha', displayName: 'Fecha', cellFilter: 'date:\'dd/MM/yyyy\'' },                                
                                { field: 'monto', displayName: 'Monto' },                                                         
                                { displayName: 'Agregar', cellClass: 'actions-grid-cell', cellTemplate: $("#gridTrxDisponiblesActions").html() }
                   ],
                   showFooter: true,
                   enablePaging: true,
                   pagingOptions: {
                       pageSizes: [5, 10],
                       pageSize: 10,
                       currentPage: 1
                   }
               };
               
               $scope.gridTrxSeleccionadasOptions = {
                   data: 'conciliacion.transaccionesConciliadas',
                   columnDefs: [{ field: 'transaccionBancaria.tipoTransaccion', displayName: 'Tipo de transacción', width: 180 },
                                { field: 'transaccionBancaria.fecha', displayName: 'Fecha', cellFilter: 'date:\'dd/MM/yyyy\'' },
                                { field: 'transaccionBancaria.monto', displayName: 'Monto' },
                                { displayName: 'Eliminar', cellClass: 'actions-grid-cell', cellTemplate: $("#gridTrxSeleccionadasActions").html() }
                   ],
                   showFooter: true,
                   enablePaging: true,
                   pagingOptions: {
                       pageSizes: [5, 10],
                       pageSize: 10,
                       currentPage: 1
                   }
               };

               //#endregion
               
               //#region watch
               
               $scope.$watch('conciliacion.fechaConciliacion', function () {
                   if (!$scope.conciliacion) return;

                   if ($scope.editInt) {
                       $scope.editInt = false;
                       return;
                   }

                   $scope.transaccionesDisponibles = [];
                   $scope.conciliacion.transaccionesConciliadas = [];
                   $scope.computed.balanceFinalLibroBanco = null;

                   if ($scope.conciliacion.fechaConciliacion)
                       $scope.getTransacciones();
               });
               
               $scope.$watchCollection('transaccionesDisponibles', function () {
                   $scope.computed.totalCheques = null;
                   $scope.computed.totalDepositos = null;
                   $scope.computed.balanceFinalBancario = null;                   

                   $scope.transaccionesDisponibles.forEach(function (transaccion) {
                       if (transaccion.tipoTransaccion == "Cheque" ||
                           transaccion.tipoTransaccion == "NotaDebito" ||
                           (transaccion.tipoTransaccion == "Transferencia" && transaccion.CuentaBancariaDestinoId)) {
                           $scope.computed.totalCheques += transaccion.monto;
                       } else {
                           $scope.computed.totalDepositos += transaccion.monto;
                       }
                   });

                   if (!$scope.conciliacion) return;

                   $scope.computed.balanceFinalBancario = (($scope.conciliacion.balanceFinalEstadoBancario - Math.abs($scope.computed.totalCheques) + $scope.computed.totalDepositos) || 0).toFixed(2);
               });
               
               $scope.$watch('conciliacion.balanceFinalEstadoBancario', function () {
                   if (!$scope.conciliacion) return;
                   
                   $scope.computed.balanceFinalBancario = null;
                   $scope.computed.balanceFinalBancario = (($scope.conciliacion.balanceFinalEstadoBancario - Math.abs($scope.computed.totalCheques) + $scope.computed.totalDepositos) || 0 ).toFixed(2);
               });
               
               $scope.$watch('computed.balanceFinalBancario', function () {
                   if (!$scope.conciliacion) return;
                   
                   $scope.conciliacion.diferencia = parseFloat((($scope.computed.balanceFinalLibroBanco - Math.abs($scope.computed.balanceFinalBancario)) || 0).toFixed(2));
                   
               });
               
               $scope.$watch('computed.balanceFinalLibroBanco', function () {
                   if (!$scope.conciliacion) return;
                   
                   $scope.conciliacion.diferencia = parseFloat((($scope.computed.balanceFinalLibroBanco - Math.abs($scope.computed.balanceFinalBancario)) || 0).toFixed(2));
               }); 
               
               //#endregion
                                                           
               //#region Init                    
                             
               if (angular.isUndefined($routeParams.id)) {
                   $scope.conciliacion = this.conciliacionInit;
                   $scope.conciliacion.cuentaBancariaId = $routeParams.cuentaBancariaId;

               } else {
                   $scope.editInt = true;
                   
                   conciliacionesService.getConciliacion($routeParams.id).then(function (response) {                       
                       $scope.conciliacion = response.data.data.conciliacion;
                       $scope.computed.balanceFinalLibroBanco = response.data.data.balanceFinalLibroBanco.toFixed(2);
                       $scope.getTransacciones();
                       
                   }, function () { throw 'Error on getConciliacion'; });
               }               

               //#endregion
           }]);