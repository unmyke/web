import { UpdateMutationPayload, User } from '@backend/common'

import { ProfileGqlType } from './Profile'
import { UpdateProfileProblemsGqlUnion } from './UpdateProfileProblems'

export const {
  MutationPayloadGqlType: UpdateProfilePayloadGqlType,
  MutationPayloadResolver: UpdateProfilePayloadResolver,
} = UpdateMutationPayload<User, ProfileGqlType>(
  ProfileGqlType,
  UpdateProfileProblemsGqlUnion,
)
