import { BaseCommand, Email } from '@backend/common'

export class LoginUserCommand extends BaseCommand {
  constructor(public readonly email: Email, public readonly password: string) {
    super()
  }
}
