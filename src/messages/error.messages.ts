import {cli} from 'cli-ux'

import Chalk = require('chalk')

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

export {printCommandError, printUnsupportedPlatformError}
