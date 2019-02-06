const colors = require('colors');
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
        let tasksToDo = tasks.list();
        for (const task of tasksToDo) {
            console.log('======Tasks======'.green);
            console.log(task.description);
            console.log('Completed: ', task.completed);
            console.log('================='.green);
        }
        break;

    case 'update':
        let taskToUpdate = tasks.update(argv.description, argv.completed);
        console.log(taskToUpdate);
        break;

    default:
        console.error('Command unknown');
        return;
        break;
}