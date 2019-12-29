import { User, EventInterface } from '@backend/common'
import { RegisterUserCommand } from '../commands/impl'

export class UserRegisteredEvent implements EventInterface {
  constructor(
    public readonly command: RegisterUserCommand,
    public readonly user: User,
  ) {}
}
