const options = {
    base: {
        demand: true,
        alias: 'b'
    },
    limit: {
        alias: 'l',
        default: 10
    }
};

module.exports.argv = require('yargs')
    .command('list', 'Print in console the table of multiplication', options)
    .command('create', 'Create file with the table of multiplication', options)
    .help()
    .argv;