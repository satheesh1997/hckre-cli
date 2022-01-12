import {AppCommonCommand} from '../../common/commands/app.command'
import {runEnvironmentCommands} from '../../common/helpers/app.helpers'

export class DeployAppCommand extends AppCommonCommand {
  static description = 'Deploy the application'

  async run(): Promise<void> {
    const {
      environmentCommands: {
        local: {deploy: localCommands},
        production: {deploy: productionCommands},
        staging: {deploy: stagingCommands},
      },
    } = this.appConfiguration

    runEnvironmentCommands(localCommands, productionCommands, stagingCommands)
  }
}
