import { createUnionType } from 'type-graphql'

import {
  UserNotFoundProblemGqlType,
  ValidationProblemGqlType,
  ServerProblemGqlType,
} from '@backend/common'
import { ProfileNotFoundProblemGqlType } from './problems'

export const DeleteProfileProblemsGqlUnion = createUnionType({
  name: 'DeleteProfileProblems',
  types: () => [
    UserNotFoundProblemGqlType,
    ProfileNotFoundProblemGqlType,
    ValidationProblemGqlType,
    ServerProblemGqlType,
  ],
})
