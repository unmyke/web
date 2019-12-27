import { createUnionType } from 'type-graphql'

import {
  UserNotFoundProblemGqlType,
  ValidationProblemGqlType,
  ServerProblemGqlType,
} from '@backend/common'
import { ProfileExistsProblemGqlType } from './problems'

export const CreateProfileProblemsGqlUnion = createUnionType({
  name: 'CreateProfileProblems',
  types: () => [
    UserNotFoundProblemGqlType,
    ProfileExistsProblemGqlType,
    ValidationProblemGqlType,
    ServerProblemGqlType,
  ],
})
