import { Field, InputType } from 'type-graphql'
import { IsNotEmpty, MaxLength, ValidateNested } from 'class-validator'

import { UuidGqlScalar } from '@backend/common'

@InputType('UpdateProfileInput', {
  description: 'Input for UpdateProfile mutation',
})
export class UpdateProfileGqlInput {
  @Field()
  @ValidateNested()
  userId: UuidGqlScalar

  @Field()
  @IsNotEmpty()
  @MaxLength(30)
  firstName?: string

  @Field()
  @IsNotEmpty()
  @MaxLength(30)
  lastName?: string
}
