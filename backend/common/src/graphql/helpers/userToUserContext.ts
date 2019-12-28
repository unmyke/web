import { User } from '../../dto'
import { UserContext } from '../contexts'

export const userToUserContext = ({
  password,
  role: { role },
  ...userContext
}: User): UserContext => ({ ...userContext, role })
