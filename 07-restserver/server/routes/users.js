const express = require('express');
const app = express();

app.get('/users', function(req, res) {
    res.json('get Users');
});

app.post('/users', function(req, res) {
    let body = req.body;

    if (body.name === undefined) {
        res.status(400).json({
            error: true,
            message: 'Name is required'
        });
        return;
    }

    res.json({
        user: body
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