import chalk from 'chalk'

import {cli} from 'cli-ux'

const printAddMoreAWSProfile = (): void => {
  cli.info(
    `${chalk.greenBright(chalk.bold('➜'))} Use ${chalk.yellowBright('hckre aws:profiles --add')} to add more profile.`,
  )
}

const printLoginToAWSProfile = (): void => {
  cli.info(
    `${chalk.greenBright(chalk.bold('➜'))} Use ${chalk.yellowBright('hckre aws:login')} to login with a profile.`,
  )
}

export {printAddMoreAWSProfile, printLoginToAWSProfile}
