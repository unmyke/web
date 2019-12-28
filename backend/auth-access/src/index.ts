import { Module } from '@nestjs/common'

@Module({})
export class AuthAccessModule {}

export * from './AccessGuard'
export * from './errors'
