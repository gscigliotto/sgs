angular.module('contabilidad.empresas.ctrl.list', ['contabilidad.service.empresas', 'contabilidad.directive.loading'])
       .controller('listCtrl', [
           '$scope',           
           'empresasService',           
           function ($scope, empresasService) {
               $scope.empresas = [];
               $scope.empresaId = null;               
               
               //#region Init
               
               empresasService.getDataListEmpresas().then(function (response) {
                   $scope.empresas = response.data.empresas;
               }, function () { throw 'Error on getDataListEmpresas'; });
               
               //#endregion              
           }]);