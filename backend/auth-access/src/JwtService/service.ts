import { Injectable } from '@nestjs/common'
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'

import { getPayloadByUser, getUserByPayload } from './helpers'

import { signOptions, verifyOptions, SECRET } from './constants'

import { UserContext } from '@backend/common'
import { Token, Payload, AuthHeader, UserPayload } from './types'

import { InvalidTokenError, InvalidAuthHeaderError } from '../errors'

const TOKEN_REGEX = /^Bearer\s*(\w+\.\w+.\w+)\s*/

@Injectable()
export class JwtService {
  encodeUser(user: UserContext): Token {
    const userPayload = getPayloadByUser(user)
    return this.encode(userPayload)
  }
  decodeUser(token: Token): UserContext {
    const userPayload = this.decode(token) as UserPayload
    return getUserByPayload(userPayload)
  }

  decodeUserByAuthHeader(authHeader: AuthHeader): UserContext {
    const userPayload = this.decodeByAuthHeader(authHeader) as UserPayload
    return getUserByPayload(userPayload)
  }

  private encode(obj: Payload, extraSignOptions?: SignOptions): Token {
    return jwt.sign(obj, SECRET, {
      ...signOptions,
      ...(extraSignOptions || {}),
    }) as Token
  }

  private decode(token: Token, extraVerifyOptions?: VerifyOptions): Payload {
    try {
      return jwt.verify(token, SECRET, {
        ...verifyOptions,
        ...(extraVerifyOptions || {}),
      })
    } catch (_) {
      throw new InvalidTokenError()
    }
  }

  private decodeByAuthHeader(authHeader: AuthHeader): Payload {
    if (!authHeader || !TOKEN_REGEX.test(authHeader)) {
      throw new InvalidAuthHeaderError()
    }
    const token = authHeader.replace(TOKEN_REGEX, '$1') as Token
    return this.decode(token)
  }
}
