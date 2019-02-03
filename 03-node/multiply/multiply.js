const fs = require('fs');

let createFile = (base) => {
    return new Promise((resolve, reject) => {
        if (!Number(base)) {
            reject('Base is not a number');
            return;
        }

        let data = '';

        for (let index = 1; index <= 10; index++) {
            data += `${base} * ${index} = ${base * index}\n`;
        }

        fs.writeFile(`tables/table-${base}.txt`, data, (err) => {
            if (err) reject(err);
            resolve(`table - ${ base }.txt`);
        });
    });
}

module.exports = {
    createFile
}