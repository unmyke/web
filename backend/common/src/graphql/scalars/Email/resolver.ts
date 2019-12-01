import { Scalar, CustomScalar } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'

import { EmailGqlScalar } from './scalar'
import { scalarToPrimitive, emailToScalar } from '../../helpers'
import { Email } from '../../../dto'
import { InvalidEmailError } from '../../../errors'

@Scalar('Email', type => EmailGqlScalar)
export class EmailScalarResolver
  implements CustomScalar<string, EmailGqlScalar> {
  description = 'The email custom scalar type'

  serialize(emailScalar: EmailGqlScalar): string {
    return scalarToPrimitive(emailScalar) as string
  }
  parseValue(value: string): EmailGqlScalar {
    return emailToScalar(value as Email)
  }
  parseLiteral(ast: ValueNode): EmailGqlScalar {
    if (ast.kind !== Kind.STRING) {
      throw new InvalidEmailError()
    }

    return emailToScalar(ast.value as Email)
  }
}
