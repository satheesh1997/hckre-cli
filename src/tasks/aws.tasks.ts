import {CLI_STORAGE, DARWIN_INSTALLER_CHOICES_DATA} from '../constants'
import AWSProcess from '../processes/aws.process'

import ChildProcess = require('child_process')
import Listr = require('listr')
import {writeFileSync} from 'fs-extra'

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
    title: 'Download',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'darwin',
    task: () => {
      ChildProcess.execSync(`curl https://awscli.amazonaws.com/AWSCLIV2-${AWSProcess.version}.pkg -o AWSCLIV2.pkg`, {
        cwd: CLI_STORAGE,
        stdio: 'ignore',
      })
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
    title: 'Install',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'darwin',
    task: () => {
      writeFileSync(`${CLI_STORAGE}/choices.xml`, DARWIN_INSTALLER_CHOICES_DATA)
      ChildProcess.execSync(
        'installer -pkg AWSCLIV2.pkg -target CurrentUserHomeDirectory -applyChoiceChangesXML choices.xml',
        {cwd: CLI_STORAGE},
      )
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
  {
    title: 'Clean',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'darwin',
    task: () => {
      ChildProcess.execSync('rm -rf AWSCLIV2.pkg', {cwd: CLI_STORAGE})
      ChildProcess.execSync('rm -rf choices.xml', {cwd: CLI_STORAGE})
    },
  },
])

export {installAWSCommandLine}
