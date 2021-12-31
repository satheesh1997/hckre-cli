import Inquirer = require('inquirer')
import {SUPPORTED_AWS_PROFILE_CHOICES} from '../constants'

const selectAWSProfile = async (): Promise<any> => {
  return Inquirer.prompt([
    {
      name: 'profile',
      message: 'Select a profile',
      type: 'list',
      choices: SUPPORTED_AWS_PROFILE_CHOICES,
    },
  ])
}

export {selectAWSProfile}
