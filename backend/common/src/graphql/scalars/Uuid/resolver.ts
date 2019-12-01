import { Scalar, CustomScalar } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'

import { UuidGqlScalar } from './scalar'
import { Uuid } from '../../../dto'
import { InvalidUuidError } from '../../../errors'
import { scalarToPrimitive, uuidToScalar } from '../../helpers'

@Scalar('Uuid', type => UuidGqlScalar)
export class UuidScalarResolver implements CustomScalar<string, UuidGqlScalar> {
  description = 'The uuid v4 custom scalar type'

  serialize(uuidScalar: UuidGqlScalar): string {
    const serializedValue: string = scalarToPrimitive(uuidScalar) as string
    return serializedValue
  }
  parseValue(value: string): UuidGqlScalar {
    const uuid = value as Uuid
    const uuidScalar: UuidGqlScalar = uuidToScalar(uuid)
    return uuidScalar
  }
  parseLiteral(ast: ValueNode): UuidGqlScalar {
    if (ast.kind !== Kind.STRING) {
      throw new InvalidUuidError()
    }
    const uuid = ast.value as Uuid
    const uuidScalar: UuidGqlScalar = uuidToScalar(uuid)
    return uuidScalar
  }
}
