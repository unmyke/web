import { Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { flatMap } from 'rxjs/operators'
import { ICommand, Saga, ofType } from '@nestjs/cqrs'

import { UserRegisteredEvent } from '@backend/auth-access'
import { SendSupportMailCommand, SendUserMailCommand } from '../commands/impl'

@Injectable()
export class RegisterUserSagas {
  @Saga()
  userRegistered = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserRegisteredEvent),
      flatMap(({ user }: UserRegisteredEvent): ICommand[] => [
        new SendSupportMailCommand(user),
        new SendUserMailCommand(user),
      ]),
    )
  }
}
