const express = require('express');
const app = express();

const User = require('../models/user');

app.get('/users', function(req, res) {
    res.json('get Users');
});

app.post('/users', function(req, res) {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role
    });

    user.save((err, db) => {
        if (err) {
            res.status(400).json({
                error: err
            });
            return;
        }

        res.json({
            error: false,
            user: db
        });
    });
});

app.put('/users/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/users', function(req, res) {
    res.json('delete Users');
});

module.exports = app;