import chalk from 'chalk'

import {cli} from 'cli-ux'

import {Process} from '../../processes/process'
import {printAddAppCommand} from '../../messages/info.messages'
import {AppCommonCommand} from '../../common/commands/app.command'

export class BuildAppCommand extends AppCommonCommand {
  static description = 'Build the application'

  async run(): Promise<void> {
    const commands = []
    const environment = process.env.MACHINE_TYPE || 'local'

    switch (environment) {
      case 'local':
        commands.push(...this.appConfiguration.environmentCommands.local.build)
        break
      case 'production':
        commands.push(...this.appConfiguration.environmentCommands.production.build)
        break
      case 'staging':
        commands.push(...this.appConfiguration.environmentCommands.staging.build)
        break
      default:
        throw new Error('Unsupported environment')
    }

    if (commands.length === 0) {
      cli.info(chalk.bold(chalk.redBright(`\nNo command configured to build in ${environment} !!`)))
      cli.info(chalk.bold(chalk.cyanBright('\nUsefull Commands:')))
      printAddAppCommand()
    } else {
      for (const command of commands) {
        Process.execSync(command)
      }
    }
  }
}
