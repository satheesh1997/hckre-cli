import {existsSync} from 'fs-extra'

import {CLI_STORAGE} from '../constants'

import ChildProcess = require('child_process')

const AWSProcess = {
  version: '2.4.7',
  isLoaded: (): boolean => {
    return existsSync(`${CLI_STORAGE}/aws-cli/v2/${AWSProcess.version}/bin/aws`)
  },
  execSync: (command: string): string => {
    return ChildProcess.execSync(`${CLI_STORAGE}/aws-cli/v2/${AWSProcess.version}/bin/aws ${command}`).toString()
  },
}

export default AWSProcess
