import { Injectable, NestMiddleware } from '@nestjs/common'

import { JwtService, AuthHeader } from './JwtService'
import { UserContext } from '@backend/common'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req, res, next: () => void): void {
    try {
      const userContext: UserContext = this.jwtService.decodeUserByAuthHeader(
        req.header('authorization') as AuthHeader,
      )
      req.user = userContext
    } catch (error) {
      req.user = null
    }
    next()
  }
}
