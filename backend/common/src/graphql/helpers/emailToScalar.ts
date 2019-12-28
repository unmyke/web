import { primitiveToScalar } from './primitiveToScalar'
import { EmailGqlScalar } from '../scalars'
import { Email } from '../../dto'

export const emailToScalar = (value: Email): EmailGqlScalar =>
  primitiveToScalar(EmailGqlScalar)(value)
