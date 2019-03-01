const express = require('express');
const app = express();

let { verifyToken, verifyAdminRole } = require('../middlewares/authentication');

let Category = require('../models/category');

app.get('/categories', verifyToken, (req, res) => {
    Category.find({})
        .sort('description')
        .populate('user', 'name email')
        .exec((error, categories) => {
            if (error) {
                return res.status(500).json({
                    error
                });
            }

            res.json({
                error: false,
                categories: categories
            });
        });
});

app.get('/categories/:id', verifyToken, (req, res) => {
    let id = req.params.id;

    Category.findById(id, (error, categoryDB) => {
        if (error) {
            return res.status(500).json({
                error
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                error
            });
        }

        res.json({
            error: false,
            category: categoryDB
        });
    });
});

app.post('/categories', verifyToken, (req, res) => {
    let body = req.body;

    let category = new Category({
        description: body.description,
        user: req.user._id
    });

    category.save((error, categoryDB) => {
        if (error) {
            return res.status(500).json({
                error
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                error
            });
        }

        res.json({
            error: false,
            category: categoryDB
        });
    });
});

app.put('/categories/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Category.findByIdAndUpdate(id, { description: body.description }, { new: true, runValidators: true }, (error, categoryDB) => {
        if (error) {
            return res.status(500).json({
                error
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                error
            });
        }

        res.json({
            error: false,
            category: categoryDB
        });
    });
});

app.delete('/categories/:id', [verifyToken, verifyAdminRole], (req, res) => {
    let id = req.params.id;

    Category.findByIdAndRemove(id, (error, categoryDB) => {
        if (error) {
            return res.status(500).json({
                error
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                error
            });
        }

        res.json({
            error: false,
            category: categoryDB,
            message: 'Category deleted'
        });
    });
});

module.exports = app;