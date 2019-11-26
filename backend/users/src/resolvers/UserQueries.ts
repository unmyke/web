import { Query, Resolver, Args } from '@nestjs/graphql'
import { User, UserContext, scalarToPrimitive } from '@backend/common'
import { UserGqlType, UserListGqlType, IdGqlArg } from './schema'

import { CurrentUser, AuthAccess, ResourceAccess } from '@backend/common'
import { readUserPermission } from './permissions'

import { QueryBus } from '@nestjs/cqrs'
import { GetUserQuery, GetUsersQuery } from '../queries/impl'

@Resolver()
export class UserQueries {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(returns => UserGqlType, { name: 'me' })
  @AuthAccess()
  getCurrentUser(
    @CurrentUser() userContext: UserContext,
  ): Promise<UserContext> {
    return Promise.resolve(userContext)
  }

  @Query(returns => UserGqlType, { name: 'user', nullable: true })
  @AuthAccess()
  @ResourceAccess(readUserPermission)
  getUser(
    @Args() { id: idScalar }: IdGqlArg,
    @CurrentUser() userContext: UserContext,
  ): Promise<User | UserContext> {
    const id = scalarToPrimitive(idScalar)
    return userContext && id === userContext.id
      ? Promise.resolve(userContext)
      : this.queryBus.execute(new GetUserQuery(id)).then(
          (user: User): User => {
            return user
          },
        )
  }

  @Query(returns => UserListGqlType, { name: 'users' })
  @AuthAccess()
  @ResourceAccess(readUserPermission)
  getUsers(): Promise<User[]> {
    return this.queryBus
      .execute(new GetUsersQuery())
      .then((users: User[]): User[] => {
        return users
      })
  }
}
