import { AnyPossession, OwnPossession } from './Possession'
import { Action } from './Action'

type ResourceAction = {
  resource: string
  action: Action
}

export type AnyPossessionPermission = ResourceAction & {
  possession: AnyPossession
}
export type OwnPossessionPermission = ResourceAction & {
  possession: OwnPossession
}

export type Permission = AnyPossessionPermission | OwnPossessionPermission
