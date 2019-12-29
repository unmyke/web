import { BaseCommand, Email } from '@backend/common'

export class RegisterUserCommand extends BaseCommand {
  constructor(
    public readonly email: Email,
    public readonly password: string,
    public readonly passwordConfirmation: string,
  ) {
    super()
  }
}
