const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Initialize empty array to hold team members
const team = [];

// Prompt user for information about team manager
inquirer.prompt([ 
{
    type: 'input',
    name: 'name',
    message: "What is the team manager's name?",
    validate: function (input) {
        if (input.trim() === '') {
            return 'Please enter a name.';
            }
            return true;
        },
},
{
    type: 'input',
    name: 'id',
    message: "What is the team manager's employee ID?",
    validate: function (input) {
        const idRegex = /^[1-9]\d*$/;
        if (!idRegex.test(input)) {
        return 'Please enter a valid employee ID (positive integer).';
        }
        return true;
    },
},
{
    type: 'input',
    name: 'email',
    message: "What is the team manager's email address?",
    validate: function (input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
        return 'Please enter a valid email address.';
        }
        return true;
    },
},
{
    type: 'input',
    name: 'officeNumber',
    message: "What is the team manager's office number?",
    validate: function (input) {
        const officeNumberRegex = /^[1-9]\d*$/;
        if (!officeNumberRegex.test(input)) {
        return 'Please enter a valid office number (positive integer).';
        }
        return true;
    },
},
]).then((answers) => {
// Create Manager object using provided information and add to team array
const manager = new Manager(
    answers.name,
    answers.id,
    answers.email,
    answers.officeNumber
);
team.push(manager);
addTeamMember();
});

// Prompt user to add engineer, intern, or finish building team
function addTeamMember() {
inquirer.prompt([
    {
    type: 'list',
    name: 'teamMemberType',
    message: 'What type of team member would you like to add?',
    choices: ['Engineer', 'Intern', 'Finish building team'],
    },
]).then((answer) => {
    switch (answer.teamMemberType) {
    case 'Engineer':
        addEngineer();
        break;
    case 'Intern':
        addIntern();
        break;
    default:
        generateHtml();
        break;
    }
});
}

