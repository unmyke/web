import { Status } from '../enums'
import { ProblemInterface } from '../interfaces'
import { ServerProblemGqlType } from '../types'

export type FailMutationPayload<ProblemUnion extends ProblemInterface> = {
  recordId: null
  record: null
  status: Status.FAIL
  errors: Array<ProblemUnion | ServerProblemGqlType>
}
