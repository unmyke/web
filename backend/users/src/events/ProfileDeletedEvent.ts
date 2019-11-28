import { User, EventInterface } from '@backend/common'
import { DeleteProfileCommand } from '../commands/impl'

export class ProfileDeletedEvent implements EventInterface {
  constructor(
    public readonly command: DeleteProfileCommand,
    public readonly user: User,
  ) {}
}
