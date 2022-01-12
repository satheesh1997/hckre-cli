import chalk from 'chalk'

import {cli} from 'cli-ux'

import {printAddAppCommand} from '../../messages/info.messages'
import {Process} from '../../processes/process'

const runEnvironmentCommands = (
  localCommands: string[],
  productionCommands: string[],
  stagingCommands: string[],
): void => {
  const commands = []
  const environment = process.env.MACHINE_TYPE || 'local'

  switch (environment) {
    case 'local':
      commands.push(...localCommands)
      break
    case 'production':
      commands.push(...productionCommands)
      break
    case 'staging':
      commands.push(...stagingCommands)
      break
    default:
      throw new Error('Unsupported environment')
  }

  if (commands.length === 0) {
    cli.info(chalk.bold(chalk.redBright(`\nNo command configured for ${environment} environment!!`)))
    cli.info(chalk.bold(chalk.cyanBright('\nUsefull Commands:')))
    printAddAppCommand()
  } else {
    for (const command of commands) {
      Process.execSync(command)
    }
  }
}

export {runEnvironmentCommands}
