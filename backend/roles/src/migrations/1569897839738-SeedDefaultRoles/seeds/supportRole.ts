import uuidv4 from 'uuid/v4'
import { Role } from '../../../entities'
import {
  ROLE_SUPPORT,
  ACTION_CREATE,
  ACTION_DELETE,
  ACTION_READ,
  ACTION_UPDATE,
  POSSESSION_ANY,
} from '@backend/common'

export const supportRole: Role = {
  id: uuidv4(),
  name: 'Support',
  permissions: [
    {
      resource: 'profile',
      action: ACTION_CREATE,
      possession: POSSESSION_ANY,
    },
    {
      resource: 'profile',
      action: ACTION_READ,
      possession: POSSESSION_ANY,
    },
    {
      resource: 'profile',
      action: ACTION_UPDATE,
      possession: POSSESSION_ANY,
    },
    {
      resource: 'profile',
      action: ACTION_DELETE,
      possession: POSSESSION_ANY,
    },
    {
      resource: 'user',
      action: ACTION_READ,
      possession: POSSESSION_ANY,
    },
    {
      resource: 'email',
      action: ACTION_UPDATE,
      possession: POSSESSION_ANY,
    },
    {
      resource: 'password',
      action: ACTION_UPDATE,
      possession: POSSESSION_ANY,
    },
  ],
  role: ROLE_SUPPORT,
}
