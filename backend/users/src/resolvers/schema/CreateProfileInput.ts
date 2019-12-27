import { Field, InputType } from 'type-graphql'
import { IsNotEmpty, MaxLength, ValidateNested } from 'class-validator'

import { UuidGqlScalar } from '@backend/common'

@InputType('CreateProfileInput', {
  description: 'Input for CreateProfile mutation',
})
export class CreateProfileGqlInput {
  @Field()
  @ValidateNested()
  userId: UuidGqlScalar

  @Field()
  @IsNotEmpty()
  @MaxLength(30)
  firstName: string

  @Field()
  @IsNotEmpty()
  @MaxLength(30)
  lastName: string
}
