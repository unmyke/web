import { UserContext } from './UserContext'
import { AccessControl } from 'accesscontrol'

export type GqlContext = {
  user: UserContext | null
  accessControl: AccessControl
}
