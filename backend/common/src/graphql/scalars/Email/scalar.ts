// tslint:disable: member-ordering
import { ScalarInterface } from '../ScalarInterface'
import { Email } from '../../../dto'
import { IsNotEmpty, IsString, IsEmail } from 'class-validator'

export class EmailGqlScalar implements ScalarInterface<Email> {
  constructor(value: Email) {
    this.value = value
  }

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  value: Email
}
