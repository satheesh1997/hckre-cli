import childProcess from 'node:child_process'

import {existsSync, writeFileSync} from 'fs-extra'
import {ListrTask} from 'listr2'

import {CLI_STORAGE, DARWIN_INSTALLER_CHOICES_DATA} from '../constants'
import AWSProcess from '../processes/aws.process'

interface AWSTaskCtx {
  foundExistingInstallation: boolean
}

const installAWSCommandLine: ListrTask[] = [
  {
    title: 'Check',
    task: (ctx: AWSTaskCtx): void => {
      ctx.foundExistingInstallation = AWSProcess.isLoaded()
    },
  },
  {
    title: 'Download',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'linux',
    task: (): void => {
      childProcess.execSync(
        `curl https://awscli.amazonaws.com/awscli-exe-linux-x86_64-${AWSProcess.version}.zip -o ${CLI_STORAGE}/awscliv2.zip`,
        {cwd: CLI_STORAGE, stdio: 'ignore'},
      )
    },
  },
  {
    title: 'Download',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'darwin',
    task: (): void => {
      childProcess.execSync(`curl https://awscli.amazonaws.com/AWSCLIV2-${AWSProcess.version}.pkg -o AWSCLIV2.pkg`, {
        cwd: CLI_STORAGE,
        stdio: 'ignore',
      })
    },
  },
  {
    title: 'Install',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'linux',
    task: (): void => {
      childProcess.execSync('unzip awscliv2.zip', {cwd: CLI_STORAGE})
      childProcess.execSync('./aws/install -i aws-cli -b bin', {cwd: CLI_STORAGE})

      if (
        !existsSync(`${CLI_STORAGE}/aws-cli/v2/bin/aws`) &&
        existsSync(`${CLI_STORAGE}/aws-cli/v2/${AWSProcess.version}/bin/aws`)
      ) {
        childProcess.execSync(`mkdir ${CLI_STORAGE}/aws-cli/v2/bin`, {
          cwd: CLI_STORAGE,
        })
        childProcess.execSync(
          `ln -sf ${CLI_STORAGE}/aws-cli/v2/${AWSProcess.version}/bin/aws ${CLI_STORAGE}/aws-cli/v2/bin/aws`,
          {
            cwd: CLI_STORAGE,
          },
        )
      }
    },
  },
  {
    title: 'Install',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'darwin',
    task: (): void => {
      writeFileSync(`${CLI_STORAGE}/choices.xml`, DARWIN_INSTALLER_CHOICES_DATA)
      childProcess.execSync(
        'installer -pkg AWSCLIV2.pkg -target CurrentUserHomeDirectory -applyChoiceChangesXML choices.xml',
        {cwd: CLI_STORAGE},
      )
    },
  },
  {
    title: 'Clean',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'linux',
    task: (): void => {
      childProcess.execSync('rm -rf awscliv2.zip', {cwd: CLI_STORAGE})
      childProcess.execSync('rm -rf aws', {cwd: CLI_STORAGE})
      childProcess.execSync('rm -rf bin/aws', {cwd: CLI_STORAGE})
      childProcess.execSync('rm -rf bin/aws_completer', {cwd: CLI_STORAGE})
    },
  },
  {
    title: 'Clean',
    enabled: ctx => !ctx.foundExistingInstallation && process.platform === 'darwin',
    task: (): void => {
      childProcess.execSync('rm -rf AWSCLIV2.pkg', {cwd: CLI_STORAGE})
      childProcess.execSync('rm -rf choices.xml', {cwd: CLI_STORAGE})
    },
  },
]

const installAWSSSMPlugin: ListrTask[] = [
  {
    title: 'Check',
    task: (ctx: AWSTaskCtx): void => {
      ctx.foundExistingInstallation = existsSync(`${CLI_STORAGE}/session-manager-plugin`)
    },
  },
  {
    title: 'Copy',
    enabled: (ctx: AWSTaskCtx): boolean => !ctx.foundExistingInstallation && process.platform === 'linux',
    task: (): void => {
      childProcess.execSync(
        'curl https://hckre-cli.s3.ap-south-1.amazonaws.com/assets/linux-amd64-session-manager-plugin -o session-manager-plugin',
        {
          cwd: CLI_STORAGE,
          stdio: 'ignore',
        },
      )
      childProcess.execSync('chmod +x session-manager-plugin', {
        cwd: CLI_STORAGE,
        stdio: 'ignore',
      })
    },
  },
  {
    title: 'Download',
    enabled: (ctx: AWSTaskCtx): boolean => !ctx.foundExistingInstallation && process.platform === 'darwin',
    task: (): void => {
      childProcess.execSync(
        'curl https://s3.amazonaws.com/session-manager-downloads/plugin/latest/mac/sessionmanager-bundle.zip -o sessionmanager-bundle.zip',
        {
          cwd: CLI_STORAGE,
          stdio: 'ignore',
        },
      )
    },
  },
  {
    title: 'Install',
    enabled: (ctx: AWSTaskCtx): boolean => !ctx.foundExistingInstallation && process.platform === 'darwin',
    task: (): void => {
      childProcess.execSync('unzip sessionmanager-bundle.zip', {cwd: CLI_STORAGE})
      childProcess.execSync('./sessionmanager-bundle/install -i ./sessionmanagerplugin -b ./session-manager-plugin', {
        cwd: CLI_STORAGE,
      })
    },
  },
  {
    title: 'Clean',
    enabled: (ctx: AWSTaskCtx): boolean => !ctx.foundExistingInstallation && process.platform === 'darwin',
    task: (): void => {
      childProcess.execSync('rm -rf sessionmanager-bundle.zip', {cwd: CLI_STORAGE})
      childProcess.execSync('rm -rf sessionmanager-bundle', {cwd: CLI_STORAGE})
    },
  },
]

export {installAWSCommandLine, installAWSSSMPlugin}
