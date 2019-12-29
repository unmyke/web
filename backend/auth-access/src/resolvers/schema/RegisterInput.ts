import { Field, InputType } from 'type-graphql'
import { MinLength, ValidateNested } from 'class-validator'
import { EmailGqlScalar } from '@backend/common'

@InputType('RegisterInput', {
  description: 'Input for Register mutation',
})
export class RegisterGqlInput {
  @Field()
  @ValidateNested()
  email: EmailGqlScalar

  @Field()
  @MinLength(8)
  password: string

  @Field()
  @MinLength(8)
  passwordConfirmation: string
}
