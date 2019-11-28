import { User } from '@backend/common'
import { UserWithProfile, UserWithoutProfile } from '../types'

import { UserNotFoundError } from '@backend/common'
import { ProfileNotFoundError, ProfileExistsError } from '../errors'

import { User as UserModel } from '../entities'

export const checkUserExists = (
  userModel: UserModel | undefined | null,
): UserModel => {
  if (!userModel) {
    throw new UserNotFoundError()
  }

  return userModel
}

export const hasUserProfile = (user: User): user is UserWithProfile => {
  return !!(user as UserWithProfile).profile
}

export const getUserWithProfile = (user: User): UserWithProfile => {
  if (!hasUserProfile(user)) {
    throw new ProfileNotFoundError()
  }
  return user as UserWithProfile
}

export const getUserWithoutProfile = (user: User): UserWithoutProfile => {
  if (hasUserProfile(user)) {
    throw new ProfileExistsError()
  }
  return user as UserWithProfile
}
