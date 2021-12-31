import {CLI_STORAGE} from '../constants'
import AWSProcess from '../processes/aws.process'

import ChildProcess = require('child_process')
import Listr = require('listr')

const installAWSCommandLine = new Listr([
  {
    title: 'Check',
    task: ctx => {
      ctx.foundExistingInstallation = AWSProcess.isLoaded()
    },
  },
  {
    title: 'Download',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'linux',
    task: () => {
      ChildProcess.execSync(
        `curl https://awscli.amazonaws.com/awscli-exe-linux-x86_64-${AWSProcess.version}.zip -o ${CLI_STORAGE}/awscliv2.zip`,
        {cwd: CLI_STORAGE, stdio: 'ignore'},
      )
    },
  },
  {
    title: 'Install',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'linux',
    task: () => {
      ChildProcess.execSync('unzip awscliv2.zip', {cwd: CLI_STORAGE})
      ChildProcess.execSync('./aws/install -i aws-cli -b bin', {cwd: CLI_STORAGE})
    },
  },
  {
    title: 'Clean',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'linux',
    task: () => {
      ChildProcess.execSync('rm -rf awscliv2.zip', {cwd: CLI_STORAGE})
      ChildProcess.execSync('rm -rf aws', {cwd: CLI_STORAGE})
      ChildProcess.execSync('rm -rf bin/aws', {cwd: CLI_STORAGE})
      ChildProcess.execSync('rm -rf bin/aws_completer', {cwd: CLI_STORAGE})
    },
  },
])

export {installAWSCommandLine}
