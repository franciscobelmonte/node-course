const express = require('express');
const app = express();

app.use(require('./login'));
app.use(require('./users'));
app.use(require('./categories'));

module.exports = app;