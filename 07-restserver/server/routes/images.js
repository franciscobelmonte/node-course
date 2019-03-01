const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

let { verifyToken } = require('../middlewares/authentication');

app.get('/images/:type/:img', verifyToken, (req, res) => {
    let type = req.params.type;
    let img = req.params.img;

    let pathImage = path.resolve(__dirname, `../../uploads/${type}/${img}`);

    if (fs.existsSync(pathImage)) {
        return res.sendFile(pathImage);
    }

    let pathNoImage = path.resolve(__dirname, '../assets/no-image.jpg');

    return res.sendFile(pathNoImage);
});

module.exports = app;