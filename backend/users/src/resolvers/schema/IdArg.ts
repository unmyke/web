import { ArgsType, Field } from 'type-graphql'
import { ValidateNested } from 'class-validator'

import { UuidGqlScalar } from '@backend/common'

@ArgsType()
export class IdGqlArg {
  @Field()
  @ValidateNested()
  id: UuidGqlScalar
}
