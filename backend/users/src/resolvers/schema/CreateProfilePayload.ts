import { CreateMutationPayload, User } from '@backend/common'

import { ProfileGqlType } from './Profile'
import { CreateProfileProblemsGqlUnion } from './CreateProfileProblems'

export const {
  MutationPayloadGqlType: CreateProfilePayloadGqlType,
  MutationPayloadResolver: CreateProfilePayloadResolver,
} = CreateMutationPayload<User, ProfileGqlType>(
  ProfileGqlType,
  CreateProfileProblemsGqlUnion,
)
