import chalk from 'chalk'

import {Flags} from '@oclif/core'
import {cli} from 'cli-ux'

import AWSProcess from '../../processes/aws.process'

import {AWSCommonCommand} from '../../common/commands/aws.command'
import {printAddMoreAWSProfile, printLoginToAWSProfile} from '../../messages/info.messages'

export class AWSProfileManagerCommand extends AWSCommonCommand {
  static description = 'Manage aws profiles'

  static flags = {
    add: Flags.boolean({char: 'a', description: 'add a new profile'}),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(AWSProfileManagerCommand)

    if (flags.add) {
      AWSProcess.execSync('configure sso', {
        stdio: 'inherit',
        encoding: 'ascii',
      })
    } else {
      cli.info(chalk.greenBright(chalk.bold('AWS profiles:\n')))
      for (const index in this.awsConfiguration.profiles) {
        if (index) cli.info(`${index}. ${this.awsConfiguration.profiles[index]}`)
      }

      cli.info('\nTips:')
      printAddMoreAWSProfile()
      printLoginToAWSProfile()
    }
  }
}
