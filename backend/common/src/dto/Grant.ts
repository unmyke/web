import { Permission } from './Permission'
import { RoleNames } from './Role'

export type Grant = Permission & {
  attributes: string[]
  role: RoleNames
}
