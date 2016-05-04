(function () {
    'use strict';

    angular
        .module('app')
        .controller('Address.IndexController', Controller);

    function Controller(UserService) {
        var vm = this;

        vm.addresses = null;
        vm.modalFlag = false;
        vm.editAddr = null;
        vm.showEditModal = showEditModal;
        vm.hideEditModal = hideEditModal;
        vm.setDefault = setDefault;
        vm.deleteAddr = deleteAddr;

        initController();

        function initController() {
            UserService.GetAllAddress().then(function (addrResult) {
                vm.addresses = addrResult.delivery_address;
            });

        }

        function showEditModal(addr) {
            vm.editAddr = addr;
            vm.modalFlag = true;
        }

        function hideEditModal() {
            vm.editAddr = null;
            vm.modalFlag = false;
        }

        function setDefault(addr_id) {
            UserService.SetDefaultAddress(addr_id).then(function (result) {
            });
        }

        function deleteAddr(addr_id) {
            UserService.DeleteAddress(addr_id).then(function (result) {

            });
        }
    }

})();