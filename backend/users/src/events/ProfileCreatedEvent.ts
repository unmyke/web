import { User, EventInterface } from '@backend/common'
import { CreateProfileCommand } from '../commands/impl'

export class ProfileCreatedEvent implements EventInterface {
  constructor(
    public readonly command: CreateProfileCommand,
    public readonly user: User,
  ) {}
}
