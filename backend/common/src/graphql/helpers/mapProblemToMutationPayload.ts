import { Status } from '../enums'
import { FailMutationPayload } from '../types'
import { ProblemInterface } from '../interfaces'

export const mapProblemToMutationPayload = <Problem extends ProblemInterface>(
  errors: Problem[],
): FailMutationPayload<Problem> => ({
  recordId: null,
  record: null,
  status: Status.FAIL,
  errors,
})
