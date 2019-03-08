const express = require('express');
const app = express();

const path = require('path');

const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(port, (err) => {
    if (err) throw new Error(err);

    console.log(`Server running in port ${port}`);
});