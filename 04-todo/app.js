const argv = require('./config/yargs').argv;

console.log(argv);

let command = argv._[0];

switch (command) {
    case 'create':

        break;

    case 'list':

        break;

    case 'update':

        break;

    default:
        console.error('Command unknown');
        return;
        break;
}