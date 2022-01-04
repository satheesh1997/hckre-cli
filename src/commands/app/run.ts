import {Command} from '@oclif/core'
import {existsSync} from 'fs-extra'

import AppConfiguration from '../../models/app.config.model'

import {panicAppNotInitialized} from '../../messages/error.messages'
import {IAppConfiguration} from '../../interfaces/app.config.interface'
import {selectCommandToRun} from '../../prompts/app.prompts'
import {Process} from '../../processes/process'

export class RunCommand extends Command {
  static description = 'Run a command'

  async run(): Promise<void> {
    if (!existsSync('hckre.json')) {
      panicAppNotInitialized(this)
    }

    const appConfiguration: IAppConfiguration = new AppConfiguration()
    const availableCommands: {name: string; value: string}[] = []

    for (const command in appConfiguration.commands) {
      if (command) {
        const question: {name: string; value: string} = {
          name: command,
          value: appConfiguration.commands[command] as unknown as string,
        }
        availableCommands.push(question)
      }
    }

    const {command} = await selectCommandToRun(availableCommands)
    Process.execSync(command)
  }
}
