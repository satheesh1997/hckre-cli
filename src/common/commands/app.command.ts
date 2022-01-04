import {Command, Config} from '@oclif/core'
import {existsSync} from 'fs-extra'

import AppConfiguration from '../../models/app.config.model'

import {IAppConfiguration} from '../../interfaces/app.config.interface'
import {panicAppNotInitialized} from '../../messages/error.messages'

export abstract class AppCommonCommand extends Command {
  public appConfiguration: IAppConfiguration

  constructor(argv: string[], config: Config) {
    super(argv, config)

    if (!existsSync('hckre.json')) {
      panicAppNotInitialized(this)
    }

    this.appConfiguration = new AppConfiguration()
  }
}
