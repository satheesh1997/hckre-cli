import {cli} from 'cli-ux'

import Chalk = require('chalk')

const printAddMoreAWSProfile = (): void => {
  cli.info(
    `${Chalk.greenBright(Chalk.bold('➜'))} Use ${Chalk.yellowBright('hckre aws:profiles --add')} to add more profile.`,
  )
}

const printLoginToAWSProfile = (): void => {
  cli.info(
    `${Chalk.greenBright(Chalk.bold('➜'))} Use ${Chalk.yellowBright('hckre aws:login')} to login with a profile.`,
  )
}

export {printAddMoreAWSProfile, printLoginToAWSProfile}
