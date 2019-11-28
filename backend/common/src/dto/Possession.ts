import { POSSESSION_OWN, POSSESSION_ANY } from '../constants'

export type AnyPossession = typeof POSSESSION_ANY
export type OwnPossession = typeof POSSESSION_OWN

export type Possession = AnyPossession | OwnPossession
