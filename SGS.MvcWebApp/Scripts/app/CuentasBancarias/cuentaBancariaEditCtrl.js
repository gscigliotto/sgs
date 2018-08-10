angular.module('contabilidad.cuentasBancarias.ctrl.edit', [])
       .controller('editCtrl', [
           '$scope',
           '$routeParams',
           'cuentasBancariasService',
           'navigationService',
           'validationService',
           function ($scope, $routeParams, cuentasBancariasService, navigationService, validationService) {               
               this.cuentaBancariaInit = { id: 0, tipoCuentaBancaria: null, tipoMoneda: null,  modeloCheque: null, banco: { id: null }, catalogoCuenta: { id: null }, empresa: null, numeroCuenta: null, fechaApertura: null, balanceMinimo: null, balanceOptimo: null, numeroPrimerCheque: null, fechaProximoCorte: null, fechaVencimiento: null, formaPago: null, limiteCredito: null, montoApertura: null, tasa: null };
                                             
               $scope.cuentaBancaria = null;               
               $scope.result = { hasErrors: false, messages: [] };
               $scope.empresa = null;
               $scope.bancos = [];
               $scope.tiposCuenta = [];
               $scope.tiposMoneda = [];
               $scope.catalogoCuentaList = [];
               $scope.formasPago = [];
               $scope.validationMessages = null;                               
               
               $scope.list = function() {
                   navigationService.goToList($scope.empresa.id);
               };
               
               $scope.save = function () {
                   
                   $scope.result = validationService.validate($scope.cbForm, $scope.validationMessages);

                   if ($scope.result.hasErrors) return;
                   
                   if ($scope.cuentaBancaria.id) {
                       $scope.cleanCuentaBancaria();
                       
                       cuentasBancariasService.updateCuentaBancaria($scope.cuentaBancaria).then(function (response) {
                           
                           if (!response.data.result.hasErrors) 
                               navigationService.goToList();
                           
                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.result.messages;
                           

                       }, function () { throw 'Error on saveCuentaBancaria'; });
                   } else {
                       cuentasBancariasService.createCuentaBancaria($scope.cuentaBancaria).then(function (response) {
                           
                           if (!response.data.result.hasErrors)
                               navigationService.goToList();
                           
                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.result.messages;
                           
                       }, function () { throw 'Error on saveCuentaBancaria'; });
                   }                  
               };

               $scope.cleanCuentaBancaria = function () {
                   switch ($scope.cuentaBancaria.tipoCuentaBancaria) {
                       case 'CuentaCorriente':
                           $scope.cuentaBancaria.limiteCredito = null;
                           $scope.cuentaBancaria.fechaVencimiento = null;
                           $scope.cuentaBancaria.tasa = null;
                           $scope.cuentaBancaria.fechaProximoCorte = null;
                           $scope.cuentaBancaria.formaPago = null;
                           $scope.cuentaBancaria.montoApertura = null;
                           break;
                       case 'CuentaAhorro':
                           $scope.cuentaBancaria.modeloCheque = null;
                           $scope.cuentaBancaria.numeroPrimerCheque = null;
                           $scope.cuentaBancaria.limiteCredito = null;
                           $scope.cuentaBancaria.fechaVencimiento = null;
                           $scope.cuentaBancaria.tasa = null;
                           $scope.cuentaBancaria.fechaProximoCorte = null;
                           $scope.cuentaBancaria.formaPago = null;
                           $scope.cuentaBancaria.montoApertura = null;
                           break;
                       case 'CertificadoFinanciero':
                       case 'CuentaInversion':
                           $scope.cuentaBancaria.modeloCheque = null;
                           $scope.cuentaBancaria.numeroPrimerCheque = null;
                           $scope.cuentaBancaria.limiteCredito = null;
                           $scope.cuentaBancaria.fechaProximoCorte = null;
                           $scope.cuentaBancaria.balanceMinimo = null;
                           $scope.cuentaBancaria.balanceOptimo = null;
                           break;
                       case 'TarjetaCredito':
                       case 'LineaCredito':
                       case 'PrestamoBancario':
                           $scope.cuentaBancaria.modeloCheque = null;
                           $scope.cuentaBancaria.numeroPrimerCheque = null;                           
                           $scope.cuentaBancaria.balanceMinimo = null;
                           $scope.cuentaBancaria.balanceOptimo = null;
                           $scope.cuentaBancaria.formaPago = null;
                           $scope.cuentaBancaria.montoApertura = null;
                           break;                                              
                   }

               };
               
               //#region Watches

               $scope.$watch("cuentaBancaria.tipoCuentaBancaria", function(newValue, oldValue) {
                   
                   switch(newValue) {
                       case 'CuentaCorriente':
                           $scope.validationMessages = {
                               tipoCuentaBancaria: { required: 'Seleccione el tipo de cuenta' },
                               tipoMoneda: { required: 'Seleccione el tipo de moneda' },
                               banco: { required: 'Seleccione un banco' },
                               catalogoCuenta: { required: 'Seleccione un catálogo de cuenta' },
                               numeroCuenta: { required: 'Ingrese el número de cuenta' },
                               fechaApertura: { required: 'Ingrese la fecha de apertura' },
                               balanceMinimo: { required: 'Ingrese el balance mínimo', number: 'El balance mínimo debe ser numérico' },
                               balanceOptimo: { required: 'Ingrese el balance óptimo', number: 'El balance óptimo debe ser numérico' },
                               numeroPrimerCheque: { required: 'Ingrese el número del primer cheque', number: 'El número del primer cheque debe ser numérico' }
                           };
                           break;
                       case 'CuentaAhorro':
                           $scope.validationMessages = {
                               tipoCuentaBancaria: { required: 'Seleccione el tipo de cuenta' },
                               tipoMoneda: { required: 'Seleccione el tipo de moneda' },
                               banco: { required: 'Seleccione un banco' },
                               catalogoCuenta: { required: 'Seleccione un catálogo de cuenta' },
                               numeroCuenta: { required: 'Ingrese el número de cuenta' },
                               fechaApertura: { required: 'Ingrese la fecha de apertura' },
                               balanceMinimo: { required: 'Ingrese el balance mínimo', number: 'El balance mínimo debe ser numérico' },
                               balanceOptimo: { required: 'Ingrese el balance óptimo', number: 'El balance óptimo debe ser numérico' }                               
                           };
                           break;
                       case 'CertificadoFinanciero':
                       case 'CuentaInversion':
                           $scope.validationMessages = {
                               tipoCuentaBancaria: { required: 'Seleccione el tipo de cuenta' },
                               tipoMoneda: { required: 'Seleccione el tipo de moneda' },
                               banco: { required: 'Seleccione un banco' },
                               catalogoCuenta: { required: 'Seleccione un catálogo de cuenta' },
                               numeroCuenta: { required: 'Ingrese el número de cuenta' },
                               fechaApertura: { required: 'Ingrese la fecha de apertura' },
                               fechaVencimiento: { required: 'Ingrese la fecha de vencimiento' },
                               formaPago: { required: 'Seleccione la forma de pago' },
                               tasa: { required: 'Ingrese la tasa', number: 'La tasa debe ser numérica' },
                               montoApertura: { required: 'Ingrese el monto de apertura', number: 'El monto de apertura debe ser numérico' }                               
                           };
                           break;
                       case 'TarjetaCredito':
                       case 'LineaCredito':
                       case 'PrestamoBancario':
                           $scope.validationMessages = {
                               tipoCuentaBancaria: { required: 'Seleccione el tipo de cuenta' },
                               tipoMoneda: { required: 'Seleccione el tipo de moneda' },
                               banco: { required: 'Seleccione un banco' },
                               catalogoCuenta: { required: 'Seleccione un catálogo de cuenta' },
                               numeroCuenta: { required: 'Ingrese el número de cuenta' },
                               fechaApertura: { required: 'Ingrese la fecha de apertura' },
                               fechaVencimiento: { required: 'Ingrese la fecha de vencimiento' },
                               fechaProximoCorte: { required: 'Ingrese la fecha del próximo corte' },
                               tasa: { required: 'Ingrese la tasa', number: 'La tasa debe ser numérica' },
                               limiteCredito: { required: 'Ingrese el límite de crédito', number: 'El límite de crédito debe ser numérico' }
                           };
                           break;
                       default:
                           $scope.validationMessages = { tipoCuentaBancaria: { required: 'Seleccione el tipo de cuenta' } };
                           break;
                   }                
               });


               //#endregion

              
               //#region Init
                                             
                $scope.getDataEditInit = function (empresaId) {
                       
                    cuentasBancariasService.getDataEditInit(empresaId).then(function (response) {
                        $scope.empresa = response.data.empresa;
                        $scope.bancos = response.data.bancos;
                        $scope.tiposCuenta = response.data.tiposCuenta;
                        $scope.tiposMoneda = response.data.tiposMoneda;
                        $scope.catalogoCuentaList = response.data.catalogoCuentaList;
                        $scope.formasPago = response.data.formasPago;
                    }, function () { throw 'Error on getDataEditInit'; });
                       
                };
                                                                         
               if (angular.isUndefined($routeParams.id)) {
                   $scope.cuentaBancaria = this.cuentaBancariaInit;
                   $scope.getDataEditInit($routeParams.empresaId);
               } else {
                   cuentasBancariasService.getCuentaBancaria($routeParams.id).then(function (response) {
                       $scope.cuentaBancaria = response.data.data;
                       $scope.getDataEditInit($scope.cuentaBancaria.empresa.id);
                   }, function () { throw 'Error on getCuentaBancaria'; });
               }               

               //#endregion
           }]);