const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

const User = require('../models/user');

app.get('/users', function(req, res) {
    res.json('get Users');
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
    let body = req.body;

    let user = User.findByIdAndUpdate(id, body, { new: true }, (err, userDB) => {

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