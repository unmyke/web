import { Field, ObjectType } from 'type-graphql'
import { ProblemInterface, UuidGqlScalar, MapToError } from '@backend/common'
import { ProfileExistsError } from '../../../errors'

@ObjectType('ProfileExistsProblem', {
  implements: ProblemInterface,
  description: 'User with passed userId already has profile',
})
@MapToError(ProfileExistsError)
export class ProfileExistsProblemGqlType implements ProblemInterface {
  get message() {
    return `User with id ${this.userId.value as string} already has profile.`
  }

  @Field()
  userId: UuidGqlScalar
}
