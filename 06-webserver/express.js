const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    let json = {
        name: 'Francisco',
        age: 31,
        url: req.url,
    }
    res.send(json);
});

app.get('/hello', (req, res) => {
    res.send('Hello world!');
});

app.listen(3000, () => {
    console.log('Listening requests in port 3000.');
});