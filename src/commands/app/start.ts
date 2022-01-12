import {AppCommonCommand} from '../../common/commands/app.command'
import {runEnvironmentCommands} from '../../common/helpers/app.helpers'

export class StartAppCommand extends AppCommonCommand {
  static description = 'Start the application'

  async run(): Promise<void> {
    const {
      environmentCommands: {
        local: {start: localCommands},
        production: {start: productionCommands},
        staging: {start: stagingCommands},
      },
    } = this.appConfiguration

    runEnvironmentCommands(localCommands, productionCommands, stagingCommands)
  }
}
