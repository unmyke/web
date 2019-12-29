import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

import { RoleNames } from '@backend/common'
import { GqlContext, UserContext } from '@backend/common'

const getUserContext = (context: ExecutionContext): UserContext | null => {
  const gqlExecutionContext = GqlExecutionContext.create(context)
  const { user }: GqlContext = gqlExecutionContext.getContext()

  return user
}

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const authAccessRoleList = this.reflector.get<RoleNames[]>(
      'AuthAccess',
      context.getHandler(),
    )
    const userContext = getUserContext(context)

    if (!authAccessRoleList) {
      return true
    }

    if (userContext === null) {
      return false
    }

    if (authAccessRoleList.length === 0) {
      return true
    }

    return (
      authAccessRoleList.filter(
        (authAccessRole: RoleNames): boolean =>
          authAccessRole === userContext.role,
      ).length !== 0
    )
  }
}
