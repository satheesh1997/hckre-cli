import {Hook} from '@oclif/core'
import {existsSync} from 'fs-extra'

import {CLI_STORAGE} from '../../constants'
import {printCLINotInitialized} from '../../messages/error.messages'

const hook: Hook<'init'> = async function (options) {
  if ((options.id && options.id === 'init') || (options.id && options.id === 'info')) {
    return
  }

  if (
    !existsSync(options.config.cacheDir) ||
    !existsSync(options.config.configDir) ||
    !existsSync(CLI_STORAGE) ||
    !existsSync(`${options.config.configDir}/user.json`)
  ) {
    printCLINotInitialized()
  }
}

export default hook
