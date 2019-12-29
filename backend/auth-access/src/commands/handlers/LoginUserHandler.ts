import bcrypt from 'bcrypt'

import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs'
import { LoginUserCommand } from '../impl'
import { UserLoginedEvent } from '../../events'

import { UserService } from '@backend/users'

import { User, UserNotFoundError } from '@backend/common'
import { PasswordMismatchError } from '../../errors'
import { LoginUserFailedEvent } from '../../events/LoginUserFailedEvent'

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userService: UserService,
  ) {}

  execute(command: LoginUserCommand): Promise<LoginUserCommand> {
    const { email, password } = command

    return this.userService
      .getUserByEmail(email)
      .then(
        (user: User): void => {
          return bcrypt
            .compare(password, user.password)
            .then((passwordMatches: boolean): void => {
              if (!passwordMatches) {
                this.eventBus.publish(
                  new LoginUserFailedEvent(
                    command,
                    new PasswordMismatchError(),
                  ),
                )
              } else {
                this.userService
                  .updateLastLoginAt(user.id)
                  .then((updatedUser: User): void => {
                    this.eventBus.publish(
                      new UserLoginedEvent(command, updatedUser),
                    )
                  })
              }
            })
        },
        (error: Error): void => {
          if (error instanceof UserNotFoundError) {
            this.eventBus.publish(new LoginUserFailedEvent(command, error))
          } else {
            throw error
          }
        },
      )
      .then((): LoginUserCommand => command)
  }
}
