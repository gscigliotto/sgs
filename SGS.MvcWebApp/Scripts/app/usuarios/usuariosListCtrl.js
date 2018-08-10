angular.module('sgs.security.usuarios.ctrl.list', [])
    .controller('listCtrl', [
        '$scope',
        '$filter',
        '$routeParams',
        '$location',
        'securityService',
        'navigationService',
        function($scope, $filter, $routeParams, $location, securityService, navigationService) {
            $scope.filter = { value: null };
            $scope.usuarios = [];
            $scope.usuariosfiltered = [];

            $scope.create = function() {
                navigationService.goToCreate();
            };

            $scope.edit = function(id) {
                navigationService.goToEdit(id);
            };

            $scope.cleanFilter = function() {
                $scope.filter.value = null;
            };

            //#region Grid

            $scope.gridOptions = {
                data: 'usuariosfiltered',
                columnDefs: [
                    { field: 'id', displayName: 'Id', width: 40 },
                    { field: 'nick', displayName: 'Nick', width: 100 },
                    { field: 'nombre', displayName: 'Nombre' },
                    { field: 'apellido', displayName: 'Apellido' },
                    { field: 'documento', displayName: 'Documento' },
                    { displayName: 'Acciones', cellTemplate: $("#gridActions").html(), width: 80 }
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
                $scope.usuariosfiltered = [];

                $scope.usuarios.forEach(function(item) {
                    if (newValue.value && (!item.nick      || (item.nick && item.nick.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1))
                                       && (!item.nombre    || (item.nombre && item.nombre.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1))
                                       && (!item.apellido  || (item.apellido && item.apellido.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1))
                                       && (!item.mail      || (item.mail && item.mail.toLowerCase().indexOf(newValue.value.toLowerCase()) == -1))
                                       && (!item.documento || (item.documento && item.documento.indexOf(newValue.value) == -1)))
                        return;
                   
                    $scope.usuariosfiltered.push(item);
                });

            });

            //#endregion

            //#region Init

               securityService.getDataListInit().then(function (response) {
                   $scope.usuarios = response.data.usuarios;
                   $scope.usuariosfiltered = angular.copy(response.data.usuarios);
               }, function () { throw 'Error on getDataListInit'; });
               
               //#endregion
           }]);
