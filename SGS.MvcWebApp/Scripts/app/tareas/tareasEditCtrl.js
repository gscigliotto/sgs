angular.module('sgs.tareas.ctrl.edit', [])
       .controller('editCtrl', [
           '$scope',
           '$routeParams',
           'tareasService',
           'navigationService',
           'tareasValidationService',
           function ($scope, $routeParams, tareasService, navigationService, tareasValidationService) {
               this.entityInit = { id: 0, titulo: null, prioridad: null, descripcion: null, usuarioId: null, usuarioSolicitanteId: null, estadoTarea: 'Pendiente', fechaVencimiento: null};                               
               $scope.entity = null;
               $scope.operation = null;
               $scope.prioridades = [];
               $scope.estadosTarea = [];
               $scope.usuarios = [];
               $scope.result = { hasErrors: false, messages: [] };
               
               $scope.list = function () {
                   navigationService.goToList();
               };               
               
               $scope.save = function () {                   

                   if ($scope.entity.id) {

                       tareasService.updateTarea($scope.entity).then(function (response) {

                           if (!response.data.hasErrors)
                               navigationService.goToList();

                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.messages;


                       }, function () { throw 'Error on updateTarea'; });
                   } else {
                       tareasService.createTarea($scope.entity).then(function (response) {

                           if (!response.data.hasErrors)
                               navigationService.goToList();

                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.messages;

                       }, function () { throw 'Error on createTarea'; });
                   }
               };              
                                                                        
               //#region Init
               
               $scope.getDataEditInit = function (entity) {
                   tareasService.getDataEditInit().then(function (response) {                       
                       $scope.prioridades = response.data.prioridades;
                       $scope.estadosTarea = response.data.estadosTarea;
                       $scope.usuarios = response.data.usuarios;

                       $scope.entity = entity;
                   }, function () { throw 'Error on getDataEditInit'; });
               };

               if (angular.isUndefined($routeParams.id)) {                   
                   $scope.getDataEditInit(this.entityInit);
                   $scope.operation = 'Alta';
               } else {
                   $scope.operation = 'Edición';
                   
                   tareasService.getTarea($routeParams.id).then(function (response) {
                       $scope.getDataEditInit(response.data.tarea);
                   }, function () { throw 'Error on getTarea'; });
               }

               tareasValidationService.setValidator($scope.save);

               //#endregion
           }]);
