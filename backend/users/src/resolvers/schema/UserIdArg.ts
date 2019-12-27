import { ArgsType, Field } from 'type-graphql'
import { ValidateNested } from 'class-validator'

import { UuidGqlScalar } from '@backend/common'

@ArgsType()
export class UserIdGqlArg {
  @Field()
  @ValidateNested()
  userId: UuidGqlScalar
}
