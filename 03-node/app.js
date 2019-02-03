const { createFile } = require('./multiply/multiply');

let parameter = process.argv[2];

let base = parameter.split('=')[1];

createFile(base)
    .then(file => console.log(`File was created: ${file}`))
    .catch(error => console.error(error));