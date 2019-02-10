let parameters = {
    description: {
        demand: true,
        alias: 'd',
        desc: 'Description of task'
    },
    completed: {
        default: true,
        alias: 'c',
        desc: 'Check the task completed',
        type: 'boolean'
    }
}

module.exports.argv = require('yargs')
    .command('create', 'Create new task to do', {
        description: parameters.description
    })
    .command('delete', 'Dekete task', {
        description: parameters.description
    })
    .command('update', 'Completed task', {
        description: parameters.description,
        completed: parameters.completed
    })
    .command('list', 'List tasks', {
        completed: parameters.completed
    })
    .help()
    .argv;