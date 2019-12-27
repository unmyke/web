import { DeleteMutationPayload, User } from '@backend/common'

import { ProfileGqlType } from './Profile'
import { DeleteProfileProblemsGqlUnion } from './DeleteProfileProblems'

export const {
  MutationPayloadGqlType: DeleteProfilePayloadGqlType,
  MutationPayloadResolver: DeleteProfilePayloadResolver,
} = DeleteMutationPayload<User, ProfileGqlType>(
  ProfileGqlType,
  DeleteProfileProblemsGqlUnion,
)
