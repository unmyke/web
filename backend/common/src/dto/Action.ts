import {
  ACTION_CREATE,
  ACTION_READ,
  ACTION_UPDATE,
  ACTION_DELETE,
} from '../constants'

export type CreateAction = typeof ACTION_CREATE
export type ReadAction = typeof ACTION_READ
export type UpdateAction = typeof ACTION_UPDATE
export type DeleteAction = typeof ACTION_DELETE

export type Action = CreateAction | ReadAction | UpdateAction | DeleteAction
