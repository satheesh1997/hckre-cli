import {Command} from '@oclif/core'

import AWSProcess from '../../processes/aws.process'

export class AddAWSPorfile extends Command {
  static description = 'Add a new AWS profile'

  async run(): Promise<void> {
    AWSProcess.execSync('configure sso', {
      stdio: 'inherit',
      encoding: 'ascii',
    })
  }
}
