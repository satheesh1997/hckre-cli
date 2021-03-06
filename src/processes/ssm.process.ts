import childProcess from 'node:child_process'

import {existsSync} from 'fs-extra'

import {CLI_STORAGE} from '../constants'

const SSMProcess = {
  isLoaded: (): boolean => {
    return existsSync(`${CLI_STORAGE}/session-manager-plugin`)
  },
  spawnSync: (cmdArgs: string): void => {
    childProcess.spawnSync(`${CLI_STORAGE}/session-manager-plugin ${cmdArgs}`, {
      shell: true,
      stdio: 'inherit',
    })
  },
}

export default SSMProcess
