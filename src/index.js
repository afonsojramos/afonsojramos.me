#!/usr/bin/env node
'use strict';

import boxen from 'boxen';
import chalk from 'chalk';
import inquirer from 'inquirer';
import clear from 'clear';
import open from 'open';

clear();

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: 'list',
    name: 'action',
    message: 'What you want to do?',
    choices: [
      {
        name: `Send me an ${chalk.green.bold('email')}?`,
        value: () => {
          open('mailto:afonsojorgeramos@gmail.com');
          console.log('\nDone, see you soon.\n');
        },
      },
      {
        name: 'Just quit.',
        value: () => {
          console.log('Okay, I guess I can accept that, have a nice day!\n');
        },
      },
    ],
  },
];

const data = {
  name: chalk.bold.green('        Afonso Jorge Ramos'),
  handle: chalk.white('@afonsojramos'),
  work: `${chalk.white('Junior Software Developer at')} ${chalk.hex('#f25621').bold('Hostelworld')}`,
  github: chalk.gray('https://github.com/') + chalk.green('afonsojramos'),
  linkedin: chalk.gray('https://linkedin.com/in/') + chalk.blue('afonsojramos'),
  web: chalk.cyan('https://www.chronzy.com/afonsojramos'),
  npx: chalk.red('npx') + ' ' + chalk.white('afonsojramos'),

  labelWork: chalk.white.bold('       Work:'),
  labelGitHub: chalk.white.bold('     GitHub:'),
  labelLinkedIn: chalk.white.bold('   LinkedIn:'),
  labelWeb: chalk.white.bold('        Web:'),
  labelCard: chalk.white.bold('       Card:'),
};

const me = boxen(
  [
    `${data.name} / ${data.handle}`,
    ``,
    `${data.labelWork}  ${data.work}`,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labelLinkedIn}  ${data.linkedin}`,
    `${data.labelWeb}  ${data.web}`,
    ``,
    `${data.labelCard}  ${data.npx}`,
    ``,
    `${chalk.italic('Avid enthusiast for open source software development.')}`,
    `${chalk.italic('Open source perspective of life.')}`,
  ].join('\n'),
  {
    margin: 1,
    float: 'center',
    padding: 1,
    borderStyle: 'single',
    borderColor: 'cyan',
  }
);

console.info(me);

prompt(questions).then((answer) => answer.action());
