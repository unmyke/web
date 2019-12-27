import { Field, InputType } from 'type-graphql'
import { ValidateNested } from 'class-validator'

import { UuidGqlScalar } from '@backend/common'

@InputType('DeleteProfileInput', {
  description: 'Input for DeleteProfile mutation',
})
export class DeleteProfileGqlInput {
  @Field()
  @ValidateNested()
  userId: UuidGqlScalar
}
