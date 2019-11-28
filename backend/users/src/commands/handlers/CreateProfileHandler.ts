import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs'
import { CreateProfileCommand } from '../impl'
import { ProfileCreatedEvent, CreateProfileFailedEvent } from '../../events'

import { UserWithProfile } from '../../types'

import { UserService } from '../../UserService'

import { CreateProfileErrors } from '../../errors'

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
  implements ICommandHandler<CreateProfileCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly eventBus: EventBus,
  ) {}

  execute(command: CreateProfileCommand): Promise<CreateProfileCommand> {
    const { userId, firstName, lastName } = command
    return this.userService
      .createProfile(userId, {
        lastName,
        firstName,
      })
      .then(
        (newUser: UserWithProfile): void => {
          this.eventBus.publish(new ProfileCreatedEvent(command, newUser))
        },
        (error: CreateProfileErrors): void => {
          this.eventBus.publish(new CreateProfileFailedEvent(command, error))
        },
      )
      .then((): CreateProfileCommand => command)
  }
}
