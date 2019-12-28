import uuidv4 from 'uuid/v4'

import { Uuid } from '../../dto'
import { CommandInterface } from './CommandInterface'

export class BaseCommand implements CommandInterface {
  public readonly id: Uuid
  constructor() {
    this.id = uuidv4() as Uuid
  }
}
