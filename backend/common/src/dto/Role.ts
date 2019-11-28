import { ROLE_SUPPORT, ROLE_USER } from '../constants'
import { Permission } from './Permission'

export type SupportRoleName = typeof ROLE_SUPPORT
export type UserRoleName = typeof ROLE_USER
export type RoleNames = SupportRoleName | UserRoleName

export type Role = {
  id: string
  name: string
  role: RoleNames
  permissions: Permission[]
}
