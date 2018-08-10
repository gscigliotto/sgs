angular.module('contabilidad.relacionados.ctrl.list', [])
       .controller('listCtrl', [
           '$scope',           
           'relacionadosService',
           'navigationService',
           function ($scope, relacionadosService, navigationService) {
               $scope.relacionados = [];
               
               $scope.edit = function (id) {                   
                   navigationService.goToEdit(id);
               };
               
               $scope.create = function () {
                   navigationService.goToCreate();
               };              
               
               //#region Grid
               
               $scope.gridOptions = {                  
                   data: 'relacionados',
                   columnDefs: [{ field: 'id', displayName: 'Id' },
                                { field: 'nombre', displayName: 'Nombre' },
                                { field: 'tipoRelacion', displayName: 'Tipo de relación' },
                                { field: 'telefono', displayName: 'Teléfono' },
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
                                            
               relacionadosService.getDataListInit().then(function (response) {
                   $scope.relacionados = response.data.data.relacionados;
               }, function () { throw 'Error on getDataListInit'; });
               
               //#endregion
              
           }]);