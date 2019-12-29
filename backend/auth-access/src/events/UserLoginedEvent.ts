import { User, EventInterface } from '@backend/common'
import { LoginUserCommand } from '../commands/impl'

export class UserLoginedEvent implements EventInterface {
  constructor(
    public readonly command: LoginUserCommand,
    public readonly user: User,
  ) {}
}
