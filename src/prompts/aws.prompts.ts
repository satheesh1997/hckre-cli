import Inquirer = require('inquirer')

import IAWSConfiguration from '../interfaces/aws.config.interface'

const selectAWSProfile = async (config: IAWSConfiguration): Promise<any> => {
  return Inquirer.prompt([
    {
      name: 'profile',
      message: 'Select an AWS profile',
      type: 'list',
      choices: config.profiles,
    },
  ])
}

const selectAWSInstance = async (availableInstances: {name: string; value: string}[]): Promise<any> => {
  // eslint-disable-next-line unicorn/prefer-module
  Inquirer.registerPrompt('search-list', require('inquirer-search-list'))
  return Inquirer.prompt([
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
