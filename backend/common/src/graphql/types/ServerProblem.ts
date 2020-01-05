import { Field, ObjectType } from 'type-graphql'
import { ProblemInterface } from '../interfaces'

@ObjectType('ServerProblem', {
  implements: ProblemInterface,
  description: 'Internal server error',
})
export class ServerProblemGqlType implements ProblemInterface {
  @Field()
  message: string

  constructor() {
    this.message = 'Unexpected server error'
  }
}
