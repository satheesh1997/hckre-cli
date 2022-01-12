import {cli} from 'cli-ux'

const editFilePrompt = async (): Promise<boolean> => {
  return cli.confirm('Proceed to edit? [y/n]')
}

export {editFilePrompt}
