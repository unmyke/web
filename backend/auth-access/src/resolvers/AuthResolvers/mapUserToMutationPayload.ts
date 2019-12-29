import { Status, SuccessMutationPayload, User } from '@backend/common'

export const mapUserToMutationPayload = (
  user: User,
): SuccessMutationPayload<User> => {
  return {
    recordId: user.id,
    record: user,
    status: Status.SUCCESS,
    errors: null,
  }
}
