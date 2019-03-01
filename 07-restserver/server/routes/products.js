const express = require('express');
const app = express();

let { verifyToken } = require('../middlewares/authentication');

let Product = require('../models/product');

app.get('/products', verifyToken, (req, res) => {
    let from = req.query.from || 0;
    let to = Number(req.query.to || 0);

    Product.find({ available: true })
        .skip(from)
        .limit(5)
        .populate('user', 'name email')
        .populate('category', 'description')
        .sort('description')
        .exec((error, products) => {
            if (error) {
                return res.status(500).json({
                    error
                });
            }

            res.json({
                error: false,
                products
            });
        });
});

app.get('/products/:id', verifyToken, (req, res) => {
    let id = req.params.id;

    Product.findById(id)
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((error, productDB) => {
            if (error) {
                return res.status(500).json({
                    error
                });
            }

            if (!productDB) {
                return res.status(400).json({
                    error
                });
            }

            res.json({
                error: false,
                product: productDB
            });
        });
});

app.get('/products/search/:term', verifyToken, (req, res) => {

    let term = req.params.term;

    let regex = new RegExp(term, 'i');

    Product.find({ name: regex })
        .populate('category', 'name description')
        .exec((error, products) => {
            if (error) {
                return res.status(500).json({
                    error
                });
            }

            res.json({
                error: false,
                products
            });
        });
});

app.post('/products', verifyToken, (req, res) => {
    let body = req.body;

    let product = new Product({
        name: body.name,
        unitPrice: body.unitPrice,
        description: body.description,
        available: body.available,
        category: body.category,
        user: req.user._id
    });

    product.save((error, productDB) => {
        if (error) {
            return res.status(500).json({
                error
            });
        }

        res.status(201).json({
            error: false,
            product: productDB
        });
    });
});

app.put('/products/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Product.findById(id, (error, productDB) => {
        if (error) {
            return res.status(500).json({
                error
            });
        }

        if (!productDB) {
            return res.status(400).json({
                error
            });
        }

        productDB.name = body.name;
        productDB.unitPrice = body.unitPrice;
        productDB.description = body.description;
        productDB.available = body.available;
        productDB.category = body.category;

        productDB.save((error, productSavedDB) => {
            if (error) {
                return res.status(500).json({
                    error
                });
            }

            res.json({
                error: false,
                product: productSavedDB
            });
        });

    });
});

app.delete('/products/:id', verifyToken, (req, res) => {
    let id = req.params.id;

    Product.findById(id, (error, productDB) => {
        if (error) {
            return res.status(500).json({
                error
            });
        }

        if (!productDB) {
            return res.status(400).json({
                error
            });
        }

        productDB.available = false;
        productDB.save((error, productSavedDB) => {
            if (error) {
                return res.status(500).json({
                    error
                });
            }

            res.json({
                error: false,
                product: productSavedDB,
                message: 'Product deleted'
            });
        });
    });
});

module.exports = app;