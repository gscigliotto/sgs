angular.module('contabilidad.bancos.ctrl.list', [])
       .controller('listCtrl', [
           '$scope',           
           'bancosService',
           'navigationService',
           function ($scope, bancosService, navigationService) {
               $scope.bancos = [];
               
               $scope.edit = function (id) {                   
                   navigationService.goToEdit(id);
               };
               
               $scope.create = function () {
                   navigationService.goToCreate();
               };              
               
               //#region Grid
               
               $scope.gridOptions = {                  
                   data: 'bancos',
                   columnDefs: [{ field: 'id', displayName: 'Id' },
                                { field: 'nombre', displayName: 'Nombre' },
                                { field: 'gerente', displayName: 'Gerente' },                                
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
                                            
               bancosService.getDataListInit().then(function (response) {
                   $scope.bancos = response.data.data.bancos;
               }, function () { throw 'Error on getDataListInit'; });
               
               //#endregion
              
           }]);