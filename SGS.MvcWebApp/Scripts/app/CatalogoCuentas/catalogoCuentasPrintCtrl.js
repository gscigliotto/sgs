angular.module('contabilidad.catalogoCuentas.ctrl.print', [])
       .controller('printCtrl', [
           '$scope',
           '$filter',
           '$routeParams',
           '$location',           
           'catalogoCuentasService',
           'navigationService',
           'filterService',
           function ($scope, $filter, $routeParams, $location, catalogoCuentasService, navigationService, filterService) {
               $scope.report = null;
               $scope.result = { hasErrors: false, messages: [] };
               $scope.filter = null;
               $scope.reportTitle = null;
                                                                               
               $scope.list = function () {
                   navigationService.goToList($routeParams.empresaId);
               };
               
               $scope.order = function (catalogoCuentas) {
                   catalogoCuentas.forEach(function (item) {
                       item.hijas = [];                       

                       catalogoCuentas.forEach(function (item2) {
                           if (item2.madre && item2.madre.id == item.id) {
                               item.hijas.push(item2);
                               item.showDetail = true;
                           }
                       });

                       if (!item.madre)
                           $scope.catalogoCuentas.push(item);
                   });
               };
               
               //#region Init

               $scope.filter = filterService.getFilter();
               $scope.reportTitle = $scope.filter.report == 'BalanceGeneral' ? 'Balance General' : $scope.filter.report == 'EstadoResultados' ? 'Estado de Resultados' : 'Balanza de Comprobación';                            

               catalogoCuentasService.getDataPrintInit($scope.filter).then(function (response) {
                   $scope.report = response.data.data.report;
               }, function () { throw 'Error on getDataPrintInit'; });

               //#endregion

           }]);