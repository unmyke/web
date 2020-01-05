import { Uuid } from '../../dto'
import { Status } from '../enums'

export type SuccessMutationPayload<Resource> = {
  recordId: Uuid
  record: Resource | null
  status: Status.SUCCESS
  errors: null
}
