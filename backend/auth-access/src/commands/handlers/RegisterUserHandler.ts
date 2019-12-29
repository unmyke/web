import uuidv4 from 'uuid/v4'
import bcrypt from 'bcrypt'
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs'

import { User, UserExistsError } from '@backend/common'
import { RegisterUserCommand } from '../impl'
import { UserRegisteredEvent } from '../../events'

import { UserService } from '@backend/users'

import { PasswordMismatchError, RegisterUserErrors } from '../../errors'
import { RegisterUserFailedEvent } from '../../events/RegisterUserFailedEvent'

const SALT_ROUNDS = 10

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userService: UserService,
  ) {}

  execute(command: RegisterUserCommand): Promise<RegisterUserCommand> {
    const { email, password, passwordConfirmation } = command

    const publishSuccess = (user: User) =>
      this.eventBus.publish(new UserRegisteredEvent(command, user))
    const publishFailure = (error: RegisterUserErrors) =>
      this.eventBus.publish(new RegisterUserFailedEvent(command, error))

    return new Promise((resolve, reject) => {
      if (password !== passwordConfirmation) {
        return publishFailure(new PasswordMismatchError())
      }
      return this.userService
        .userExistByEmail(email)
        .then((userExists: boolean): void => {
          if (userExists) {
            return publishFailure(new UserExistsError())
          } else {
            bcrypt
              .hash(password, SALT_ROUNDS)
              .then((passwordHash: string): void => {
                this.userService
                  .createUser({
                    id: uuidv4(),
                    email,
                    password: passwordHash,
                  })
                  .then((user: User): void => {
                    return publishSuccess(user)
                  })
              })
          }
        })
    }).then((): RegisterUserCommand => command)
  }
}
