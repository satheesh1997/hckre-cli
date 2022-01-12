import childProcess from 'node:child_process'

import {cli} from 'cli-ux'
import {exit} from 'node:process'

export const AppConfigurationProcess = {
  editFile: (): void => {
    const editor = process.env.EDITOR || 'vi'
    const pro = childProcess.spawn(editor, ['hckre.json'], {stdio: 'inherit'})
    pro.on('exit', () => {
      cli.info('\nConfiguration file updated!!')
      exit(0)
    })
  },
}
