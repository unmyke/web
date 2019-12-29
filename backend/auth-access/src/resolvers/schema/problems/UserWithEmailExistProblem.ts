import { ObjectType, Field } from 'type-graphql'
import { ProblemInterface, MapToError, EmailGqlScalar } from '@backend/common'
import { UserExistsError } from '@backend/common'

@ObjectType('UserWithEmailExistsProblem', {
  implements: ProblemInterface,
  description: 'User with passed email already exists',
})
@MapToError(UserExistsError)
export class UserWithEmailExistsProblemGqlType implements ProblemInterface {
  @Field()
  email: EmailGqlScalar

  get message() {
    return `User with email '${this.email.value as string}' already exists.`
  }
}
