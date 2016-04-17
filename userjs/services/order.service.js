var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var orderDb = db.get('orders');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var service = {};

service.getById = getById;
service.getByUsername = getByUsername;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function getById(_id) {
    var deferred = Q.defer();

    orderDb.findById(_id, function (err, user) {
        if (err) deferred.reject(err);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}


function getByUsername(username) {
    var deferred = Q.defer();

    orderDb.find(
        { "username": username },
        function (err, orders) {
            if (err) deferred.reject(err);

            if (orders) {
                // return orders
                //return orders;
                //deferred.resolve(orders);
                deferred.resolve(_.omit(orders, null));
            } else {
                deferred.resolve();
            }
        });

    return deferred.promise;
}


function create(orderParam) {
    var deferred = Q.defer();

    // validation
    orderDb.findOne(
        { ordernum: orderParam.ordernum },
        function (err, order) {
            if (err) deferred.reject(err);

            if (order) {
                // ordernum already exists
                deferred.reject('Order "' + orderParam.ordernum + '" is already taken');
            } else {
                createOrder();
            }
        });

    function createOrder() {
        // set user object to userParam without the cleartext password
        //var order = _.omit(orderParam, 'password');
        //
        //// add hashed password to user object
        //user.hash = bcrypt.hashSync(userParam.password, 10);

        orderDb.insert(
            orderParam,
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, orderParam) {
    var deferred = Q.defer();

    // validation
    orderDb.findById(_id, function (err, order) {
        if (err) deferred.reject(err);

        if (order.ordernum !== userParam.username) {
            // username has changed so check if the new username is already taken
            orderDb.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            username: orderParam.username,
            orderdate: orderParam.orderdate,
            ordernum: orderParam.ordernum,
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        orderDb.findAndModify(
            { _id: _id },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    orderDb.remove(
        { _id: _id },
        function (err) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });

    return deferred.promise;
}