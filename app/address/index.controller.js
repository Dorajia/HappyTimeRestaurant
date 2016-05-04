(function () {
    'use strict';

    angular
        .module('app')
        .controller('Address.IndexController', Controller);

    function Controller(UserService, FlashService) {
        var vm = this;

        vm.addresses = null;
        vm.defaultAddrId = null;

        vm.newModalFlag = false;
        vm.newAddrObj = null;

        vm.editModalFlag = false;
        vm.editAddrObj = null;

        vm.showNewModal = showNewModal;
        vm.hideNewModal = hideNewModal;
        vm.showEditModal = showEditModal;
        vm.hideEditModal = hideEditModal;

        vm.setDefault = setDefault;
        vm.addAddr = addAddr;
        vm.editAddr = editAddr;
        vm.deleteAddr = deleteAddr;

        initController();

        function initController() {
            UserService.GetAllAddress().then(function (addrResult) {
                vm.addresses = addrResult.delivery_address;
            });
            UserService.GetDefaultAddress().then(function (result) {
               vm.defaultAddrId = result.delivery_address[0]._id;
            });
        }

        function showNewModal() {
            vm.newModalFlag = true;
        }

        function hideNewModal() {
            vm.newAddrObj = null;
            vm.newModalFlag = false;
        }

        function showEditModal(addr) {
            vm.editAddrObj = addr;
            vm.editModalFlag = true;
        }

        function hideEditModal() {
            vm.editAddrObj = null;
            vm.editModalFlag = false;
        }

        function setDefault(addr_id) {
            UserService.SetDefaultAddress(addr_id).then(function (result) {
                if (result.sucess) {
                    vm.defaultAddrId = addr_id;
                    UserService.GetAllAddress().then(function (addrResult) {
                        vm.addresses = addrResult.delivery_address;
                    });
                    FlashService.Success('Add Address successfully!');
                }
                else {
                    FlashService.Error('Add Address failed!');
                }
            });
        }

        function addAddr() {
            if (vm.defaultAddrId == null) {
                vm.newAddrObj.isdefault = true;
            }
            else {
                vm.newAddrObj.isdefault = false;
            }

            UserService.AddAddress(vm.newAddrObj).then(function (result) {
                if (result.sucess) {
                    vm.addresses = result.delivery_address;
                    FlashService.Success('Add Address successfully!');
                }
                else {
                    FlashService.Error('Add Address failed!');
                }
                hideNewModal();
            });
        }

        function editAddr() {
            UserService.EditAddress(vm.editAddrObj._id, vm.editAddrObj).then(function (result) {
                if (result.sucess) {
                    FlashService.Success('Update Address successfully!');
                }
                else {
                    FlashService.Error('Update Address failed!');
                }
                hideEditModal();

            });
        }

        function deleteAddr(addr_id) {
            UserService.DeleteAddress(addr_id).then(function (result) {
                if (result.sucess) {
                    vm.addresses = result.delivery_address;
                    FlashService.Success('Delete Address successfully!');
                }
                else {
                    FlashService.Error('Delete Address failed!');
                }

            });
        }

    }

})();