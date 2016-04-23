(function () {
    'use strict';

    angular
        .module('app')
        .controller('Order.IndexController', Controller);

    function Controller($window, $scope, UserService, OrderService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.orders = null;
        //vm.showComment = showComment;
        //vm.showModal = false;
        //vm.toggleModal = toggleModal;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                OrderService.GetByUsername(vm.user.username).then(function (orders) {
                    vm.orders = orders;
                });
            });

            // Modal
            //$scope.showModal = false;
            //$scope.toggleModal = function(){
            //    $scope.showModal = !$scope.showModal;
            //};
        }

        //function toggleModal() {
        //    vm.showModal = !vm.showModal;
        //}
        //
        //function showComment() {
        //    //UserService.Update(vm.user)
        //    //    .then(function () {
        //    //        FlashService.Success('User updated');
        //    //    })
        //    //    .catch(function (error) {
        //    //        FlashService.Error(error);
        //    //    });
        //    $('#orderModel').modal('show');
        //
        //}

    }

    //var mymodal = angular.module('mymodal', []);
    //
    //mymodal.controller('MainCtrl', function ($scope) {
    //    $scope.showModal = false;
    //    $scope.toggleModal = function(){
    //        $scope.showModal = !$scope.showModal;
    //    };
    //});
    //
    //mymodal.directive('modal', function () {
    //    return {
    //        template: '<div class="modal fade">' +
    //        '<div class="modal-dialog">' +
    //        '<div class="modal-content">' +
    //        '<div class="modal-header">' +
    //        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
    //        '<h4 class="modal-title">{{ title }}</h4>' +
    //        '</div>' +
    //        '<div class="modal-body" ng-transclude></div>' +
    //        '</div>' +
    //        '</div>' +
    //        '</div>',
    //        restrict: 'E',
    //        transclude: true,
    //        replace:true,
    //        scope:true,
    //        link: function postLink(scope, element, attrs) {
    //            scope.title = attrs.title;
    //
    //            scope.$watch(attrs.visible, function(value){
    //                if(value == true)
    //                    $(element).modal('show');
    //                else
    //                    $(element).modal('hide');
    //            });
    //
    //            $(element).on('shown.bs.modal', function(){
    //                scope.$apply(function(){
    //                    scope.$parent[attrs.visible] = true;
    //                });
    //            });
    //
    //            $(element).on('hidden.bs.modal', function(){
    //                scope.$apply(function(){
    //                    scope.$parent[attrs.visible] = false;
    //                });
    //            });
    //        }
    //    };
    //});

})();