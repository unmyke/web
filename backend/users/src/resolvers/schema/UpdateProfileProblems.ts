import { createUnionType } from 'type-graphql'

import {
  UserNotFoundProblemGqlType,
  ValidationProblemGqlType,
  ServerProblemGqlType,
} from '@backend/common'
import { ProfileNotFoundProblemGqlType } from './problems'

export const UpdateProfileProblemsGqlUnion = createUnionType({
  name: 'UpdateProfileProblems',
  types: () => [
    UserNotFoundProblemGqlType,
    ProfileNotFoundProblemGqlType,
    ValidationProblemGqlType,
    ServerProblemGqlType,
  ],
})
