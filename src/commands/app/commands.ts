import chalk from 'chalk'

import {Flags} from '@oclif/core'
import {cli} from 'cli-ux'

import {addNewAppCommand} from '../../prompts/app.prompts'
import {printAddAppCommand} from '../../messages/info.messages'
import {AppCommonCommand} from '../../common/commands/app.command'

export class AddListAppCommands extends AppCommonCommand {
  static description = 'List & add commands'

  static flags = {
    add: Flags.boolean({char: 'a', description: 'add a new command'}),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(AddListAppCommands)

    if (flags.add) {
      const response = await addNewAppCommand()
      this.appConfiguration.commands = {
        ...this.appConfiguration.commands,
        [`${response.alias} (${response.environment})`]: response.command,
      }
      switch (response.environment) {
        case 'local':
          switch (response.stage) {
            case 'build':
              this.appConfiguration.environmentCommands.local.build.push(response.command)
              break
            case 'deploy':
              this.appConfiguration.environmentCommands.local.deploy.push(response.command)
              break
            case 'test':
              this.appConfiguration.environmentCommands.local.test.push(response.command)
              break
            case 'start':
              this.appConfiguration.environmentCommands.local.start.push(response.command)
              break
          }

          break
        case 'staging':
          switch (response.stage) {
            case 'build':
              this.appConfiguration.environmentCommands.staging.build.push(response.command)
              break
            case 'deploy':
              this.appConfiguration.environmentCommands.staging.deploy.push(response.command)
              break
            case 'test':
              this.appConfiguration.environmentCommands.staging.test.push(response.command)
              break
            case 'start':
              this.appConfiguration.environmentCommands.staging.start.push(response.command)
              break
          }

          break
        case 'production':
          switch (response.stage) {
            case 'build':
              this.appConfiguration.environmentCommands.production.build.push(response.command)
              break
            case 'deploy':
              this.appConfiguration.environmentCommands.production.deploy.push(response.command)
              break
            case 'test':
              this.appConfiguration.environmentCommands.production.test.push(response.command)
              break
            case 'start':
              this.appConfiguration.environmentCommands.production.start.push(response.command)
              break
          }

          break
      }

      this.appConfiguration.save()
    } else {
      cli.info(chalk.bold(chalk.greenBright('Commands available for the environments:\n')))
      cli.info(chalk.bold('Local:'))
      cli.info(' Build: ' + this.appConfiguration.environmentCommands.local.build.toString())
      cli.info(' Test: ' + this.appConfiguration.environmentCommands.local.test.toString())
      cli.info(' Start: ' + this.appConfiguration.environmentCommands.local.start.toString())
      cli.info(' Deploy: ' + this.appConfiguration.environmentCommands.local.deploy.toString())
      cli.info(chalk.bold('\nStaging:'))
      cli.info(' Build: ' + this.appConfiguration.environmentCommands.staging.build.toString())
      cli.info(' Test: ' + this.appConfiguration.environmentCommands.staging.test.toString())
      cli.info(' Start: ' + this.appConfiguration.environmentCommands.staging.start.toString())
      cli.info(' Deploy: ' + this.appConfiguration.environmentCommands.staging.deploy.toString())
      cli.info(chalk.bold('\nProduction:'))
      cli.info(' Build: ' + this.appConfiguration.environmentCommands.production.build.toString())
      cli.info(' Test: ' + this.appConfiguration.environmentCommands.production.test.toString())
      cli.info(' Start: ' + this.appConfiguration.environmentCommands.production.start.toString())
      cli.info(' Deploy: ' + this.appConfiguration.environmentCommands.production.deploy.toString())

      cli.info(chalk.bold(chalk.cyanBright('\n\nUsefull Commands:')))
      printAddAppCommand()
    }
  }
}
