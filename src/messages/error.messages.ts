import {cli} from 'cli-ux'

import Chalk = require('chalk')
import {Command} from '@oclif/core'

const printCommandError = (): void => {
  cli.info('')
  cli.info(Chalk.redBright(Chalk.bold('Oops!!')))
  cli.info(Chalk.yellow('\nPls resolve the errors & try again!!'))
  cli.info('')
}

const printUnsupportedPlatformError = (): void => {
  cli.info('')
  cli.info(Chalk.redBright(Chalk.bold('Oops!!')))
  cli.info(Chalk.yellow('\nCurrently this platform is not supported :('))
  cli.info('')
}

const panicAWSNotLoaded = (command: Command | undefined): void => {
  cli.info('')
  cli.info(Chalk.redBright(Chalk.bold('Oops!!')))
  cli.info(Chalk.yellow(`\nCommand aws is not initialized. Run ${Chalk.redBright('hckre aws:init')} to initialize!!`))
  cli.info('')
  if (command) command.exit(1)
  throw new Error('AWS CLI not configured')
}

const panicSSMNotLoaded = (command: Command | undefined): void => {
  cli.info('')
  cli.info(Chalk.redBright(Chalk.bold('Oops!!')))
  cli.info(Chalk.yellow(`\nCommand aws is not initialized. Run ${Chalk.redBright('hckre aws:init')} to initialize!!`))
  cli.info('')
  if (command) command.exit(1)
  throw new Error('SSM plugin not configured!!')
}

const panicSSOLoginExpired = (command: Command | undefined): void => {
  cli.info('')
  cli.info(Chalk.redBright(Chalk.bold('Oops!!')))
  cli.info(Chalk.yellow(`\nLogin expired. Run ${Chalk.redBright('hckre aws:login')} to login!!`))
  cli.info('')
  if (command) command.exit(1)
  throw new Error('SSM plugin not configured!!')
}

export {printCommandError, printUnsupportedPlatformError, panicAWSNotLoaded, panicSSMNotLoaded, panicSSOLoginExpired}
