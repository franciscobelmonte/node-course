const fs = require('fs');

let base = 6;
let data = '';

for (let index = 1; index <= 10; index++) {
    data += `${base} * ${index} = ${base*index}\n`;
}

fs.writeFile(`tables/table-${base}.txt`, data, (err) => {
    if (err) throw err;
    console.log('File was created successfully.');
});