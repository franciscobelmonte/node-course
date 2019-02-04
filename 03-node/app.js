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
    .command('create', 'Create file with the table of multiplication', {
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

const { createFile, listTable } = require('./multiply/multiply');

let command = argv._[0];

switch (command) {
    case 'list':
        listTable(argv.base, argv.limit);
        break;

    case 'create':
        createFile(argv.base, argv.limit)
            .then(file => console.log(`File was created: ${file}`))
            .catch(error => console.error(error));
        break;

    default:
        console.error('Command unknown')
        break;
}