import { QueryBus } from '@nestjs/cqrs'
import { GetUserQuery, GetUsersQuery } from '../queries/impl'

import { Query, Resolver, Args } from '@nestjs/graphql'
import {
  AuthAccess,
  ResourceAccess,
  UserContext,
  CurrentUser,
  scalarToPrimitive,
} from '@backend/common'

import { ProfileGqlType, ProfileListGqlType, UserIdGqlArg } from './schema'

import { readProfilePermission } from './permissions'
import { User } from '@backend/common'
import { UserWithProfile, UserContextWithProfile } from '../types'

@Resolver()
export class ProfileQueries {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(returns => ProfileGqlType, { name: 'profile', nullable: true })
  @AuthAccess()
  @ResourceAccess(readProfilePermission)
  getUser(
    @Args() { userId: userIdScalar }: UserIdGqlArg,
    @CurrentUser() userContext: UserContext,
  ): Promise<UserWithProfile | UserContextWithProfile | null> {
    const id = scalarToPrimitive(userIdScalar)

    if (userContext && id === userContext.id) {
      return Promise.resolve(
        userContext.profile ? (userContext as UserContextWithProfile) : null,
      )
    }

    return this.queryBus
      .execute(new GetUserQuery(id))
      .then((user: User) => (user.profile ? (user as UserWithProfile) : null))
  }

  @Query(returns => ProfileListGqlType, { name: 'profiles' })
  @ResourceAccess(readProfilePermission)
  getUsers(): Promise<User[]> {
    return this.queryBus
      .execute(new GetUsersQuery())
      .then((users: User[]) => users.filter(({ profile }: User) => !!profile))
  }
}
