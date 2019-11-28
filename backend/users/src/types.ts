import { User, UserContext, Profile } from '@backend/common'

export type UserWithoutProfile = Omit<User, 'profile'>
export type UserContextWithoutProfile = Omit<UserContext, 'profile'>
export type UserWithProfile = UserWithoutProfile & {
  profile: Profile
}
export type UserContextWithProfile = UserContextWithoutProfile & {
  profile: Profile
}
