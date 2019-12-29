import { createUnionType } from 'type-graphql'

import { ValidationProblemGqlType, ServerProblemGqlType } from '@backend/common'
import {
  UserWithEmailExistsProblemGqlType,
  PasswordMismatchProblemGqlType,
} from './problems'

export const RegisterProblemsGqlUnion = createUnionType({
  name: 'RegisterProblems',
  types: () => [
    UserWithEmailExistsProblemGqlType,
    PasswordMismatchProblemGqlType,
    ValidationProblemGqlType,
    ServerProblemGqlType,
  ],
})
