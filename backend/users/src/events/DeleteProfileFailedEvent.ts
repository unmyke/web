import { FailCommandEventInterface } from '@backend/common'

import { DeleteProfileErrors } from '../errors'
import { DeleteProfileCommand } from '../commands/impl'

export class DeleteProfileFailedEvent implements FailCommandEventInterface {
  constructor(
    public readonly command: DeleteProfileCommand,
    public readonly error: DeleteProfileErrors,
  ) {}
}
