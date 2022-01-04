import inquirer from 'inquirer'

const addNewAppCommand = async (): Promise<any> => {
  return inquirer.prompt([
    {
      name: 'environment',
      message: 'Environment',
      type: 'list',
      choices: ['production', 'local', 'staging'],
    },
    {
      name: 'stage',
      message: 'Stage',
      type: 'list',
      choices: ['build', 'test', 'deploy', 'start'],
    },
    {
      name: 'command',
      message: 'Command',
      type: 'input',
    },
    {
      name: 'alias',
      message: 'Alias',
      type: 'input',
    },
  ])
}

const selectCommandToRun = async (choices: {name: string; value: string}[]): Promise<any> => {
  return inquirer.prompt([
    {
      name: 'command',
      message: 'Select a command',
      type: 'list',
      choices: choices,
    },
  ])
}

export {addNewAppCommand, selectCommandToRun}
