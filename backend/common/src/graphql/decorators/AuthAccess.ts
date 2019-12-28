import { SetMetadata } from '@nestjs/common'

import { RoleNames } from '../../dto'

export const AuthAccess = (...roles: RoleNames[]) =>
  SetMetadata('AuthAccess', roles)
