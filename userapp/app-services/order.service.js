(function () {
    'use strict';

    angular
        .module('app')
        .factory('OrderService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/orders').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/orders/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(username) {
            return $http.get('/api/orders/' + username).then(handleSuccess, handleError);
        }

        function Create(user) {
            return $http.post('/api/orders', user).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/api/orders/' + user._id, user).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/orders/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
