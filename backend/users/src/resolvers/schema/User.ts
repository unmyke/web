// tslint:disable: member-ordering
import { ObjectType, Field, Root } from 'type-graphql'

import {
  EmailGqlScalar,
  UuidGqlScalar,
  User,
  UserContext,
  uuidToScalar,
  emailToScalar,
} from '@backend/common'
import { ProfileGqlType } from './Profile'

@ObjectType('User', { description: 'Representation of site user.' })
export class UserGqlType {
  @Field({ name: 'id' })
  getIdScalar(@Root() { id }: User | UserContext): UuidGqlScalar {
    const uuidScalar = uuidToScalar(id)
    return uuidScalar
  }

  @Field({ name: 'email' })
  getEmailScalar(@Root() { email }: User | UserContext): EmailGqlScalar {
    return emailToScalar(email)
  }

  @Field(type => ProfileGqlType, { name: 'profile', nullable: true })
  getProfile(@Root() user: User | UserContext): User | UserContext | null {
    return user.profile ? user : null
  }

  @Field({ nullable: true })
  lastLoginAt: Date
}
