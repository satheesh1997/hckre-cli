import childProcess from 'node:child_process'

export const Process = {
  execSync: (command: string): void => {
    childProcess.spawnSync(command, {
      shell: true,
      stdio: 'inherit',
    })
  },
}
