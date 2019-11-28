import {
  getErrorToProblemMapper,
  getInputToProblemMapper,
} from '@backend/common'

import { getUserId } from './getUserId'

import { UserNotFoundProblemGqlType } from '@backend/common'
import { ProfileExistsProblemGqlType } from '../../schema'

const UserNotFoundMapper = getInputToProblemMapper(
  UserNotFoundProblemGqlType,
  getUserId,
)

const ProfileExistsMapper = getInputToProblemMapper(
  ProfileExistsProblemGqlType,
  getUserId,
)

export const createProfileErrorsToProblem = getErrorToProblemMapper([
  UserNotFoundMapper,
  ProfileExistsMapper,
])
