import {AppCommonCommand} from '../../common/commands/app.command'
import {runEnvironmentCommands} from '../../common/helpers/app.helpers'

export class TestAppCommand extends AppCommonCommand {
  static description = 'Test the application'

  async run(): Promise<void> {
    const {
      environmentCommands: {
        local: {test: localCommands},
        production: {test: productionCommands},
        staging: {test: stagingCommands},
      },
    } = this.appConfiguration

    runEnvironmentCommands(localCommands, productionCommands, stagingCommands)
  }
}
