import { ObjectType, Field } from 'type-graphql'
import { ProblemInterface, MapToError, EmailGqlScalar } from '@backend/common'
import { UserNotFoundError } from '@backend/common'

@ObjectType('UserWithEmailNotFoundProblem', {
  implements: ProblemInterface,
  description: 'User with passed email not found',
})
@MapToError(UserNotFoundError)
export class UserWithEmailNotFoundProblemGqlType implements ProblemInterface {
  @Field()
  email: EmailGqlScalar

  get message() {
    return `User with email '${this.email.value as string}' not found.`
  }
}
