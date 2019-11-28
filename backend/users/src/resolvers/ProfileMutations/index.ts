import { Args, Mutation, Resolver } from '@nestjs/graphql'
import {
  scalarToPrimitive,
  User,
  SuccessMutationPayload,
  FailMutationPayload,
  ResolverObservableHandler,
} from '@backend/common'

import {
  createProfileErrorsToProblem,
  updateProfileErrorsToProblem,
  deleteProfileErrorsToProblem,
} from './errorsToProblem'

import {
  CreateProfileGqlInput,
  CreateProfilePayloadGqlType,
  CreateProfileProblemsGqlUnion,
  UpdateProfileGqlInput,
  UpdateProfilePayloadGqlType,
  UpdateProfileProblemsGqlUnion,
  DeleteProfileGqlInput,
  DeleteProfilePayloadGqlType,
  DeleteProfileProblemsGqlUnion,
} from '../schema'

import { Observable } from 'rxjs'
import { CommandBus, EventBus } from '@nestjs/cqrs'
import {
  CreateProfileCommand,
  UpdateProfileCommand,
  DeleteProfileCommand,
} from '../../commands/impl'

import { ResourceAccess, AuthAccess } from '@backend/common'

import {
  createProfilePermission,
  updateProfilePermission,
  deleteProfilePermission,
} from '../permissions'

import { mapProfileToMutationPayload } from './mapProfileToMutationPayload'
import {
  ProfileCreatedEvent,
  ProfileUpdatedEvent,
  ProfileDeletedEvent,
} from '../../events'

import { getResolverObservable } from '@backend/common'

@Resolver()
export class ProfileMutations {
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

  @Mutation(returns => CreateProfilePayloadGqlType, { name: 'createProfile' })
  @AuthAccess()
  @ResourceAccess(createProfilePermission)
  createProfile(
    @Args('input')
    input: CreateProfileGqlInput,
  ): Observable<
    | SuccessMutationPayload<User>
    | FailMutationPayload<typeof CreateProfileProblemsGqlUnion>
  > {
    const { userId: userIdScalar, firstName, lastName } = input
    const userId = scalarToPrimitive(userIdScalar)
    const createProfileCommand = new CreateProfileCommand(
      userId,
      firstName,
      lastName,
    )
    return this.resolverObservable({
      InputCtor: CreateProfileGqlInput,
      input,
      command: createProfileCommand,
      eventToPayload: ({
        user,
      }: ProfileCreatedEvent): SuccessMutationPayload<User> => {
        return mapProfileToMutationPayload(user)
      },
      errorsToProblem: createProfileErrorsToProblem,
    })
  }

  @Mutation(returns => UpdateProfilePayloadGqlType, { name: 'updateProfile' })
  @AuthAccess()
  @ResourceAccess(updateProfilePermission)
  updateProfile(
    @Args('input')
    input: UpdateProfileGqlInput,
  ): Observable<
    | SuccessMutationPayload<User>
    | FailMutationPayload<typeof UpdateProfileProblemsGqlUnion>
  > {
    const { userId: userIdScalar, firstName, lastName } = input
    const userId = scalarToPrimitive(userIdScalar)
    const updateProfileCommand = new UpdateProfileCommand(
      userId,
      firstName,
      lastName,
    )

    return this.resolverObservable({
      InputCtor: UpdateProfileGqlInput,
      input,
      command: updateProfileCommand,
      eventToPayload: ({ user }: ProfileUpdatedEvent) =>
        mapProfileToMutationPayload(user),
      errorsToProblem: updateProfileErrorsToProblem,
    })
  }

  @Mutation(returns => DeleteProfilePayloadGqlType, { name: 'deleteProfile' })
  @AuthAccess()
  @ResourceAccess(deleteProfilePermission)
  deleteProfile(
    @Args('input')
    input: DeleteProfileGqlInput,
  ): Observable<
    | SuccessMutationPayload<User>
    | FailMutationPayload<typeof DeleteProfileProblemsGqlUnion>
  > {
    const { userId: userIdScalar } = input
    const userId = scalarToPrimitive(userIdScalar)
    const deleteProfileCommand = new DeleteProfileCommand(userId)

    return this.resolverObservable({
      InputCtor: DeleteProfileGqlInput,
      input,
      command: deleteProfileCommand,
      eventToPayload: ({ user }: ProfileDeletedEvent) =>
        mapProfileToMutationPayload(user),
      errorsToProblem: deleteProfileErrorsToProblem,
    })
  }
}
