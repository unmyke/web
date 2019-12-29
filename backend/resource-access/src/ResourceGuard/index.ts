import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

import { hasPermission, GqlContextWithUserContext } from './hasPermission'

import { GqlContext, Permission } from '@backend/common'

@Injectable()
export class ResourceGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const resourcePermission =
      this.reflector.get<Permission>('ResourceAccess', context.getHandler()) ||
      null

    if (resourcePermission === null) {
      return true
    }

    const gqlExecutionContext = GqlExecutionContext.create(context)
    const ctx: GqlContext = gqlExecutionContext.getContext()
    const { input }: any = gqlExecutionContext.getArgs()

    if (!ctx.user) {
      return false
    }

    const hasResolverPermission = hasPermission(resourcePermission)
    return hasResolverPermission(ctx as GqlContextWithUserContext, input)
  }
}
