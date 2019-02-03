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

let getEmployerById = async(id) => {
    let employer = employers.find(employer => employer.id === id);
    if (!employer) {
        throw new Error('Employer not found');
    }
    return employer;
};

let getSalaryForEmployer = async(employer) => {
    let salary = salaries.find(salary => salary.id === employer.id);
    if (!salary) {
        throw new Error('Salary not found');
    }
    return {
        id: employer.id,
        name: employer.name,
        salary: salary.salary
    };
}

let getInfo = async(id) => {
    let employer = await getEmployerById(id);
    let response = await getSalaryForEmployer(employer);
    return `${ response.name } has a salary of ${ response.salary }`;
};

getInfo(1)
    .then(message => console.log(message))
    .catch(error => console.error(error));