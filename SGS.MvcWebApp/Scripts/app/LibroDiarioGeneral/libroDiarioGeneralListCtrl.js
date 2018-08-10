angular.module('contabilidad.libroDiarioGeneral.ctrl.list', [])
       .controller('listCtrl', [
           '$scope',
           '$routeParams',
           '$location',
           '$filter',
           'libroDiarioGeneralService',
           'navigationService',
           'validationService',
           'filterService',
           function ($scope, $routeParams, $location, $filter, libroDiarioGeneralService, navigationService, validationService, filterService) {
               $scope.filter = { empresaId: null, moduloOrigen: null, fechaDesde: $filter('date')(new Date().setDate(new Date().getDate() - 14), "dd/MM/yyyy"), fechaHasta: $filter('date')(new Date(), "dd/MM/yyyy") };
               $scope.diarioGeneralList = [];
               $scope.modulos = [];
               $scope.empresa = null;
               $scope.result = { hasErrors: false, messages: [] };
               $scope.validationMessages = {
                   fechaDesde: { required: 'Ingrese la fecha desde' },
                   fechaHasta: { required: 'Ingrese la fecha hasta' }
               };

               //#region Operations
               
               $scope.find = function () {

                   $scope.result = validationService.validate($scope.filterForm, $scope.validationMessages);

                   if ($scope.result.hasErrors) return;

                   libroDiarioGeneralService.getDiarioGeneralListByFilter($scope.filter).then(function (response) {
                       $scope.diarioGeneralList = response.data.data;
                   }, function () { throw 'Error on getDiarioGeneralListByFilter'; });
               };
               
               $scope.clear = function () {
                   $scope.result.hasErrors = false;

                   $scope.filter.moduloOrigen = null;                
                   $scope.filter.fechaDesde = null;
                   $scope.filter.fechaHasta = null;
                   $scope.diarioGeneralList = [];
               };

               $scope.edit = function (id) {
                   filterService.setFilter($scope.filter);
                   navigationService.goToEdit(id);
               };

               $scope.create = function () {
                   filterService.setFilter($scope.filter);
                   navigationService.goToCreate($scope.empresa.id);
               };

               $scope.deleteDiarioGeneral = function (diarioGeneral) {
                   if (!confirm('Desea continuar con la operación?')) return;

                   libroDiarioGeneralService.deleteDiarioGeneral(diarioGeneral.id).then(function (response) {

                       if (!response.data.result.hasErrors) {
                           var index = diarioGeneralList.indexOf(diarioGeneral);
                           diarioGeneralList.splice(index, 1);
                       } else {
                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.result.messages;
                       }

                   }, function () { throw 'Error on deleteDiarioGeneral'; });
               };             

               $scope.print = function (id) {
                   filterService.setFilter($scope.filter);                   
                   navigationService.goToPrint(id);
               };              

               //#endregion
               
               //#region Grid

               $scope.gridOptions = {
                   data: 'diarioGeneralList',
                   columnDefs: [{ field: 'id', displayName: 'Id', width: 50 },
                                { field: 'fecha', displayName: 'Fecha', cellFilter: 'date:\'dd/MM/yyyy\'', width: 90 },
                                { field: 'moduloOrigen', displayName: 'Modulo', width: 120 },                                
                                { field: 'descripcion', displayName: 'Descripcion' },
                                { field: 'monto', displayName: 'Monto', cellFilter: 'currency', width: 140 },                                
                                { field: 'status', displayName: 'Status', width: 120 },                              
                                { displayName: 'Acciones', cellTemplate: $("#gridActions").html(), width: 140 }
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
               
               $scope.filter.empresaId = location.search.split("=")[1];

               libroDiarioGeneralService.getDataListInit($scope.filter.empresaId).then(function (response) {
                   $scope.empresa = response.data.data.empresa;
                   $scope.modulos = response.data.data.modulos;
                   
                   var filterAux = filterService.getFilter();

                   if (filterAux) {
                       $scope.filter = filterAux;

                       $scope.find();
                   }
                   
               }, function () { throw 'Error on getDataInit'; });

               //#endregion

           }]);