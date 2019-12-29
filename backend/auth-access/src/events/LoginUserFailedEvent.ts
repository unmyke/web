import { FailCommandEventInterface } from '@backend/common'

import { LoginUserErrors } from '../errors'
import { LoginUserCommand } from '../commands/impl'

export class LoginUserFailedEvent implements FailCommandEventInterface {
  constructor(
    public readonly command: LoginUserCommand,
    public readonly error: LoginUserErrors,
  ) {}
}
