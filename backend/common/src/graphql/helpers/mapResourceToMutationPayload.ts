import { Status } from '../enums'
import { Resource } from '../../dto'
import { SuccessMutationPayload } from '../types'

export const mapResourceToMutationPayload = <Type extends Resource>(
  resource: Type,
): SuccessMutationPayload<Type> => ({
  recordId: resource.id,
  record: resource,
  status: Status.SUCCESS,
  errors: null,
})
