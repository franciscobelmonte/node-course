const fs = require('fs');
const colors = require('colors');

let createFile = (base, limit = 10) => {
    return new Promise((resolve, reject) => {
        if (!Number(base)) {
            reject('Base is not a number');
            return;
        }

        let data = '';

        for (let index = 1; index <= limit; index++) {
            data += `${base} * ${index} = ${base * index}\n`;
        }

        fs.writeFile(`tables/table-${base}-to-${limit}.txt`, data, (err) => {
            if (err) reject(err);
            resolve(`table - ${base}-to-${limit}.txt`);
        });
    });
}

let listTable = (base, limit = 10) => {
    console.log('==========================='.green);
    console.log(`Table of multiplication ${base}`.green);
    console.log('==========================='.green);
    for (let index = 1; index <= limit; index++) {
        console.log(`${base} * ${index} = ${base * index}`);
    }
}

module.exports = {
    createFile,
    listTable
}