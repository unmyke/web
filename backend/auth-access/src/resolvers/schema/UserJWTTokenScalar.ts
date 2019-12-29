import { Scalar, CustomScalar } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'

import { UserContext } from '@backend/common'
import { JwtService, Token } from '../../JwtService'
import { InvalidTokenError } from '../../errors'

@Scalar('UserJwtToken', returns => UserContext)
export class UserJwtTokenGqlScalar
  implements CustomScalar<string, UserContext> {
  description = 'The user Jwt token custom scalar type'
  constructor(private readonly jwtService: JwtService) {}

  serialize(userPayload: UserContext): string {
    return this.jwtService.encodeUser(userPayload) as string
  }
  parseValue(value: string): UserContext {
    return this.jwtService.decodeUser(value as Token) as UserContext
  }
  parseLiteral(ast: ValueNode): UserContext {
    if (ast.kind !== Kind.STRING) {
      throw new InvalidTokenError()
    }

    return this.jwtService.decodeUser(ast.value as Token) as UserContext
  }
}
