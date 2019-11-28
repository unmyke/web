import {
  Status,
  SuccessMutationPayload,
  mapResourceToMutationPayload,
  User,
} from '@backend/common'

export const mapProfileToMutationPayload = (
  user: User,
): SuccessMutationPayload<User> => {
  if (user.profile) {
    return mapResourceToMutationPayload(user)
  }
  return {
    recordId: user.id,
    record: null,
    status: Status.SUCCESS,
    errors: null,
  }
}
