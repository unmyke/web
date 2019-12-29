import { Field, InputType } from 'type-graphql'
import { MinLength, ValidateNested } from 'class-validator'
import { EmailGqlScalar } from '@backend/common'

@InputType('LoginInput', {
  description: 'Input for Login mutation',
})
export class LoginGqlInput {
  @Field()
  @ValidateNested()
  email: EmailGqlScalar

  @Field()
  @MinLength(8)
  password: string
}
