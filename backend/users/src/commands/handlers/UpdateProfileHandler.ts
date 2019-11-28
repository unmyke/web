import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs'
import { UpdateProfileCommand } from '../impl'
import { ProfileUpdatedEvent, UpdateProfileFailedEvent } from '../../events'

import { UserService } from '../../UserService'

import { UserWithProfile } from '../../types'
import { UpdateProfileErrors } from '../../errors'

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly eventBus: EventBus,
  ) {}

  execute(command: UpdateProfileCommand): Promise<UpdateProfileCommand> {
    const { userId, firstName, lastName } = command
    return this.userService
      .updateProfile(userId, {
        lastName,
        firstName,
      })
      .then(
        (newUser: UserWithProfile): void => {
          this.eventBus.publish(new ProfileUpdatedEvent(command, newUser))
        },
        (error: UpdateProfileErrors): void => {
          this.eventBus.publish(new UpdateProfileFailedEvent(command, error))
        },
      )
      .then((): UpdateProfileCommand => command)
  }
}
