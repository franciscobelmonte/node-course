const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');

app.get('/users', function(req, res) {
    let from = req.query.from || 0;
    let limit = req.query.limit || 5;

    User.find({}, 'name email role status google img')
        .skip(Number(from))
        .limit(Number(limit))
        .exec((err, users) => {
            if (err) {
                res.status(400).json({
                    error: err
                });
                return;
            }

            User.countDocuments({}, (err, count) => {
                res.json({
                    users,
                    total: count
                });
            })
        });
});

app.post('/users', function(req, res) {
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

app.put('/users/:id', function(req, res) {
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

app.delete('/users', function(req, res) {
    res.json('delete Users');
});

module.exports = app;