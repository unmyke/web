import { createUnionType } from 'type-graphql'

import { ValidationProblemGqlType, ServerProblemGqlType } from '@backend/common'
import {
  PasswordMismatchProblemGqlType,
  UserWithEmailNotFoundProblemGqlType,
} from './problems'

export const LoginProblemsGqlUnion = createUnionType({
  name: 'LoginProblems',
  types: () => [
    UserWithEmailNotFoundProblemGqlType,
    PasswordMismatchProblemGqlType,
    ValidationProblemGqlType,
    ServerProblemGqlType,
  ],
})
