import { Resource } from './Resource'
import { Profile } from './Profile'
import { Role } from './Role'
import { Email } from './Email'

export type User = Resource & {
  email: Email
  password: string
  profile?: Profile
  role: Role
  lastLoginAt?: Date
}
