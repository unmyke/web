import { SetMetadata } from '@nestjs/common'
import { Permission } from '../../dto'
import { POSSESSION_OWN } from '../../constants'

export const ResourceAccess = (permission: Permission) => {
  const { resource, action, possession = POSSESSION_OWN } = permission
  const actionPermission: Permission = { resource, action, possession }

  return SetMetadata('ResourceAccess', actionPermission)
}
