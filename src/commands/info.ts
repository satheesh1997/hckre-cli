import chalk from 'chalk'

import {Command} from '@oclif/core'
import {cli} from 'cli-ux'

export default class Info extends Command {
  static description = 'display information about cli'

  async run(): Promise<void> {
    const message = `
${chalk.greenBright('Hckre')} is a command-line interface that is built to help developers ease their daily work.
${chalk.bold(chalk.yellow('\nVersion'))}:
    ${this.config.version}
${chalk.bold(chalk.yellow('Dependencies'))}:
    ${chalk.bold(chalk.blue('Ubuntu'))}
        1. sudo apt install git
        2. refer to install docker - https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04
        3. sudo apt-get install docker-compose
        3. sudo apt-get install unzip
    ${chalk.bold(chalk.blue('Arch'))}
        1. sudo pacman -S git
        2. refer to install docker - https://linuxconfig.org/manjaro-linux-docker-installation
        3. sudo pacman -S docker-compose
        3. sudo pacman -S unzip
    ${chalk.bold(chalk.blue('darwin'))}
        1. refer to install brew - https://www.digitalocean.com/community/tutorials/how-to-install-and-use-homebrew-on-macos
        2. refer to install docker - https://docs.docker.com/desktop/mac/install/
        3. refer to install rosetta2 - https://osxdaily.com/2020/12/04/how-install-rosetta-2-apple-silicon-mac/
        4. xcode-select --install (Install command line development tools)
        5. refer to install iterm2 - https://iterm2.com/
${chalk.bold(chalk.yellow('Important Links'))}:
    1. ${chalk.greenBright('[Issues]')} https://github.com/satheesh1997/hckre-cli/issues
    4. ${chalk.greenBright('[Wiki]')} https://github.com/satheesh1997/hckre-cli/wiki
${chalk.bold(chalk.yellow('Changelog'))}:
    1. Support for darwin.
    2. Vpn & oncall commands are taken down temporarily. We are improving them.
    3. Support for SSO login is added to aws. Use ${chalk.bold(chalk.yellow('hckre aws:login'))} to login via SSO.
    4. No restrictions on supported aws profiles. 
    5. Use ${chalk.bold(chalk.yellow('hckre aws:profiles --add'))} to add aws new profiles.
    6. Searching ec2 instaces via user email added to aws:ec2 command.
${chalk.bold('\nBuilt with')} ${chalk.bold(chalk.redBright('oclif'))}.
${chalk.greenBright('\nThe maintainers of this tool are looking for contributors.')}
    `
    cli.info(message)
    this.exit(0)
  }
}
