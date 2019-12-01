import { Profile, RoleNames, Uuid, Email } from '../../dto'

export class UserContext {
  id: Uuid
  email: Email
  profile?: Profile
  role: RoleNames
  lastLoginAt?: Date
}
