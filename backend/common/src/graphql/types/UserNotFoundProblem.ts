import { Field, ObjectType } from 'type-graphql'
import { ProblemInterface } from '../interfaces'
import { UuidGqlScalar } from '../scalars'
import { MapToError } from '../decorators'
import { UserNotFoundError } from '../../errors'

@ObjectType('UserNotFoundProblem', {
  implements: ProblemInterface,
  description: 'User with passed id not exists.',
})
@MapToError(UserNotFoundError)
export class UserNotFoundProblemGqlType implements ProblemInterface {
  get message() {
    return `User with id: ${this.userId.value as string} not found.`
  }

  @Field()
  userId: UuidGqlScalar
}
