import { ObjectType } from 'type-graphql'
import { ProblemInterface, MapToError } from '@backend/common'
import { PasswordMismatchError } from '../../../errors'

@ObjectType('PasswordMismatchProblem', {
  implements: ProblemInterface,
  description: 'Passed password mismatch',
})
@MapToError(PasswordMismatchError)
export class PasswordMismatchProblemGqlType implements ProblemInterface {
  get message() {
    return `Passed password mismatch.`
  }
}
