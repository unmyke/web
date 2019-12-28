import { ObjectType, Field, Root } from 'type-graphql'

import { UserGqlType } from './User'
import { UserWithProfile, UserContextWithProfile } from '../../types'
import { UuidGqlScalar, uuidToScalar } from '@backend/common'

@ObjectType('Profile', { description: "Representation of user's profile" })
export class ProfileGqlType {
  @Field({ name: 'userId' })
  getUserId(
    @Root() user: UserWithProfile | UserContextWithProfile,
  ): UuidGqlScalar {
    const { id } = user
    const uuidScalar = uuidToScalar(id)
    return uuidScalar
  }

  @Field({ name: 'firstName' })
  getFirstName(@Root() user: UserWithProfile | UserContextWithProfile): string {
    const { profile } = user
    return profile.firstName
  }

  @Field({ name: 'lastName' })
  getLastName(@Root() user: UserWithProfile | UserContextWithProfile): string {
    const { profile } = user
    return profile.lastName
  }

  @Field(type => UserGqlType, { name: 'user' })
  getUser(
    @Root() user: UserWithProfile | UserContextWithProfile,
  ): UserWithProfile | UserContextWithProfile {
    return user
  }
}
