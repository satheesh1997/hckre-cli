import chalk from 'chalk'

import {Command} from '@oclif/core'
import {cli} from 'cli-ux'
import {existsSync} from 'fs-extra'

import AppConfiguration from '../../models/app.config.model'

import {panicAppNotInitialized} from '../../messages/error.messages'
import {IAppConfiguration} from '../../interfaces/app.config.interface'
import {Process} from '../../processes/process'
import {printAddAppCommand} from '../../messages/info.messages'

export class DeployAppCommand extends Command {
  static description = 'Deploy the application'

  async run(): Promise<void> {
    if (!existsSync('hckre.json')) {
      panicAppNotInitialized(this)
    }

    const appConfiguration: IAppConfiguration = new AppConfiguration()
    const commands = []
    const environment = process.env.MACHINE_TYPE || 'local'

    switch (environment) {
      case 'local':
        commands.push(...appConfiguration.environmentCommands.local.start)
        break
      case 'production':
        commands.push(...appConfiguration.environmentCommands.production.start)
        break
      case 'staging':
        commands.push(...appConfiguration.environmentCommands.staging.start)
        break
      default:
        throw new Error('Unsupported environment')
    }

    if (commands.length === 0) {
      cli.info(chalk.bold(chalk.redBright(`\nNo command configured to deploy in ${environment} !!`)))
      cli.info(chalk.bold(chalk.cyanBright('\nUsefull Commands:')))
      printAddAppCommand()
    } else {
      for (const command of commands) {
        Process.execSync(command)
      }
    }
  }
}
