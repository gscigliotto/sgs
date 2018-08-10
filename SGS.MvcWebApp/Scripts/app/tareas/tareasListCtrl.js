angular.module('sgs.tareas.ctrl.list', [])
       .controller('listCtrl', [
           '$scope',
           '$filter',
           '$routeParams',
           '$location',
           'tareasService',
           'navigationService',                      
           function ($scope, $filter, $routeParams, $location, tareasService, navigationService) {
               $scope.filter = { value: null };
               $scope.tareas = [];
               $scope.tareasFiltered = [];
               
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
                   data: 'tareasFiltered',
                   columnDefs: [{ field: 'id', displayName: 'Id', width: 30 },
                                { field: 'titulo', displayName: 'Título' },
                                { field: 'prioridad', displayName: 'Prioridad' },
                                { field: 'usuarioNick', displayName: 'Usuario asignado' },
                                { field: 'estadoTarea', displayName: 'Estado' },
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
                   $scope.tareasFiltered = [];

                   $scope.tareas.forEach(function (item) {
                       if (newValue.value && (!item.titulo || (item.titulo && item.titulo.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1))
                                                 && (!item.prioridad || (item.prioridad && item.prioridad.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1))
                                                 && (!item.usuarioNick || (item.usuarioNick && item.usuarioNick.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1))
                                                 && (!item.estadoTarea || (item.estadoTarea && item.estadoTarea.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1)))
                           return;
                                      
                       $scope.tareasFiltered.push(item);
                   });

               });

               //#endregion

               //#region Init

               tareasService.getDataListInit().then(function (response) {
                   $scope.tareas = response.data.tareas;
                   $scope.tareasFiltered = angular.copy(response.data.tareas);
               }, function () { throw 'Error on getDataListInit'; });

               //#endregion

           }]);