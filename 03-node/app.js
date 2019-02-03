const { createFile } = require('./multiply/multiply');

let base = 5;

createFile(base)
    .then(file => console.log(`File was created: ${file}`))
    .catch(error => console.error(error));