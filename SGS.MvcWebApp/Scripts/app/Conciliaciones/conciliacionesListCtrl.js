angular.module('contabilidad.conciliaciones.ctrl.list', [])
       .controller('listCtrl', [
           '$scope',
           '$routeParams',
           '$location',
           'conciliacionesService',
           'cuentasBancariasService',
           'navigationService',
           function ($scope, $routeParams, $location, conciliacionesService, cuentasBancariasService, navigationService) {
               $scope.filter = { procesada: null, fechaDesde: null, fechaHasta: null, cuentaBancariaId: null };               
               $scope.conciliaciones = [];               
               $scope.cuentaBancaria = null;
               $scope.fechaUltimaConciliacion = null;
               $scope.result = { hasErrors: false, messages: [] };
               $scope.conciliacionCerradaExists = false;
               
               $scope.edit = function (id) {                   
                   navigationService.goToEdit(id);
               };
               
               $scope.create = function () {
                   navigationService.goToCreate($scope.cuentaBancaria.id);
               };
               
               $scope.reopen = function () {
                   if (!confirm('Desea reabrir la última conciliación?')) return;

                   conciliacionesService.reopenConciliacion($scope.filter.cuentaBancariaId).then(function (response) {

                       $scope.result.hasErrors = true;
                       
                       if (!response.data.result.hasErrors) {
                           $scope.conciliacionCerradaExists = false;
                           $scope.find();
                           $scope.result.messages.push('La conciliación se reabrió correctamente');
                       } else {                         
                           $scope.result.messages = response.data.result.messages;
                       }

                   }, function () { throw 'Error on reopenConciliacion'; });
               };
               
               $scope.clear = function () {                   
                   $scope.filter.procesada = null;                   
                   $scope.filter.fechaDesde = null;
                   $scope.filter.fechaHasta = null;
                   $scope.conciliaciones = [];
                   $scope.result.hasErrors = false;
               };
               
               $scope.find = function () {
                   conciliacionesService.getConciliacionesByFilter($scope.filter).then(function (response) {
                       $scope.conciliaciones = response.data.data;
                   }, function () { throw 'Error on getConciliacionesByFilter'; });
               };
               
               //#region Grid
              
               $scope.gridOptions = {                  
                   data: 'conciliaciones',
                   columnDefs: [{ field: 'id', displayName: 'Id' },                                
                                { field: 'fechaConciliacion', displayName: 'Fecha conciliación', cellFilter: 'date:\'dd/MM/yyyy\''},
                                { field: 'balanceFinalEstadoBancario', displayName: 'Balance final', cellFilter: 'currency' },
                                { field: 'diferencia', displayName: 'Diferencia', cellFilter: 'currency' },
                                { field: 'procesada', displayName: 'Procesada' },                                
                                { displayName: 'Acciones', cellTemplate: $("#gridActions").html() }
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

               var cuentaBancariaId = location.search.split("=")[2];
               $scope.filter.cuentaBancariaId = cuentaBancariaId;

               
               conciliacionesService.getDataListInit(cuentaBancariaId).then(function (response) {
                   $scope.conciliaciones = response.data.data.conciliaciones;
                   $scope.fechaUltimaConciliacion = response.data.data.fechaUltimaConciliacion;
                   $scope.conciliacionCerradaExists = response.data.data.conciliacionCerradaExists;
               }, function () { throw 'Error on getDataInit'; });
               
               cuentasBancariasService.getCuentaBancaria(cuentaBancariaId).then(function (response) {
                   $scope.cuentaBancaria = response.data.data;

               }, function () { throw 'Error on getCuentaBancaria'; });
               
               //#endregion
              
           }]);