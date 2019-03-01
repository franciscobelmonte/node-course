const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const app = express();

const User = require('../models/user');
const Product = require('../models/product');

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

        if (type == 'users') {
            uploadImageToUser(id, filename, res);
        }

        if (type == 'products') {
            uploadImageToProduct(id, filename, res);
        }
    })

});

function uploadImageToUser(id, filename, res) {
    User.findById(id, (error, userDB) => {
        if (error) {
            deleteOldFile(filename, 'users');
            res.status(500).json({
                error
            });
            return;
        }

        if (!userDB) {
            deleteOldFile(filename, 'users');
            res.status(400).json({
                error: {
                    message: 'User not found'
                }
            });
            return;
        }

        if (userDB.img) {
            deleteOldFile(userDB.img, 'users');
        }

        userDB.img = filename;

        userDB.save((error, userSavedDB) => {
            res.json({
                error: false,
                user: userSavedDB,
                img: filename
            });
        })
    });
}

function uploadImageToProduct(id, filename, res) {
    Product.findById(id, (error, productDB) => {
        if (error) {
            deleteOldFile(filename, 'products');
            res.status(500).json({
                error
            });
            return;
        }

        if (!productDB) {
            deleteOldFile(filename, 'products');
            res.status(400).json({
                error: {
                    message: 'Product not found'
                }
            });
            return;
        }

        if (productDB.img) {
            deleteOldFile(productDB.img, 'products');
        }

        productDB.img = filename;

        productDB.save((error, productSavedDB) => {
            res.json({
                error: false,
                product: productSavedDB,
                img: filename
            });
        })
    });
}

function deleteOldFile(filename, type) {
    let oldFile = path.resolve(__dirname, '../../uploads/', type, filename);

    if (fs.existsSync(oldFile)) {
        fs.unlinkSync(oldFile);
    }
}

module.exports = app;