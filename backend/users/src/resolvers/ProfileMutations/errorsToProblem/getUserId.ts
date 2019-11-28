import { UuidGqlScalar } from '@backend/common'

export const getUserId = ({
  userId,
}: {
  userId: UuidGqlScalar
}): { userId: UuidGqlScalar } => ({ userId })
