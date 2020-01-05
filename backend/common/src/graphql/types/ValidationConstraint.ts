import { Field, ObjectType } from 'type-graphql'

@ObjectType('ValidationConstraint', {
  description: 'User with passed id exists.',
})
export class ValidationConstraintGqlType {
  @Field()
  field: string

  @Field(type => [String])
  constraints: string[]
}
