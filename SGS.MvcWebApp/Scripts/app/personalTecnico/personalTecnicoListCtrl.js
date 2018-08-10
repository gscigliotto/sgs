angular.module('sgs.personalTecnico.ctrl.list', [])
       .controller('listCtrl', [
           '$scope',
           '$filter',
           '$routeParams',
           '$location',
           'personalTecnicoService',
           'navigationService',                      
           function ($scope, $filter, $routeParams, $location, personalTecnicoService, navigationService) {
               $scope.filter = { value: null };
               $scope.personalTecnicoList = [];
               $scope.personalTecnicoListFiltered = [];
               
               $scope.create = function () {
                   navigationService.goToCreate();
               };

               $scope.edit = function (id) {
                   navigationService.goToEdit(id);
               };

               $scope.cleanFilter = function () {
                   $scope.filter.value = null;                   
               };

               //#region Grid

               $scope.gridOptions = {
                   data: 'personalTecnicoListFiltered',
                   columnDefs: [{ field: 'id',       displayName: 'Id',       width: 50 },
                                { field: 'nick',     displayName: 'Nick',     width: 180 },
                                { field: 'nombre',   displayName: 'Nombre' },
                                { field: 'apellido', displayName: 'Apellido' },
                                { field: 'cuit', displayName: 'cuit' },
                                { field: 'cargo', displayName: 'Cargo' },
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

               //#region Watches

               $scope.$watchCollection('filter', function (newValue) {
                   $scope.personalTecnicoListFiltered = [];

                   $scope.personalTecnicoList.forEach(function (item) {                       

                       if (newValue.value && (!item.nick      || (item.nick      && item.nick.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1))
                                          && (!item.nombre    || (item.nombre    && item.nombre.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1))
                                          && (!item.apellido  || (item.apellido  && item.apellido.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1))
                                          && (!item.mail      || (item.mail      && item.mail.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1))
                                          && (!item.documento || (item.documento && item.documento.indexOf(newValue.value)  == -1))
                                          && (!item.cuit      || (item.cuit      && item.cuit.indexOf(newValue.value) == -1)))
                           return;

                       $scope.personalTecnicoListFiltered.push(item);
                   });

               });

               //#endregion

               //#region Init

               personalTecnicoService.getDataListInit().then(function (response) {
                   $scope.personalTecnicoList = response.data.personalTecnicoList;
                   $scope.personalTecnicoListFiltered = angular.copy(response.data.personalTecnicoList);
               }, function () { throw 'Error on getDataListInit'; });

               //#endregion
           }]);