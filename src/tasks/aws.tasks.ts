import {CLI_STORAGE, DARWIN_INSTALLER_CHOICES_DATA} from '../constants'
import AWSProcess from '../processes/aws.process'

import ChildProcess = require('child_process')
import Listr = require('listr')
import {existsSync, writeFileSync} from 'fs-extra'

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

const installAWSSSMPlugin = new Listr([
  {
    title: 'Check',
    task: ctx => {
      ctx.foundExistingInstallation = existsSync(`${CLI_STORAGE}/session-manager-plugin`)
    },
  },
  {
    title: 'Copy',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'linux',
    task: () => {
      ChildProcess.execSync(
        'curl https://hckre-cli.s3.ap-south-1.amazonaws.com/assets/linux-amd64-session-manager-plugin -o session-manager-plugin',
        {
          cwd: CLI_STORAGE,
          stdio: 'ignore',
        },
      )
    },
  },
  {
    title: 'Download',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'darwin',
    task: () => {
      ChildProcess.execSync(
        'curl https://s3.amazonaws.com/session-manager-downloads/plugin/latest/mac/sessionmanager-bundle.zip',
        {
          cwd: CLI_STORAGE,
          stdio: 'ignore',
        },
      )
    },
  },
  {
    title: 'Install',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'darwin',
    task: () => {
      ChildProcess.execSync('unzip sessionmanager-bundle.zip', {cwd: CLI_STORAGE})
      ChildProcess.execSync('./sessionmanager-bundle/install -i ./sessionmanagerplugin -b ./session-manager-plugin', {
        cwd: CLI_STORAGE,
      })
    },
  },
  {
    title: 'Clean',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'darwin',
    task: () => {
      ChildProcess.execSync('rm -rf sessionmanager-bundle.zip', {cwd: CLI_STORAGE})
      ChildProcess.execSync('rm -rf sessionmanager-bundle', {cwd: CLI_STORAGE})
    },
  },
])

export {installAWSCommandLine, installAWSSSMPlugin}
