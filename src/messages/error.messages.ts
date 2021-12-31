import {cli} from 'cli-ux'

import Chalk = require('chalk')

const printCommandError = (): void => {
  cli.info('')
  cli.info(Chalk.redBright(Chalk.bold('Oops!!')))
  cli.info(Chalk.yellow('Pls resolve the errors & try again!!'))
  cli.info('')
}

export {printCommandError}
