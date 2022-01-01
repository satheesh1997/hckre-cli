import childProcess from 'node:child_process'

import {existsSync} from 'fs-extra'

import {CLI_STORAGE} from '../constants'
import {printUnsupportedPlatformError} from '../messages/error.messages'

const AWSProcess = {
  version: '2.4.7',
  isLoaded: (): boolean => {
    switch (process.platform) {
      case 'linux':
        return existsSync(`${CLI_STORAGE}/aws-cli/v2/bin/aws`)
      case 'darwin':
        if (existsSync(`${CLI_STORAGE}/aws-cli/aws`)) {
          const version = childProcess.execSync(`${CLI_STORAGE}/aws-cli/aws --version`).toString()
          return version.search(`aws-cli/${AWSProcess.version}`) >= 0
        }

        return false
      default:
        printUnsupportedPlatformError()
        throw new Error('Not supported')
    }
  },
  execSync: (command: string, options: childProcess.ExecSyncOptionsWithStringEncoding): string => {
    switch (process.platform) {
      case 'linux':
        return childProcess.execSync(`${CLI_STORAGE}/aws-cli/v2/bin/aws ${command}`, options)
      case 'darwin':
        return childProcess.execSync(`${CLI_STORAGE}/aws-cli/aws  ${command}`, options)
      default:
        printUnsupportedPlatformError()
        throw new Error('Not supported')
    }
  },
}

export default AWSProcess
