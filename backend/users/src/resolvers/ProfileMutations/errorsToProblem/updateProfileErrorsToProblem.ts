import {
  getErrorToProblemMapper,
  getInputToProblemMapper,
} from '@backend/common'

import { getUserId } from './getUserId'

import { UserNotFoundProblemGqlType } from '@backend/common'
import { ProfileNotFoundProblemGqlType } from '../../schema'

const UserNotFoundMapper = getInputToProblemMapper(
  UserNotFoundProblemGqlType,
  getUserId,
)

const ProfileNotFoundMapper = getInputToProblemMapper(
  ProfileNotFoundProblemGqlType,
  getUserId,
)

export const updateProfileErrorsToProblem = getErrorToProblemMapper([
  UserNotFoundMapper,
  ProfileNotFoundMapper,
])
