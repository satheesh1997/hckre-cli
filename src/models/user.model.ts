import IUser from '../interfaces/user.interface'

export default class User implements IUser {
  public name: string
  public email: string
  public businessUnit: string
  public team: string

  constructor(name: string, email: string, businessUnit: string, team: string) {
    this.name = name
    this.email = email
    this.businessUnit = businessUnit
    this.team = team
  }
}
