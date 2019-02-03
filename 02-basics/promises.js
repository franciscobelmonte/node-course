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

let getEmployerById = (id) => {
    let promise = new Promise((resolve, reject) => {
        let employer = employers.find(employer => employer.id === id);
        if (!employer) {
            return reject('Employer not found');
        }
        resolve(employer);
    });

    return promise;
};

let getSalaryForEmployer = (employer) => {
    let promise = new Promise((resolve, reject) => {
        let salary = salaries.find(salary => salary.id === employer.id);
        if (!salary) {
            reject('Salary not found');
            return;
        }
        resolve({
            id: employer.id,
            name: employer.name,
            salary: salary.salary
        });
    });

    return promise;
}

// Promise with same callback hell problem
getEmployerById(1).then(employer => {
    getSalaryForEmployer(employer).then(response => {
        console.log(`${response.name} has a salary of ${response.salary}`)
    }, err => {
        console.error(err);
    })
}, err => {
    console.error(err);
});

// Chaining promises
getEmployerById(1).then(employer => {
    return getSalaryForEmployer(employer);
}).then(response => {
    console.log(`${response.name} has a salary of ${response.salary}`)
}).catch(err => {
    console.error(err);
});