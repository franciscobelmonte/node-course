require('./config/config');

const path = require('path');
const mongoose = require('mongoose');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes/index'));

mongoose.connect('mongodb://localhost:27017/coffee', (err, res) => {
    if (err) throw err;
    console.log('Database running...');
});

app.listen(process.env.PORT, () => {
    console.log('Listening in port', process.env.PORT);
});