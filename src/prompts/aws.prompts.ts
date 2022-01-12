import inquirer from 'inquirer'

import IAWSConfiguration from '../interfaces/aws.config.interface'

const selectAWSProfile = async (
  config: IAWSConfiguration,
): Promise<{
  profile: string
}> => {
  return inquirer.prompt([
    {
      name: 'profile',
      message: 'Select an AWS profile',
      type: 'list',
      choices: config.profiles,
    },
  ])
}

const selectAWSInstance = async (
  availableInstances: {name: string; value: string}[],
): Promise<{
  instance: string
}> => {
  // eslint-disable-next-line unicorn/prefer-module
  inquirer.registerPrompt('search-list', require('inquirer-search-list'))
  return inquirer.prompt([
    {
      pageSize: 20,
      name: 'instance',
      message: 'Select an AWS instance',
      type: 'search-list',
      choices: availableInstances,
    },
  ])
}

export {selectAWSProfile, selectAWSInstance}
