import {Command} from '@oclif/core'

import AWSProcess from '../../processes/aws.process'

export class AddAWSPorfile extends Command {
  static description = 'Add a new AWS profile'

  async run(): Promise<void> {
    if (!AWSProcess.isLoaded()) {
      throw new Error('AWS CLI is not setup. Run hckre aws:init to setup.')
    }

    AWSProcess.execSync('configure sso', {
      stdio: 'inherit',
      encoding: 'ascii',
    })
  }
}
