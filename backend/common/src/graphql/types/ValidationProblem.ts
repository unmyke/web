import { Field, ObjectType } from 'type-graphql'

import { ProblemInterface } from '../interfaces'
import { ValidationConstraintGqlType } from './ValidationConstraint'

import { ValidationError } from 'class-validator'

const validationErrorToGqlType = ({
  property: field,
  constraints: errorConstraints,
  children,
}: ValidationError): ValidationConstraintGqlType => {
  const childrenConstraints = children.length
    ? children
        .map(validationErrorToGqlType)
        .reduce(
          (
            prevChildrenConstraints: string[],
            { constraints: subConstraints }: ValidationConstraintGqlType,
          ) => [...prevChildrenConstraints, ...subConstraints],
          [],
        )
    : []
  const constraints =
    errorConstraints !== undefined && Object.keys(errorConstraints).length
      ? Object.values(errorConstraints)
      : []
  return {
    field,
    constraints: [...childrenConstraints, ...constraints],
  }
}

@ObjectType('ValidationProblem', {
  implements: ProblemInterface,
  description: 'Input validation.',
})
export class ValidationProblemGqlType implements ProblemInterface {
  message = `Input data not meets contrains.`

  @Field(type => [ValidationConstraintGqlType])
  errors: ValidationConstraintGqlType[]

  constructor(errors: ValidationError[]) {
    this.errors = errors.map(validationErrorToGqlType)
  }
}
