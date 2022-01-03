import {Command} from '@oclif/core'
import {existsSync} from 'fs-extra'

import AppConfiguration from '../../models/app.config.model'

import {editFilePrompt} from '../../common/prompts'
import {printAppAlreadyInitialized} from '../../messages/error.messages'
import {AppConfigurationProcess} from '../../processes/editor.process'

export class InitializeApplication extends Command {
  static description = 'Initialize an application'

  async run(): Promise<void> {
    if (existsSync('hckre.json')) {
      printAppAlreadyInitialized()
      if (await editFilePrompt()) AppConfigurationProcess.editFile()
    }

    const appConfiguration = new AppConfiguration()
    appConfiguration.save()
  }
}
