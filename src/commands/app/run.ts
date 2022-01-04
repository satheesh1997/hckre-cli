import {selectCommandToRun} from '../../prompts/app.prompts'
import {Process} from '../../processes/process'
import {AppCommonCommand} from '../../common/commands/app.command'

export class RunCommand extends AppCommonCommand {
  static description = 'Run a command'

  async run(): Promise<void> {
    const availableCommands: {name: string; value: string}[] = []

    for (const command in this.appConfiguration.commands) {
      if (command) {
        const question: {name: string; value: string} = {
          name: command,
          value: this.appConfiguration.commands[command] as unknown as string,
        }
        availableCommands.push(question)
      }
    }

    const {command} = await selectCommandToRun(availableCommands)
    Process.execSync(command)
  }
}
