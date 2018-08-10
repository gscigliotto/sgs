angular.module('sgs.security.usuarios.ctrl.edit', [])
       .controller('editCtrl', [
           '$scope',
           '$routeParams',
           'securityService',
           'navigationService',
           'usuarioValidationService',
           function ($scope, $routeParams, securityService, navigationService, usuarioValidationService) {
               this.entityInit = { id: 0, nick: null, nombre: null, apellido: null, documento: null, email: null, telefono: null, password: null, enabled: true, roles: [] };                             
               $scope.entity = null;
               $scope.roles = null;
               $scope.operation = null;
               $scope.result = { hasErrors: false, messages: [] };
               
               $scope.list = function () {
                   navigationService.goToList();
               };               
               
               $scope.save = function () {
                   if ($scope.entity.id) {

                       securityService.updateUsuario($scope.entity).then(function (response) {

                           if (!response.data.hasErrors)
                               navigationService.goToList();

                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.messages;


                       }, function () { throw 'Error on updateUsuario'; });
                   } else {
                       securityService.createUsuario($scope.entity).then(function (response) {

                           if (!response.data.hasErrors)
                               navigationService.goToList();

                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.messages;

                       }, function () { throw 'Error on createUsuario'; });
                   }
               };
               
               $scope.toggleCheck = function (id) {
                   if ($scope.entity.roles.indexOf(id) === -1) {
                       $scope.entity.roles.push(id);
                   } else {
                       $scope.entity.roles.splice($scope.entity.roles.indexOf(id), 1);
                   }                   
               };
               
               //#region Init
               
               $scope.getDataEditInit = function () {
                   securityService.getDataEditInit().then(function (response) {
                       $scope.roles = response.data.roles;
                   }, function () { throw 'Error on getDataEditInit'; });
               };

               if (angular.isUndefined($routeParams.id)) {
                   $scope.entity = this.entityInit;
                   $scope.getDataEditInit();
                   $scope.operation = 'Alta';
               } else {
                   $scope.operation = 'Edición';
                   securityService.getUsuario($routeParams.id).then(function (response) {
                       $scope.entity = response.data.usuario;
                       $scope.getDataEditInit();
                   }, function () { throw 'Error on getUsuario'; });
               }

               usuarioValidationService.setValidator($scope.save);

               //#endregion
           }]);