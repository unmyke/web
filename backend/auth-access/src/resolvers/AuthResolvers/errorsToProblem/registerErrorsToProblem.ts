import {
  getErrorToProblemMapper,
  getInputToProblemMapper,
} from '@backend/common'

import { RegisterGqlInput } from '../../schema'

import {
  UserWithEmailExistsProblemGqlType,
  PasswordMismatchProblemGqlType,
} from '../../schema'
import { getEmail } from './getEmail'

const UserNotFoundMapper = getInputToProblemMapper(
  UserWithEmailExistsProblemGqlType,
  getEmail,
)

const PasswordMismatchMapper = getInputToProblemMapper(
  PasswordMismatchProblemGqlType,
  (_: RegisterGqlInput) => ({}),
)

export const registerErrorsToProblem = getErrorToProblemMapper([
  UserNotFoundMapper,
  PasswordMismatchMapper,
])
