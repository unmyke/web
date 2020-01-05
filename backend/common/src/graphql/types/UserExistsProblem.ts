import { Field, ObjectType } from 'type-graphql'
import { ProblemInterface } from '../interfaces'
import { UuidGqlScalar } from '../scalars'
import { MapToError } from '../decorators'
import { UserExistsError } from '../../errors'

@ObjectType('UserExistsProblem', {
  implements: ProblemInterface,
  description: 'User with passed id exists.',
})
@MapToError(UserExistsError)
export class UserExistsProblemGqlType implements ProblemInterface {
  get message() {
    return `User with id: ${this.userId.value as string} already exists.`
  }

  @Field()
  userId: UuidGqlScalar
}
