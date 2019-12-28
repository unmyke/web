import { Profile, RoleNames, CustomPrimitive } from '@backend/common'

export type Token = CustomPrimitive<string, 'Token'>
export type AuthHeader = CustomPrimitive<string, 'AuthHeader'>
export type Payload = {}

export type UserPayload = Payload & {
  sub: string
  email: string
  profile?: Profile
  role: RoleNames
  lastLoginAt?: number
}
