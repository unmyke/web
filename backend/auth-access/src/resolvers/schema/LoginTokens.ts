import { ObjectType, Field, Root } from 'type-graphql'

import { UserContext, User, userToUserContext } from '@backend/common'

@ObjectType('LoginTokens', { description: 'Authorization tokens' })
export class LoginTokensGqlType {
  @Field({ name: 'accessToken', nullable: true })
  getAccessToken(@Root() user: User): UserContext {
    return userToUserContext(user)
  }
}
