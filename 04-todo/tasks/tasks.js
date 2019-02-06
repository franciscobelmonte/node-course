const fs = require('fs');

let tasks = [];

const create = (description) => {
    load();

    let task = {
        description,
        completed: false
    };
    tasks.push(task);

    save();

    return task;
}

const update = (description, completed = true) => {
    load();
    for (const task of tasks) {
        if (task.description === description) {
            task.completed = completed;
            save();
            return task;
        }
    }
}

const list = () => {
    load();
    return tasks;
}

const save = () => {
    let json = JSON.stringify(tasks);
    fs.writeFile('db/tasks.json', json, (err) => {
        if (err) throw new Error('Error saving database...');
    })
}

const load = () => {
    try {
        tasks = require('../db/tasks');
    } catch (error) {
        tasks = [];
    }
}

module.exports = {
    create,
    update,
    save,
    list
}