const path = require('path');
const express = require('express');
const app = express();

const hbs = require('hbs');
require('./hbs/helpers');

app.use(express.static(path.join(path.dirname(__filename), 'public')));

hbs.registerPartials(path.join(path.dirname(__filename), 'views', 'partials'));
app.set('views', path.join(path.dirname(__filename), 'views'));
app.set('view engine', 'hbs');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('home', {
        name: 'fraNCisco BELmonte RuIz'
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
    console.log(`Listening requests in port ${port}.`);
});