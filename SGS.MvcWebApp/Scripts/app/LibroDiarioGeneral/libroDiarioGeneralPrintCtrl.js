angular.module('contabilidad.libroDiarioGeneral.ctrl.print', [])
       .controller('printCtrl', [
           '$scope',
           '$filter',
           '$routeParams',
           '$location',
           'libroDiarioGeneralService',           
           'navigationService',
           'validationService',
           'filterService',
           function ($scope, $filter, $routeParams, $location, libroDiarioGeneralService, navigationService, validationService, filterService) {               
               $scope.diarioGeneral = null;                                                            

               $scope.list = function () {
                   navigationService.goToList($scope.diarioGeneral.empresaId);
               };                                           

               //#region Grid 

               $scope.gridTransaccionesDiario = {
                   data: 'diarioGeneral.transaccionesDiario',
                   columnDefs: [{ field: 'catalogoCuenta', displayName: 'Cuenta', width: 150, cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{row.entity.catalogoCuenta ? row.entity.catalogoCuenta.nombre: " "}}</span></div>' },
                                { field: 'debito', displayName: 'Débito', cellFilter: 'currency', width: 120 },
                                { field: 'credito', displayName: 'Crédito', cellFilter: 'currency', width: 120 },
                                { field: 'memo', displayName: 'Memo' }],
                   enableRowSelection: false,
                   showFooter: true,
                   enablePaging: false,
                   enableCellEditOnFocus: false
               };

               //#endregion                             

               //#region Init                  
             
               libroDiarioGeneralService.getDiarioGeneral($routeParams.id).then(function (response) {
                    $scope.diarioGeneral = response.data.data;                    

               }, function () { throw 'Error on getDiarioGeneral'; });               

               //#endregion
           }]);