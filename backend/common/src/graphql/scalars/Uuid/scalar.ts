// tslint:disable: member-ordering

import { ScalarInterface } from '../ScalarInterface'
import { Uuid } from '../../../dto'
import { IsUUID, IsNotEmpty, IsString } from 'class-validator'

export class UuidGqlScalar implements ScalarInterface<Uuid> {
  constructor(value: Uuid) {
    this.value = value
  }

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly value: Uuid
}
