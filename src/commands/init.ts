import {Command} from '@oclif/core'
import {cli} from 'cli-ux'
import {existsSync, mkdirpSync} from 'fs-extra'

import {CLI_STORAGE} from '../constants'
import {Configuration} from '../common/config'
import IUser from '../interfaces/user.interface'
import User from '../models/user.model'

import chalk = require('chalk')

export class Initialize extends Command {
  static description = 'Initialize CLI tool'

  async run(): Promise<void> {
    if (!existsSync(CLI_STORAGE)) {
      cli.action.start('Creating storage')
      mkdirpSync(CLI_STORAGE)
      cli.action.stop('OK')
    }

    if (!existsSync(this.config.configDir)) {
      cli.action.start('Creating config storage')
      mkdirpSync(this.config.configDir)
      cli.action.stop('OK')
    }

    const configuration: Configuration = new Configuration(this.config)
    const user: IUser | undefined = configuration.getUser()

    if (user === undefined) {
      cli.info(`
Looks like you are using the cli for the first time. We will need some
information about you to give the better experience.
      `)

      const newUser: IUser = new User(
        await cli.prompt('Name'),
        await cli.prompt('Email'),
        await cli.prompt('Business Unit', {default: 'Engineering'}),
        await cli.prompt('Team'),
      )
      configuration.saveUser(newUser)
    } else {
      cli.info(
        chalk.cyanBright(
          `\n\nHey ${chalk.bold(chalk.greenBright(user.name))}, \n\nLooks like the cli is already initialized !!`,
        ),
      )
    }

    cli.info('')
  }
}
