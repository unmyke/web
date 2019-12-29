import { Observable } from 'rxjs'
import { Resolver, Mutation, Args } from '@nestjs/graphql'

import { CommandBus, EventBus } from '@nestjs/cqrs'
import { LoginUserCommand, RegisterUserCommand } from '../../commands/impl'

import {
  User,
  SuccessMutationPayload,
  FailMutationPayload,
  ResolverObservableHandler,
  getResolverObservable,
  scalarToPrimitive,
} from '@backend/common'

import {
  LoginGqlInput,
  RegisterGqlInput,
  LoginPayloadGqlType,
  LoginProblemsGqlUnion,
  RegisterPayloadGqlType,
  RegisterProblemsGqlUnion,
} from '../schema'

import { UserRegisteredEvent } from '../../events'
import { mapUserToMutationPayload } from './mapUserToMutationPayload'
import {
  registerErrorsToProblem,
  loginErrorsToProblem,
} from './errorsToProblem'

@Resolver()
export class AuthResolvers {
  resolverObservable: ResolverObservableHandler

  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
  ) {
    this.resolverObservable = getResolverObservable({
      eventBus: this.eventBus,
      commandBus: this.commandBus,
    })
  }

  @Mutation(returns => RegisterPayloadGqlType, { name: 'register' })
  registerUser(
    @Args('input')
    input: RegisterGqlInput,
  ): Observable<
    | SuccessMutationPayload<User>
    | FailMutationPayload<typeof RegisterProblemsGqlUnion>
  > {
    const { email: emailScalar, password, passwordConfirmation } = input
    const email = scalarToPrimitive(emailScalar)
    const command = new RegisterUserCommand(
      email,
      password,
      passwordConfirmation,
    )

    return this.resolverObservable({
      InputCtor: RegisterGqlInput,
      input,
      eventToPayload: ({
        user,
      }: UserRegisteredEvent): SuccessMutationPayload<User> => {
        return mapUserToMutationPayload(user)
      },
      command,
      errorsToProblem: registerErrorsToProblem,
    })
  }

  @Mutation(returns => LoginPayloadGqlType, { name: 'login' })
  getLoginTokens(
    @Args('input')
    input: LoginGqlInput,
  ): Observable<
    | SuccessMutationPayload<User>
    | FailMutationPayload<typeof LoginProblemsGqlUnion>
  > {
    const { email: emailScalar, password } = input
    const email = scalarToPrimitive(emailScalar)
    const command = new LoginUserCommand(email, password)

    return this.resolverObservable({
      InputCtor: LoginGqlInput,
      input,
      eventToPayload: ({
        user,
      }: UserRegisteredEvent): SuccessMutationPayload<User> => {
        return mapUserToMutationPayload(user)
      },
      command,
      errorsToProblem: loginErrorsToProblem,
    })
  }
}
