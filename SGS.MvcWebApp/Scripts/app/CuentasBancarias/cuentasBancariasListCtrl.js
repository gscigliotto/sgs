angular.module('contabilidad.cuentasBancarias.ctrl.list', [])
       .controller('listCtrl', [
           '$scope',           
           'cuentasBancariasService',
           'navigationService',
           function ($scope, cuentasBancariasService, navigationService) {
               $scope.empresa = null;
               $scope.cuentasBancariasGroup1 = [];
               $scope.cuentasBancariasGroup2 = [];
               $scope.cuentasBancariasGroup3 = [];
               
               $scope.edit = function (id) {                   
                   navigationService.goToEdit(id);
               };
               
               $scope.create = function () {
                   navigationService.goToCreate($scope.empresa.id);
               };

               $scope.setGroups = function (cuentasBancarias) {
                   cuentasBancarias.forEach(function(cuentaBancaria) {
                       switch (cuentaBancaria.tipoCuentaBancaria) {
                           case 'CuentaCorriente':
                           case 'CuentaAhorro':
                               $scope.cuentasBancariasGroup1.push(cuentaBancaria);
                               break;
                           case 'TarjetaCredito':
                           case 'LineaCredito':
                           case 'PrestamoBancario':
                               $scope.cuentasBancariasGroup2.push(cuentaBancaria);
                               break;
                           case 'CertificadoFinanciero':
                           case 'CuentaInversion':
                               $scope.cuentasBancariasGroup3.push(cuentaBancaria);
                               break;
                       }
                   });
                   
               };
               
               //#region Grid
               
               $scope.grid1Options = {                  
                   data: 'cuentasBancariasGroup1',
                   columnDefs: [{ field: 'banco.nombre', displayName: 'Banco' },
                                { field: 'numeroCuenta', displayName: 'Número de cuenta' },
                                { field: 'tipoCuentaBancaria', displayName: 'Tipo de cuenta' },
                                { field: 'tipoMoneda', displayName: 'Tipo de moneda' },
                                { field: 'balanceOptimo', displayName: 'Balance óptimo', cellFilter: 'currency' },
                                { field: 'balanceActual', displayName: 'Balance actual', cellFilter: 'currency' },
                                { displayName: 'Acciones', cellTemplate: $("#gridActions").html(), width: 240, cellClass: 'actions-grid-cell' }
                   ],
                   showFooter: true,
                   enablePaging: true,
                   pagingOptions: {
                       pageSizes: [5, 10],
                       pageSize: 10,                       
                       currentPage: 1
                   }
               };
               
               $scope.grid2Options = {
                   data: 'cuentasBancariasGroup2',
                   columnDefs: [{ field: 'banco.nombre', displayName: 'Banco' },
                                { field: 'numeroCuenta', displayName: 'Número de cuenta' },
                                { field: 'tipoCuentaBancaria', displayName: 'Tipo de cuenta' },
                                { field: 'tipoMoneda', displayName: 'Tipo de moneda' },
                                { field: 'limiteCredito', displayName: 'Límite de crédito', cellFilter: 'currency' },
                                { field: 'disponible', displayName: 'Disponible', cellFilter: 'currency' },
                                { field: 'balanceActual', displayName: 'Balance actual', cellFilter: 'currency' },
                                { displayName: 'Acciones', cellTemplate: $("#gridActions").html(), width: 240, cellClass: 'actions-grid-cell' }
                   ],
                   showFooter: true,
                   enablePaging: true,
                   pagingOptions: {
                       pageSizes: [5, 10],
                       pageSize: 10,
                       currentPage: 1
                   }
               };
               
               $scope.grid3Options = {
                   data: 'cuentasBancariasGroup3',
                   columnDefs: [{ field: 'banco.nombre', displayName: 'Banco' },
                                { field: 'numeroCuenta', displayName: 'Número de cuenta' },
                                { field: 'tipoCuentaBancaria', displayName: 'Tipo de cuenta' },
                                { field: 'tipoMoneda', displayName: 'Tipo de moneda' },
                                { field: 'fechaVencimiento', displayName: 'Fecha vencimiento', cellFilter: 'date:\'dd/MM/yyyy\'' },
                                { field: 'balanceActual', displayName: 'Balance actual', cellFilter: 'currency' },
                                { displayName: 'Acciones', cellTemplate: $("#gridActions").html(), width: 240, cellClass: 'actions-grid-cell' }
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
               
               //#region Init
               
               var empresaId = location.search.split("=")[1];
               
               cuentasBancariasService.getDataListInit(empresaId).then(function (response) {
                   $scope.empresa = response.data.data.empresa;
                   $scope.setGroups(response.data.data.cuentasBancarias);
               }, function () { throw 'Error on getDataListInit'; });
               
               //#endregion
              
           }]);