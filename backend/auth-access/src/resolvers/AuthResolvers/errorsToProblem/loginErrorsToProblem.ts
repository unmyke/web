import {
  getErrorToProblemMapper,
  getInputToProblemMapper,
} from '@backend/common'

import { LoginGqlInput } from '../../schema'

import {
  UserWithEmailNotFoundProblemGqlType,
  PasswordMismatchProblemGqlType,
} from '../../schema'
import { getEmail } from './getEmail'

const UserNotFoundMapper = getInputToProblemMapper(
  UserWithEmailNotFoundProblemGqlType,
  getEmail,
)

const PasswordMismatchMapper = getInputToProblemMapper(
  PasswordMismatchProblemGqlType,
  (_: LoginGqlInput) => ({}),
)

export const loginErrorsToProblem = getErrorToProblemMapper([
  UserNotFoundMapper,
  PasswordMismatchMapper,
])
