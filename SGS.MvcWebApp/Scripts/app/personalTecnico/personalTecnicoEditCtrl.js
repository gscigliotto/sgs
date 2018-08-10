angular.module('sgs.personalTecnico.ctrl.edit', [])
       .controller('editCtrl', [
           '$scope',
           '$routeParams',
           'personalTecnicoService',
           'navigationService',
           'personalTecnicoValidationService',
           function ($scope, $routeParams, personalTecnicoService, navigationService, personalTecnicoValidationService) {
               this.entityInit = {id: 0, nick: null, nombre: null, apellido: null, documento: null, email: null, telefono: null, enabled: true, cuit: null, fechaAltaAfip: null, celular: null, telefonoUrgencia: null, emailAlternativo: null, cargo: null, categoria: null, operador: null, art: null, telefonoAseguradora: null, poliza: null, domicilio: { calle: null, numero: null, dpto: null, piso: null, provinciaId: null, localidadId: null }};                                                          
               $scope.entity = null;
               $scope.provincias = [];
               $scope.localidades = null;
               $scope.cargos = null;
               $scope.categorias = null;
               $scope.operation = null;
               $scope.result = { hasErrors: false, messages: [] };
               
               $scope.list = function () {
                   navigationService.goToList();
               };               
               
               $scope.save = function () {                   

                   if ($scope.entity.id) {

                       personalTecnicoService.updatePersonalTecnico($scope.entity).then(function (response) {

                           if (!response.data.hasErrors)
                               navigationService.goToList();

                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.messages;


                       }, function () { throw 'Error on updatePersonalTecnico'; });
                   } else {
                       personalTecnicoService.createPersonalTecnico($scope.entity).then(function (response) {

                           if (!response.data.hasErrors)
                               navigationService.goToList();

                           $scope.result.hasErrors = true;
                           $scope.result.messages = response.data.messages;

                       }, function () { throw 'Error on createPersonalTecnico'; });
                   }
               };

               //$scope.setLocalidades = function () {
                   

               //};
               
               //#region Watches

               $scope.$watch('entity.domicilio.provinciaId', function (newValue, oldValue) {

                   if ($scope.entity == null || $scope.entity.domicilio == null  ) return;

                   if (oldValue) {
                       $scope.entity.domicilio.localidadId = null;
                   }

                   if (!newValue) {                      
                       $scope.localidades = [];                       
                       return;
                   }

                   $scope.provincias.forEach(function (provincia) {
                       if (provincia.id == newValue) {
                           $scope.localidades = provincia.localidades;
                           return;
                       }
                   });
               });
               
               //#endregion
                             
               
               //#region Init
               
               $scope.getDataEditInit = function (entity) {
                   personalTecnicoService.getDataEditInit().then(function (response) {
                       $scope.provincias = response.data.provincias;
                       $scope.categorias = response.data.categorias;
                       $scope.cargos = response.data.cargos;
                       $scope.entity = entity;
                   }, function () { throw 'Error on getDataEditInit'; });
               };

               if (angular.isUndefined($routeParams.id)) {                   
                   $scope.getDataEditInit(this.entityInit);
                   $scope.operation = 'Alta';
               } else {
                   $scope.operation = 'Edición';
                   
                   personalTecnicoService.getPersonalTecnico($routeParams.id).then(function (response) {                       
                       $scope.getDataEditInit(response.data.personalTecnico);
                   }, function () { throw 'Error on getPersonalTecnico'; });
               }

               personalTecnicoValidationService.setValidator($scope.save);

               //#endregion
           }]);