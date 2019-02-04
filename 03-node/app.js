const argv = require('yargs')
    .command('list', 'Print in console the table of multiplication', {
        base: {
            demand: true,
            alias: 'b'
        },
        limit: {
            alias: 'l',
            default: 10
        }
    })
    .help()
    .argv;

const { createFile } = require('./multiply/multiply');

let base = argv.base;
let limit = argv.limit;

console.log(base, limit);

createFile(base)
    .then(file => console.log(`File was created: ${file}`))
    .catch(error => console.error(error));