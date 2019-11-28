import uuidv4 from 'uuid/v4'
import { Role } from '../../../entities'
import {
  ROLE_USER,
  ACTION_CREATE,
  ACTION_DELETE,
  ACTION_READ,
  ACTION_UPDATE,
  POSSESSION_OWN,
  POSSESSION_ANY,
} from '@backend/common'

export const userRole: Role = {
  id: uuidv4(),
  name: 'User',
  permissions: [
    {
      resource: 'profile',
      action: ACTION_CREATE,
      possession: POSSESSION_OWN,
    },
    {
      resource: 'profile',
      action: ACTION_READ,
      possession: POSSESSION_ANY,
    },
    {
      resource: 'profile',
      action: ACTION_UPDATE,
      possession: POSSESSION_OWN,
    },
    {
      resource: 'profile',
      action: ACTION_DELETE,
      possession: POSSESSION_OWN,
    },
    {
      resource: 'user',
      action: ACTION_READ,
      possession: POSSESSION_ANY,
    },
    {
      resource: 'email',
      action: ACTION_UPDATE,
      possession: POSSESSION_OWN,
    },
    {
      resource: 'password',
      action: ACTION_UPDATE,
      possession: POSSESSION_OWN,
    },
  ],
  role: ROLE_USER,
}
