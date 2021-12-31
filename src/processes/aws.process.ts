import {existsSync} from 'fs-extra'

import {CLI_STORAGE} from '../constants'
import {printUnsupportedPlatformError} from '../messages/error.messages'

import ChildProcess = require('child_process')

const AWSProcess = {
  version: '2.4.7',
  isLoaded: (): boolean => {
    switch (process.platform) {
      case 'linux':
        return existsSync(`${CLI_STORAGE}/aws-cli/v2/${AWSProcess.version}/bin/aws`)
      case 'darwin':
        if (existsSync(`${CLI_STORAGE}/aws-cli/aws`)) {
          const version = ChildProcess.execSync(`${CLI_STORAGE}/aws-cli/aws --version`).toString()
          return version.search(`aws-cli/${AWSProcess.version}`) >= 0
        }

        return false
      default:
        printUnsupportedPlatformError()
        throw new Error('Not supported')
    }
  },
  execSync: (command: string, options: ChildProcess.ExecSyncOptionsWithStringEncoding): string => {
    switch (process.platform) {
      case 'linux':
        return ChildProcess.execSync(`${CLI_STORAGE}/aws-cli/v2/${AWSProcess.version}/bin/aws ${command}`, options)
      case 'darwin':
        return ChildProcess.execSync(`${CLI_STORAGE}/aws-cli/aws  ${command}`, options)
      default:
        printUnsupportedPlatformError()
        throw new Error('Not supported')
    }
  },
}

export default AWSProcess
