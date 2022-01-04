import chalk from 'chalk'

import {Command, Flags} from '@oclif/core'
import {cli} from 'cli-ux'
import {existsSync} from 'fs-extra'

import AppConfiguration from '../../models/app.config.model'

import {panicAppNotInitialized} from '../../messages/error.messages'
import {addNewAppCommand} from '../../prompts/app.prompts'
import {printAddAppCommand} from '../../messages/info.messages'

export class AddListAppCommands extends Command {
  static description = 'List & add commands'

  static flags = {
    add: Flags.boolean({char: 'a', description: 'add a new command'}),
  }

  async run(): Promise<void> {
    if (!existsSync('hckre.json')) {
      panicAppNotInitialized(this)
    }

    const {flags} = await this.parse(AddListAppCommands)
    const appConfiguration = new AppConfiguration()

    if (flags.add) {
      const response = await addNewAppCommand()
      appConfiguration.commands = {
        ...appConfiguration.commands,
        [`${response.alias} (${response.environment})`]: response.command,
      }
      switch (response.environment) {
        case 'local':
          switch (response.stage) {
            case 'build':
              appConfiguration.environmentCommands.local.build.push(response.command)
              break
            case 'deploy':
              appConfiguration.environmentCommands.local.deploy.push(response.command)
              break
            case 'test':
              appConfiguration.environmentCommands.local.test.push(response.command)
              break
            case 'start':
              appConfiguration.environmentCommands.local.start.push(response.command)
              break
          }

          break
        case 'staging':
          switch (response.stage) {
            case 'build':
              appConfiguration.environmentCommands.staging.build.push(response.command)
              break
            case 'deploy':
              appConfiguration.environmentCommands.staging.deploy.push(response.command)
              break
            case 'test':
              appConfiguration.environmentCommands.staging.test.push(response.command)
              break
            case 'start':
              appConfiguration.environmentCommands.staging.start.push(response.command)
              break
          }

          break
        case 'production':
          switch (response.stage) {
            case 'build':
              appConfiguration.environmentCommands.production.build.push(response.command)
              break
            case 'deploy':
              appConfiguration.environmentCommands.production.deploy.push(response.command)
              break
            case 'test':
              appConfiguration.environmentCommands.production.test.push(response.command)
              break
            case 'start':
              appConfiguration.environmentCommands.production.start.push(response.command)
              break
          }

          break
      }

      appConfiguration.save()
    } else {
      cli.info(chalk.bold(chalk.greenBright('Commands available for the environments:\n')))
      cli.info(chalk.bold('Local:'))
      cli.info(' Build: ' + appConfiguration.environmentCommands.local.build.toString())
      cli.info(' Test: ' + appConfiguration.environmentCommands.local.test.toString())
      cli.info(' Start: ' + appConfiguration.environmentCommands.local.start.toString())
      cli.info(' Deploy: ' + appConfiguration.environmentCommands.local.deploy.toString())
      cli.info(chalk.bold('\nStaging:'))
      cli.info(' Build: ' + appConfiguration.environmentCommands.staging.build.toString())
      cli.info(' Test: ' + appConfiguration.environmentCommands.staging.test.toString())
      cli.info(' Start: ' + appConfiguration.environmentCommands.staging.start.toString())
      cli.info(' Deploy: ' + appConfiguration.environmentCommands.staging.deploy.toString())
      cli.info(chalk.bold('\nProduction:'))
      cli.info(' Build: ' + appConfiguration.environmentCommands.production.build.toString())
      cli.info(' Test: ' + appConfiguration.environmentCommands.production.test.toString())
      cli.info(' Start: ' + appConfiguration.environmentCommands.production.start.toString())
      cli.info(' Deploy: ' + appConfiguration.environmentCommands.production.deploy.toString())

      cli.info(chalk.bold(chalk.cyanBright('\n\nUsefull Commands:')))
      printAddAppCommand()
    }
  }
}
