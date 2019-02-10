const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home', {
        name: 'Francisco Belmonte Ruiz',
        year: new Date().getFullYear()
    });
});

app.listen(3000, () => {
    console.log('Listening requests in port 3000.');
});