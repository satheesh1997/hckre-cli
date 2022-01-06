import {AppCommonCommand} from '../../common/commands/app.command'
import {runEnvironmentCommands} from '../../common/helpers/app.helpers'

export class BuildAppCommand extends AppCommonCommand {
  static description = 'Build the application'

  async run(): Promise<void> {
    const {
      environmentCommands: {
        local: {build: localCommands},
        production: {build: productionCommands},
        staging: {build: stagingCommands},
      },
    } = this.appConfiguration

    runEnvironmentCommands(localCommands, productionCommands, stagingCommands)
  }
}
