const fs = require('fs');

let tasks = [];

const create = (description) => {
    let task = {
        description,
        completed: false
    };
    tasks.push(task);
    save();
    return task;
}

const save = () => {
    let json = JSON.stringify(tasks);
    fs.writeFile('db/tasks.json', json, (err) => {
        if (err) throw new Error('Error saving database...');
    })
}

module.exports = {
    create,
    save
}