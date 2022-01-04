export interface IAppConfigurationCommand {
  build: string[]
  test: string[]
  start: string[]
  deploy: string[]
}

export interface IAppConfiguration {
  name: string
  repository: string
  environmentCommands: {
    local: IAppConfigurationCommand
    production: IAppConfigurationCommand
    staging: IAppConfigurationCommand
  }
  commands: {[key: string]: [value: string]}

  save(): void
}
