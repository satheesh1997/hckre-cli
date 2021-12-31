import {Command} from '@oclif/core'
import {existsSync} from 'fs-extra'

import AWSProcess from '../../processes/aws.process'

import {selectAWSProfile} from '../../prompts/aws.prompts'
import {AWS_CREDENTIALS_STORAGE} from '../../constants'
import {printCommandError} from '../../messages/error.messages'

import Listr = require('listr')

export class Login extends Command {
  static description = 'Login via SSO'

  async run(): Promise<void> {
    const tasks = new Listr(
      [
        {
          title: 'Configuration',
          task: () => {
            if (!existsSync(`${AWS_CREDENTIALS_STORAGE}/config`)) {
              throw new Error('Missing configuration, Run hckre aws:init.')
            }
          },
        },
      ],
      {collapse: false} as Listr.ListrOptions,
    )
    await tasks.run().catch(_error => printCommandError())

    const response = await selectAWSProfile()

    AWSProcess.execSync(`sso login --profile=${response.profile}`, {
      stdio: 'inherit',
      encoding: 'ascii',
    })
  }
}
