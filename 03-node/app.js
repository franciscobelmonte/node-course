const argv = require('./config/yargs').argv;

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