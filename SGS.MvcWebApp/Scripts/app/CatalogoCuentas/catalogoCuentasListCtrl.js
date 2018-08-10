angular.module('contabilidad.catalogoCuentas.ctrl.list', [])
       .controller('listCtrl', [
           '$scope',
           '$filter',
           '$routeParams',
           '$location',
           'catalogoCuentasService',           
           'navigationService',
           'filterService',           
           function ($scope, $filter, $routeParams, $location, catalogoCuentasService, navigationService, filterService) {
               $scope.filter = {empresaId: null, fechaDesde: $filter('date')(new Date().setDate(new Date().getDate() - 14), "dd/MM/yyyy"), fechaHasta: $filter('date')(new Date(), "dd/MM/yyyy"), report: null };
               $scope.catalogoCuentas = [];
               $scope.reports = [];
               $scope.empresa = null;
               $scope.result = { hasErrors: false, messages: [] };               
               
               //#region Operations

               $scope.edit = function (id) {                   
                   navigationService.goToEdit(id);
               };
               
               $scope.create = function () {
                   navigationService.goToCreate($scope.empresa.id);
               };
               
               $scope.deleteCatalogoCuenta = function (container, cuenta) {
                   if (!confirm('Desea eliminar la cuenta?')) return;

                   catalogoCuentasService.deleteCatalogoCuenta(cuenta.id).then(function (response) {

                       if (!response.data.result.hasErrors) {
                           var index = container.indexOf(cuenta);
                           container.splice(index, 1);
                       } else {
                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.result.messages;
                       }

                   }, function () { throw 'Error on deleteCatalogoCuenta'; });
               };
                              
               $scope.toggleDetail = function (cuenta) {
                   if (cuenta.showDetail === null || typeof cuenta.showDetail == 'undefined')
                       cuenta.showDetail = false;
                   
                   cuenta.showDetail = !cuenta.showDetail;
               };
               
               $scope.print = function () {
                   $scope.result.hasErrors = false;
                   
                   if (!$scope.filter.report) {
                       $scope.result.hasErrors = true;
                       $scope.result.messages = ['Seleccione el reporte a imprimir'];
                   }
                   
                   if ($scope.filter.report == 'BalanceGeneral' && !$scope.filter.fechaHasta) {
                       $scope.result.hasErrors = true;
                       $scope.result.messages = ['Ingrese la fecha hasta'];
                   }
                   
                   if ($scope.filter.report == 'EstadoResultados' && (!$scope.filter.fechaDesde || !$scope.filter.fechaHasta)) {
                       $scope.result.hasErrors = true;
                       $scope.result.messages = ['Ingrese el rango de fechas'];
                   }


                   if ($scope.result.hasErrors) return;

                   filterService.setFilter($scope.filter);
                   navigationService.goToPrint($scope.empresa.id);
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
               
               //#endregion
               
               //#region Init        
               
               var empresaId = location.search.split("=")[1];
               $scope.filter.empresaId = empresaId;
               
               catalogoCuentasService.getDataListInit(empresaId).then(function (response) {                   
                   $scope.empresa = response.data.data.empresa;
                   $scope.order(response.data.data.catalogoCuentas);
                   $scope.reports = response.data.data.reports;
               }, function () { throw 'Error on getDataListInit'; });
                            
               
               //#endregion
              
           }]);