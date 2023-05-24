// Imported required packages for this application
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');


// Array of questions for user input
const questions = [
    {
      type: 'input',
      name: 'github',
      message: 'What is your GitHub username?',
      validate: githubInput => {
        if (githubInput) {
          return true;
        }else{
          console.log('Please enter your Github username.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?',
      validate: emailInput => {
        if (emailInput) {
          return true;
        }else{
          console.log('Please enter your email!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'title',
      message: "What is your project's name?",
      validate: titleInput => {
        if (titleInput) {
          return true;
        }else{
          console.log('Please provide a title for your project!')
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please write a short description of your project',
      validate: descInput => {
        if (descInput) {
          return true;
        }else{
          console.log('Please enter a description.');
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'license',
      message: 'What kind of license should your project have?',
      choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None'],
    //   when: ({ contents }) => {
    //     if (contents.indexOf('License') > -1) {
    //       return true;
    //     }else{
    //       return false;
    //     }
    //   }
    },
    {
      type: 'input',
      name: 'installation',
      message: 'What command should be run to install dependencies?',
      default: 'npm i',
    //   when: ({ contents }) => {
    //     if (contents.indexOf('Installation') > -1) {
    //       return true;
    //     }else{
    //       return false;
    //     }
    //   }
    },
    {
      type: 'input',
      name: 'test',
      message: 'What command should be run to run tests?',
      default: 'npm test',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'What does the user need to know about using the repo?',
      validate: usageInput => {
        if (usageInput) {
          return true;
        }else{
          console.log('Providing instructions for usage will help users navigate your project properly. Try again please.');
        }
      }
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'What does the user need to know about contributing to the repo?',
    //   when: ({ contents }) => {
    //     if (contents.indexOf('Contributing') > -1) {
    //       return true;
    //     }else{
    //       return false;
    //     }
    //   }
    },
  ];
  
  // Function to write README file using the user input
  function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
  }
  
  // Function to initialize app
  function init() {
    inquirer.prompt(questions).then((inquirerResponses) => {
      console.log('Generating README...');
      writeToFile('README.md', generateMarkdown({ ...inquirerResponses }));
    });
  }
  
  init();
