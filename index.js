// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "projectTitle",
        message: "Insert project title name",
    },
    {
        type: "input",
        name: "description",
        message: "Give description of the project",
    },
    {
        type: "input",
        name: "installation",
        message: "Give installation instructions for the project"
    },
    {
        type: "input",
        name: "usage",
        message: "Describe the usage for the project"
    },
    {
        type: "input",
        name: "contributing",
        message: "who are the contributions on the project?",
    },
    {
        type: "input",
        name: "tests",
        message: "Add test instuctions"
    },
    {
        type: "input",
        name: "username",
        message: "What is your Github username?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "list",
        name: "license",
        message: "What licenses does your project use?",
        choices: ["MIT","GPLv2","Apache", "GPLv3", "BSD 3-clause", "None"],
    }

];

const prompt = inquirer.createPromptModule();

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    generateMarkdown
    const info = generateMarkdown(data)
    fs.writeFile(fileName, 
    `${info}

## Description
${data.description}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Contribution](#contribution)
- [Usage](#usage)
- [Test](#test)
- [Questions](#questions)
${renderLicenseLink(data)}
    
## Installation
~~~
${data.installation}
~~~

## Contribution
${data.contributing}
    
## Usage
${data.usage}
    
## Test
${data.tests}

## Questions
GitHub: ${data.username}

Email: ${data.email}

${renderLicenseMessage(data)}`, (err) =>
    err ? console.error(err) : console.log('Success!'));
}

// TODO: Create a function to initialize app
function init() {
    prompt(questions).then(data => {
        writeToFile("generatedREADME.md", data);  
    })
}

const renderLicenseMessage = (data) => {
    if(data.license === "None") {
        return ""
    } else {
        return `## License
This project is license with ${data.license}`
    }
}

const renderLicenseLink = (data) => {
    if (data.license === "None") {
        return ""
    } else {
        return `- [License](#license)`
    }
}

// Function call to initialize app
init();
