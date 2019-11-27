import {
  ACTION_CREATE,
  ACTION_READ,
  ACTION_UPDATE,
  ACTION_DELETE,
  POSSESSION_OWN,
  POSSESSION_ANY,
  Permission,
} from '@backend/common'

export const readUserPermission: Permission = {
  resource: 'user',
  action: ACTION_READ,
  possession: POSSESSION_ANY,
}

export const createProfilePermission: Permission = {
  resource: 'profile',
  action: ACTION_CREATE,
  possession: POSSESSION_OWN,
}

export const readProfilePermission: Permission = {
  resource: 'profile',
  action: ACTION_READ,
  possession: POSSESSION_ANY,
}

export const updateProfilePermission: Permission = {
  resource: 'profile',
  action: ACTION_UPDATE,
  possession: POSSESSION_OWN,
}

export const deleteProfilePermission: Permission = {
  resource: 'profile',
  action: ACTION_DELETE,
  possession: POSSESSION_OWN,
}
