import { Module } from '@nestjs/common'

import { JwtService } from './JwtService'
@Module({
  providers: [JwtService],
  exports: [JwtService],
})
export class AuthAccessModule {}

export * from './AccessGuard'
export * from './errors'
export * from './AuthMiddleware'
