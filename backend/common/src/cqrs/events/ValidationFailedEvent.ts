import { EventInterface } from './EventInterface'
import { ValidationError } from 'class-validator'

import { CommandInterface } from '../commands'

export class ValidationFailedEvent implements EventInterface {
  constructor(
    public readonly command: CommandInterface,
    public readonly errors: ValidationError[],
  ) {}
}
