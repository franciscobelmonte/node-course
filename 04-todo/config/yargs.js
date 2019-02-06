module.exports.argv = require('yargs')
    .command('create', 'Create new task to do', {
        description: {
            demand: true,
            alias: 'd',
            desc: 'Description of task to do'
        }
    })
    .command('update', 'Completed task', {
        description: {
            demand: true,
            alias: 'd',
            desc: 'Description of task to do'
        },
        completed: {
            default: true,
            alias: 'c',
            desc: 'Check the task completed',
            type: 'boolean'
        }
    })
    .command('list', 'List tasks')
    .help()
    .argv;