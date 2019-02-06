const argv = require('./config/yargs').argv;
const tasks = require('./tasks/tasks');

console.log(argv);

let command = argv._[0];

switch (command) {
    case 'create':
        let task = tasks.create(argv.description);
        console.log(task);
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