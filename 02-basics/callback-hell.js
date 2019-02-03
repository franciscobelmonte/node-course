let employers = [{
    id: 1,
    name: 'Francisco'
}, {
    id: 2,
    name: 'Estefania'
}, {
    id: 3,
    name: 'Marc'
}];

let salaries = [{
    id: 1,
    salary: 1900
}, {
    id: 2,
    salary: 100
}];

let getEmployerById = (id, callback) => {
    let employer = employers.find(employer => employer.id === id);
    if (!employer) {
        callback('Employer not found');
        return;
    }
    callback(undefined, employer);
};

let getSalaryForEmployer = (employer, callback) => {
    let salary = salaries.find(salary => salary.id === employer.id);
    if (!salary) {
        callback('Salary not found');
        return;
    }
    callback(undefined, {
        id: employer.id,
        name: employer.name,
        salary: salary.salary
    });
}

getEmployerById(1, (err, employer) => {
    if (err) {
        return console.error(err);
    }

    getSalaryForEmployer(employer, (err, response) => {
        if (err) {
            return console.error(err);
        }
        console.log(`${response.name} has a salary of ${response.salary}`)
    })
});