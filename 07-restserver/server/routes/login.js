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

    return {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        google: true
    };
}

app.post('/google', async(req, res) => {
    let token = req.body.idtoken;

    let googleUser = await verify(token).catch(error => {
        return res.status(403).json({
            error: error
        });
    });

    User.findOne({ email: googleUser.email }, (err, userDB) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }

        if (userDB) {
            if (!userDB.google) {
                return res.status(400).json({
                    error: {
                        message: 'You must to login via user/password authentication'
                    }
                });
            }

            let token = jwt.sign({
                user: userDB
            }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES });

            return res.json({
                user: userDB,
                token
            });
        }

        let user = new User();
        user.name = googleUser.name;
        user.email = googleUser.email;
        user.img = googleUser.picture;
        user.google = true;
        user.password = ':)';

        user.save((err, userDB) => {
            if (err) {
                res.status(500).json({
                    error: err
                });
                return;
            }

            let token = jwt.sign({
                user: userDB
            }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES });

            return res.json({
                user: userDB,
                token
            });
        });
    });


});

module.exports = app;