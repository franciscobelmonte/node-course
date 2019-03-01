const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

const User = require('../models/user');

app.use(fileUpload({}));

app.put('/upload/:type/:id', (req, res) => {

    let type = req.params.type;
    let id = req.params.id;

    let validTypes = ['products', 'users'];

    if (!validTypes.includes(type)) {
        res.status(400).json({
            error: {
                message: `${type} is not valid`
            }
        });
        return;
    }

    if (!req.files) {
        res.status(400).json({
            error: {
                message: 'Not files available'
            }
        });
    }

    let file = req.files.file;

    let validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    let extension = file.name.split('.').pop();

    if (!validExtensions.includes(extension)) {
        res.status(400).json({
            error: {
                message: `${extension} is not valid`
            }
        });
        return;
    }

    let filename = `${id}-${new Date().getMilliseconds()}.${extension}`;

    file.mv(`uploads/${type}/${filename}`, (error) => {
        if (error) {
            res.status(500).json({
                error
            });
            return;
        }

        res.json({
            error: false,
            message: 'File upload successfully.'
        })
    })

});

module.exports = app;