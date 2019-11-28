import { FailCommandEventInterface } from '@backend/common'

import { CreateProfileErrors } from '../errors'
import { CreateProfileCommand } from '../commands/impl'

export class CreateProfileFailedEvent implements FailCommandEventInterface {
  constructor(
    public readonly command: CreateProfileCommand,
    public readonly error: CreateProfileErrors,
  ) {}
}
