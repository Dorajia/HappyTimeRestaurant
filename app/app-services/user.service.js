(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', Service);

    angular.module('app').config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ]);

    function Service($http, $q, $window) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.UpdatePwd = UpdatePwd;
        service.GetAllAddress = GetAllAddress;
        service.AddAddress = AddAddress;
        service.EditAddress = EditAddress;
        service.DeleteAddress = DeleteAddress;
        service.SetDefaultAddress = SetDefaultAddress;

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetCurrent() {
            return $http.get('http://ec2-52-11-87-42.us-west-2.compute.amazonaws.com/user/userprofile')
                .then(handleSuccess, handleError);
        }

        function UpdatePwd(old_password, new_password) {
            return $http.post(
                    'http://ec2-52-11-87-42.us-west-2.compute.amazonaws.com/user/updatepassword/'
                    + old_password + '/' + new_password)
                .then(handleSuccess, handleError);
        }

        function GetAllAddress() {
            return $http.post('http://ec2-52-11-87-42.us-west-2.compute.amazonaws.com/user/getaddress/')
                .then(handleSuccess, handleError);
        }

        function AddAddress() {
            return $http.post('http://ec2-52-11-87-42.us-west-2.compute.amazonaws.com/user/addaddress/')
                .then(handleSuccess, handleError);
        }

        function EditAddress(addr_id) {
            return $http.post('http://ec2-52-11-87-42.us-west-2.compute.amazonaws.com/user/editaddress/' + addr_id)
                .then(handleSuccess, handleError);
        }

        function DeleteAddress(addr_id) {
            return $http.post('http://ec2-52-11-87-42.us-west-2.compute.amazonaws.com/user/removeaddress/' + addr_id)
                .then(handleSuccess, handleError);
        }

        function SetDefaultAddress(addr_id) {
            return $http.post('http://ec2-52-11-87-42.us-west-2.compute.amazonaws.com/user/removeaddress/' + addr_id)
                .then(handleSuccess, handleError);
        }


        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/users/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError);
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/api/users/' + user._id, user).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
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
