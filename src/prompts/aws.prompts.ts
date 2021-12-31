import {cli} from 'cli-ux'
import Inquirer = require('inquirer')
import {SUPPORTED_AWS_PROFILE_CHOICES} from '../constants'

const selectAWSProfile = async (): Promise<any> => {
  cli.info('\nPls, select a profile which you can allowed to use!!')
  cli.info('You might get forbidden error if you are not allowed to use the selected profile.\n')
  return Inquirer.prompt([
    {
      name: 'profile',
      message: 'Select an AWS profile',
      type: 'list',
      choices: SUPPORTED_AWS_PROFILE_CHOICES,
    },
  ])
}

const selectAWSInstance = async (availableInstances: {name: string; value: string}[]): Promise<any> => {
  return Inquirer.prompt([
    {
      pageSize: 20,
      name: 'instance',
      message: 'Select an AWS instance',
      type: 'list',
      choices: availableInstances,
    },
  ])
}

export {selectAWSProfile, selectAWSInstance}
