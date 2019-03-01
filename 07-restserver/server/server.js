require('./config/config');

const path = require('path');
const mongoose = require('mongoose');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 1000000
}));

app.use(require('./routes/index'));

app.use(express.static(path.resolve(__dirname, '../public')));


mongoose.connect('mongodb://localhost:27017/coffee', (err, res) => {
    if (err) throw err;
    console.log('Database running...');
});

app.listen(process.env.PORT, () => {
    console.log('Listening in port', process.env.PORT);
});