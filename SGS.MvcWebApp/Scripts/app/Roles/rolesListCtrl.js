angular.module('sgs.security.roles.ctrl.list', [])
       .controller('listCtrl', [
           '$scope',          
           'securityService',                  
           function ($scope,  securityService) {               
               $scope.roles = [];                                                                  
               
               //#region Grid
               
               $scope.gridOptions = {                  
                   data: 'roles',
                   columnDefs: [{ field: 'id',          displayName: 'Id',        width: 50 },
                                { field: 'nombre',      displayName: 'Nombre' },
                                { field: 'descripcion', displayName: 'Descripción', width: 180 }
                   ],
                   showFooter: true,
                   enablePaging: false
               };                                         
               
               //#endregion
                                            
               //#region Init
            
               securityService.getRoles().then(function (response) {
                   $scope.roles = response.data.roles;                                                                           
               }, function () { throw 'Error on getRoles'; });
               
               //#endregion

           }]);