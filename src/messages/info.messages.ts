import chalk from 'chalk'

import {cli} from 'cli-ux'

const printAddMoreAWSProfile = (): void => {
  cli.info(
    ` ${chalk.greenBright(chalk.bold('➜'))} Use ${chalk.yellowBright('hckre aws:profiles --add')} to add more profile.`,
  )
}

const printLoginToAWSProfile = (): void => {
  cli.info(
    ` ${chalk.greenBright(chalk.bold('➜'))} Use ${chalk.yellowBright('hckre aws:login')} to login with a profile.`,
  )
}

const printAddAppCommand = (): void => {
  cli.info(
    ` ${chalk.greenBright(chalk.bold('➜'))} Use ${chalk.yellowBright('hckre app:commands --add')} to add a command.`,
  )
}

export {printAddMoreAWSProfile, printLoginToAWSProfile, printAddAppCommand}
