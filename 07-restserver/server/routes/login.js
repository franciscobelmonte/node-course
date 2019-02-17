const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

app.post('/login', (req, res) => {
    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }

        if (!userDB) {
            res.status(400).json({
                error: {
                    message: '(User) or password invalid'
                }
            });
            return;
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            res.status(400).json({
                error: {
                    message: 'User or (password) invalid'
                }
            });
            return;
        }

        let token = jwt.sign({
            user: userDB
        }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES });

        res.json({
            error: false,
            user: userDB,
            token
        });
    });

});

module.exports = app;