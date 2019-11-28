import { FailCommandEventInterface } from '@backend/common'

import { UpdateProfileErrors } from '../errors'
import { UpdateProfileCommand } from '../commands/impl'

export class UpdateProfileFailedEvent implements FailCommandEventInterface {
  constructor(
    public readonly command: UpdateProfileCommand,
    public readonly error: UpdateProfileErrors,
  ) {}
}
