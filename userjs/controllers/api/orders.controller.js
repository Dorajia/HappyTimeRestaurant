var config = require('config.json');
var express = require('express');
var router = express.Router();
var orderService = require('services/order.service');

// routes
//router.post('/placeorder', placeOrder);
//router.put('/:_id', updateOrder);
//router.delete('/:_id', deleteOrder);
router.get('/:username', getByUsername);

module.exports = router;

function getByUsername(req, res) {
    orderService.getByUsername(req.params.username)
        .then(function (orders) {
            res.status(200).send(orders);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function placeOrder(req, res) {
    orderService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function updateOrder(req, res) {
    //var userId = req.user.sub;
    //if (req.params._id !== userId) {
    //    // can only update own account
    //    return res.status(401).send('You can only update your own account');
    //}
    //orderService.update(userId, req.body)

    var ordernum = req.params.ordernum;
    orderService.update(ordernum, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteOrder(req, res) {
    //var userId = req.user.sub;
    //if (req.params._id !== userId) {
    //    // can only delete own account
    //    return res.status(401).send('You can only delete your own account');
    //}
    //
    //orderService.delete(userId)
    var ordernum = req.params.ordernum;
    orderService.delete(ordernum)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}