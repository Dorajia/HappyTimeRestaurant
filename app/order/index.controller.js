(function () {
    'use strict';

    angular
        .module('app')
        .controller('Order.IndexController', Controller);

    function Controller(OrderService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.orders = null;
        vm.modalFlag = false;
        vm.currentDate = null;
        vm.confirmOrderData = null;
        vm.commentOrderData = null;
        vm.showModal = showModal;
        vm.hideModal = hideModal;
        vm.confirmOrder = confirmOrder;
        vm.submitComment = submitComment;


        initController();

        function initController() {
            OrderService.GetAll().then(function (orderResult) {
                vm.orders = orderResult.data;
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

        function confirmOrder(order_id) {
            OrderService.ConfirmOrder(order_id).then(function (orderResult) {
                vm.orders = orderResult.data;
            });
        }

        function submitComment(order_id, dish_id, comment) {
            OrderService.SubmitComment(order_id, dish_id, comment).then(function (result) {
                if (result.sucess == true) {
                    //return FlashService.Success("Comment post successfully!");
                    $dialogs.notify('Something Happened!','Comment post successfully!');
                }
                else {
                    return FlashService.Error("Comment post failed!");
                }
            });
        }

    }

})();