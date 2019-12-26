import { EventInterface } from './EventInterface'
import { CommandError } from '../../errors'

export interface FailCommandEventInterface extends EventInterface {
  error: CommandError | Error
}
