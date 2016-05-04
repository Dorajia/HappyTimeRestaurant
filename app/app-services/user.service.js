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
        //var apiServer = 'https://team6lbt-1160515858.us-west-2.elb.amazonaws.com';
        var apiServer = 'https://ec2-52-11-87-42.us-west-2.compute.amazonaws.com';

        service.GetCurrent = GetCurrent;
        service.UpdatePwd = UpdatePwd;
        service.GetAllAddress = GetAllAddress;
        service.AddAddress = AddAddress;
        service.EditAddress = EditAddress;
        service.DeleteAddress = DeleteAddress;
        service.GetDefaultAddress = GetDefaultAddress;
        service.SetDefaultAddress = SetDefaultAddress;

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetCurrent() {
            return $http.get(apiServer + '/user/userprofile')
                .then(handleSuccess, handleError);
        }

        function UpdatePwd(old_password, new_password) {
            return $http.post(
                    apiServer + '/user/updatepassword/'
                    + old_password + '/' + new_password)
                .then(handleSuccess, handleError);
        }

        function GetAllAddress() {
            return $http.get(apiServer + '/delivery/getaddress/')
                .then(handleSuccess, handleError);
        }

        function AddAddress(addr) {
            return $http.post(apiServer + '/delivery/addaddress/', addr)
                .then(handleSuccess, handleError);
        }

        function EditAddress(addr_id, addr) {
            return $http.post(apiServer + '/delivery/editaddress/' + addr_id, addr)
                .then(handleSuccess, handleError);
        }

        function DeleteAddress(addr_id) {
            return $http.post(apiServer + '/delivery/removeaddress/' + addr_id)
                .then(handleSuccess, handleError);
        }

        function GetDefaultAddress() {
            return $http.get(apiServer + '/delivery/getdefault')
                .then(handleSuccess, handleError);
        }

        function SetDefaultAddress(addr_id) {
            return $http.post(apiServer + '/delivery/setdefault/' + addr_id)
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
