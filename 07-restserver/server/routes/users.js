const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');

const { verifyToken } = require('../middlewares/authentication');

app.get('/users', verifyToken, function(req, res) {
    let from = req.query.from || 0;
    let limit = req.query.limit || 5;

    User.find({ status: true }, 'name email role status google img')
        .skip(Number(from))
        .limit(Number(limit))
        .exec((err, users) => {
            if (err) {
                res.status(400).json({
                    error: err
                });
                return;
            }

            User.countDocuments({ status: true }, (err, count) => {
                res.json({
                    error: false,
                    users,
                    total: count
                });
            });
        });
});

app.post('/users', verifyToken, function(req, res) {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            res.status(400).json({
                error: err
            });
            return;
        }

        res.json({
            error: false,
            user: userDB
        });
    });
});

app.put('/users/:id', verifyToken, function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    let user = User.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, userDB) => {
        if (err) {
            res.status(400).json({
                error: err
            });
            return;
        }

        res.json({
            error: false,
            user: userDB
        });
    });
});

app.delete('/users/:id', verifyToken, function(req, res) {
    let id = req.params.id;

    // User.findByIdAndRemove(id, (err, userDB) => {
    //     if (err) {
    //         res.status(400).json({
    //             error: err
    //         });
    //         return;
    //     }

    //     if (!userDB) {
    //         res.status(400).json({
    //             error: {
    //                 message: 'User not found'
    //             },
    //         });
    //         return;
    //     }

    //     res.json({
    //         error: false,
    //         user: userDB
    //     });
    // });

    let user = User.findByIdAndUpdate(id, { status: false }, { new: true }, (err, userDB) => {
        if (err) {
            res.status(400).json({
                error: err
            });
            return;
        }

        res.json({
            error: false,
            user: userDB
        });
    });
});

module.exports = app;