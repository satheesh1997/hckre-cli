import AWSProcess from '../../processes/aws.process'
import AWSConfiguration from '../../models/aws.config.model'
import IAWSConfiguration from '../../interfaces/aws.config.interface'

import {selectAWSProfile} from '../../prompts/aws.prompts'
import {AWSCommonCommand} from '../../common/commands/aws.command'

export class Login extends AWSCommonCommand {
  static description = 'Login via SSO'

  async run(): Promise<void> {
    const awsConfiguration: IAWSConfiguration = new AWSConfiguration()
    const response = await selectAWSProfile(awsConfiguration)

    AWSProcess.execSync(`sso login --profile=${response.profile}`, {
      stdio: 'inherit',
      encoding: 'ascii',
    })
  }
}
