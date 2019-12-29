import { MutationPayload, User } from '@backend/common'

import { RegisterProblemsGqlUnion } from './RegisterProblems'
import { LoginTokensGqlType } from './LoginTokens'

export const {
  MutationPayloadGqlType: RegisterPayloadGqlType,
  MutationPayloadResolver: RegisterPayloadResolver,
} = MutationPayload<User, LoginTokensGqlType>(
  LoginTokensGqlType,
  RegisterProblemsGqlUnion,
  'register',
)
