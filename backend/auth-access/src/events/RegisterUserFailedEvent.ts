import { FailCommandEventInterface } from '@backend/common'

import { RegisterUserErrors } from '../errors'
import { RegisterUserCommand } from '../commands/impl'

export class RegisterUserFailedEvent implements FailCommandEventInterface {
  constructor(
    public readonly command: RegisterUserCommand,
    public readonly error: RegisterUserErrors,
  ) {}
}
