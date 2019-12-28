import { primitiveToScalar } from './primitiveToScalar'
import { UuidGqlScalar } from '../scalars'
import { Uuid } from '../../dto'

export const uuidToScalar = (value: Uuid): UuidGqlScalar =>
  primitiveToScalar(UuidGqlScalar)(value)
