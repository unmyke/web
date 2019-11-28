import { User, EventInterface } from '@backend/common'
import { UpdateProfileCommand } from '../commands/impl'

export class ProfileUpdatedEvent implements EventInterface {
  constructor(
    public readonly command: UpdateProfileCommand,
    public readonly user: User,
  ) {}
}
