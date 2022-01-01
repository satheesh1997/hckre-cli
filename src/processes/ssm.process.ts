import {existsSync} from 'fs-extra'

import {CLI_STORAGE} from '../constants'

import ChildProcess = require('child_process')

const SSMProcess = {
  isLoaded: (): boolean => {
    return existsSync(`${CLI_STORAGE}/session-manager-plugin`)
  },
  spawnSync: (cmdArgs: string): void => {
    ChildProcess.spawnSync(`${CLI_STORAGE}/session-manager-plugin ${cmdArgs}`, {
      shell: true,
      stdio: 'inherit',
    })
  },
}

export default SSMProcess
