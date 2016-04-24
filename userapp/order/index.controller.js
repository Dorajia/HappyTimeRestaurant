(function () {
    'use strict';

    angular
        .module('app')
        .controller('Order.IndexController', Controller);

    function Controller($window, $scope, UserService, OrderService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.orders = null;
        vm.modalFlag = false;
        vm.showModal = showModal;
        vm.hideModal = hideModal;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                OrderService.GetByUsername(vm.user.username).then(function (orders) {
                    vm.orders = orders;
                });
            });

        }

        function showModal() {
            vm.modalFlag = true;
        }

        function hideModal() {
            vm.modalFlag = false;
        }

    }

})();