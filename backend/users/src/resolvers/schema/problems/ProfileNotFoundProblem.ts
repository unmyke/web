import { Field, ObjectType } from 'type-graphql'
import { ProblemInterface, UuidGqlScalar, MapToError } from '@backend/common'
import { ProfileNotFoundError } from '../../../errors'

@ObjectType('ProfileNotFoundProblem', {
  implements: ProblemInterface,
  description: 'User with passed userId has no profile',
})
@MapToError(ProfileNotFoundError)
export class ProfileNotFoundProblemGqlType implements ProblemInterface {
  get message() {
    return `User with id ${this.userId.value as string} has no profile.`
  }

  @Field()
  userId: UuidGqlScalar
}
