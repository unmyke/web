import { MutationPayload, User } from '@backend/common'

import { LoginProblemsGqlUnion } from './LoginProblems'
import { LoginTokensGqlType } from './LoginTokens'

export const {
  MutationPayloadGqlType: LoginPayloadGqlType,
  MutationPayloadResolver: LoginPayloadResolver,
} = MutationPayload<User, LoginTokensGqlType>(
  LoginTokensGqlType,
  LoginProblemsGqlUnion,
  'login',
)
