const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload({}));

app.put('/upload', (req, res) => {

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

    file.mv(`uploads/${file.name}`, (error) => {
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