import chalk from 'chalk'

import {cli} from 'cli-ux'

import {Command} from '@oclif/core'

const printCLINotInitialized = (): void => {
  cli.info('')
  cli.info(chalk.yellow(`Might not work properly. Run ${chalk.redBright('hckre init')} to initialize!!`))
  cli.info('')
}

const printCommandError = (): void => {
  cli.info('')
  cli.info(chalk.redBright(chalk.bold('Oops!!')))
  cli.info(chalk.yellow('\nPls resolve the errors & try again!!'))
  cli.info('')
}

const printUnsupportedPlatformError = (): void => {
  cli.info('')
  cli.info(chalk.redBright(chalk.bold('Oops!!')))
  cli.info(chalk.yellow('\nCurrently this platform is not supported :('))
  cli.info('')
}

const panicAWSNotLoaded = (command: Command | undefined): void => {
  cli.info('')
  cli.info(chalk.redBright(chalk.bold('Oops!!')))
  cli.info(chalk.yellow(`\nAWS cli is not loaded. Run ${chalk.redBright('hckre aws:init')} to initialize!!`))
  cli.info('')
  if (command) command.exit(1)
  throw new Error('AWS CLI not configured')
}

const panicSSMNotLoaded = (command: Command | undefined): void => {
  cli.info('')
  cli.info(chalk.redBright(chalk.bold('Oops!!')))
  cli.info(chalk.yellow(`\nSSM plugin is not loaded. Run ${chalk.redBright('hckre aws:init')} to initialize!!`))
  cli.info('')
  if (command) command.exit(1)
  throw new Error('SSM plugin not configured!!')
}

const panicSSOLoginExpired = (command: Command | undefined): void => {
  cli.info('')
  cli.info(chalk.redBright(chalk.bold('Oops!!')))
  cli.info(chalk.yellow(`\nLogin expired. Run ${chalk.redBright('hckre aws:login')} to login!!`))
  cli.info('')
  if (command) command.exit(1)
  throw new Error('SSM plugin not configured!!')
}

const printAppAlreadyInitialized = (): void => {
  cli.info('')
  cli.info(chalk.yellowBright(chalk.bold('This app is already initialized!!')))
  cli.info(chalk.cyanBright('\nYou need to manually edit the configuration file.'))
  cli.info('')
}

const panicAppNotInitialized = (command: Command | undefined): void => {
  cli.info('')
  cli.info(chalk.redBright(chalk.bold('Oops!!')))
  cli.info(chalk.yellow(`\nApp is not initialized. Run ${chalk.redBright('hckre app:init')} to init this app!!`))
  cli.info('')
  if (command) command.exit(1)
  throw new Error('App is not initialized!!')
}

export {
  printCLINotInitialized,
  printCommandError,
  printUnsupportedPlatformError,
  panicAWSNotLoaded,
  panicSSMNotLoaded,
  panicSSOLoginExpired,
  printAppAlreadyInitialized,
  panicAppNotInitialized,
}
