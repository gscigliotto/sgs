angular.module('sgs.clientes.ctrl.list', [])
       .controller('listCtrl', [
           '$scope',
           '$filter',
           '$routeParams',
           '$location',
           'clientesService',
           'navigationService',                      
           function ($scope, $filter, $routeParams, $location, clientesService, navigationService) {
               $scope.clientes = [];
               
               $scope.create = function () {
                   navigationService.goToCreate();
               };

               $scope.edit = function (id) {
                   navigationService.goToEdit(id);
               };

               //#region Grid

               $scope.gridOptions = {
                   data: 'clientes',
                   columnDefs: [{ field: 'id',       displayName: 'Id',       width: 50 },
                                { field: 'razonSocial',     displayName: 'Razón social', },
                                { field: 'email',   displayName: 'Email' },
                                { displayName: 'Acciones', cellTemplate: $("#gridActions").html(), width: 100 }
                       
                   ],
                   showFooter: true,
                   enablePaging: false,
                   pagingOptions: {
                       pageSizes: [5, 10],
                       pageSize: 10,
                       currentPage: 1
                   }
               };
                          
               //#endregion

               //#region Init

               clientesService.getDataListInit().then(function (response) {
                   $scope.clientes = response.data.clientes;
               }, function () { throw 'Error on getDataListInit'; });

               //#endregion
           }]);