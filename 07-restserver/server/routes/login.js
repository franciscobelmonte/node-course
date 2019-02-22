const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    console.log(payload.name);
    console.log(payload.email);
    console.log(payload.picture);
}

app.post('/google', (req, res) => {
    let token = req.body.idtoken;

    verify(token);

});


module.exports = app;