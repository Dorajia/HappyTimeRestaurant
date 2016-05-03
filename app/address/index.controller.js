(function () {
    'use strict';

    angular
        .module('app')
        .controller('Address.IndexController', Controller);

    function Controller($window, $scope, UserService, OrderService, FlashService) {
        var vm = this;

        vm.addresses = null;
        vm.modalFlag = false;
        vm.currentDate = null;
        vm.showModal = showModal;
        vm.hideModal = hideModal;
        vm.confirmOrder = confirmOrder;


        initController();

        function initController() {
            UserService.GetAllAddress().then(function (addrResult) {
                vm.addresses = addrResult.delivery_address;
            });

        }

        function showModal(order) {
            vm.commentOrderData = order;
            vm.modalFlag = true;
        }

        function hideModal() {
            vm.commentOrderData = null;
            vm.modalFlag = false;
        }

        function setDefault(addr_id) {
            UserService.SetDefaultAddr(addr_id).then(function (result) {
                vm.confirmOrderData = result.data;
            });
        }
    }

})();