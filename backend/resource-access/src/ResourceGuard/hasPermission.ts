import { AccessControl } from 'accesscontrol'
import {
  GqlContext,
  UserContext,
  Permission,
  POSSESSION_ANY,
  UuidGqlScalar,
  scalarToPrimitive,
} from '@backend/common'

export type GqlContextWithUserContext = GqlContext & {
  user: UserContext
}

const grantPermissions = ({
  accessControl,
  user: { id, role },
  permission: { resource, action, possession },
  input,
}: {
  accessControl: AccessControl
  user: UserContext
  permission: Permission
  input?: { userId?: UuidGqlScalar }
}): boolean => {
  const userPossession =
    input && input.userId && id === scalarToPrimitive(input.userId)
      ? possession
      : POSSESSION_ANY
  const hasResourceAccess = accessControl.permission({
    role,
    resource,
    action,
    possession: userPossession,
  }).granted

  return hasResourceAccess
}

export const hasPermission = (permission: Permission) => (
  { user, accessControl }: GqlContextWithUserContext,
  input?,
) => {
  return grantPermissions({ accessControl, user, permission, input })
}
