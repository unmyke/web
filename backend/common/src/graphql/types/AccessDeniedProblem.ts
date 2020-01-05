// tslint:disable: member-ordering
import { ObjectType } from 'type-graphql'
import { ProblemInterface } from '../interfaces'

@ObjectType('AccessDeniedProblem', {
  implements: ProblemInterface,
})
export class AccessDeniedProblemGqlType implements ProblemInterface {
  message = 'Access denied'
}
