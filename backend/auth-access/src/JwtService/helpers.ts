import { UserPayload } from './types'
import { UserContext, Uuid, Email } from '@backend/common'

export const getPayloadByUser = ({
  id: sub,
  email,
  role,
  profile,
  lastLoginAt,
}: UserContext): UserPayload => ({
  sub,
  email,
  profile,
  role,
  ...(lastLoginAt ? { lastLoginAt: lastLoginAt.getTime() } : {}),
})

export const getUserByPayload = ({
  sub,
  email,
  profile,
  role,
  lastLoginAt,
}: UserPayload): UserContext => ({
  id: sub as Uuid,
  email: email as Email,
  profile,
  role,
  ...(lastLoginAt ? { lastLoginAt: new Date(lastLoginAt) } : {}),
})
