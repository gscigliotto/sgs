angular.module('sgs.venues.ctrl.list', [])
       .controller('listCtrl', [
           '$scope',
           '$filter',
           '$routeParams',
           '$location',
           'venuesService',
           'navigationService',                      
           function ($scope, $filter, $routeParams, $location, venuesService, navigationService) {
               $scope.filter = { value: null };
               $scope.venues = [];
               $scope.venuesFiltered = [];
               
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
                   data: 'venuesFiltered',
                   columnDefs: [{ field: 'id',       displayName: 'Id',       width: 50 },
                                { field: 'denominacion',     displayName: 'Denominación' },
                                { field: 'tipoEstablecimiento', displayName: 'Tipo establecimiento' },
                                { field: 'contactoReferencia', displayName: 'Contacto referencia' },
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
                   $scope.venuesFiltered = [];

                   $scope.venues.forEach(function (item) {
                       if (newValue.value && (!item.denominacion              || (item.denominacion       && item.denominacion.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1))
                                                 && (!item.direccionPrincipal || (item.direccionPrincipal && item.direccionPrincipal.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1))
                                                 && (!item.contactoReferencia || (item.contactoReferencia && item.contactoReferencia.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1)))
                           return;
                                      
                       $scope.venuesFiltered.push(item);
                   });

               });

               //#endregion

               //#region Init

               venuesService.getDataListInit().then(function (response) {
                   $scope.venues = response.data.venues;
                   $scope.venuesFiltered = angular.copy(response.data.venues);
               }, function () { throw 'Error on getDataListInit'; });

               //#endregion
           }]);