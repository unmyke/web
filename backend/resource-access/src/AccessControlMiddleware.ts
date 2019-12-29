import { Injectable, NestMiddleware } from '@nestjs/common'
import { AccessControl } from 'accesscontrol'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RoleModel, RolesNotDeclaredError } from '@backend/roles'
import { Grant } from '@backend/common'

@Injectable()
export class AccessControlMiddleware implements NestMiddleware {
  accessControlPromise: Promise<AccessControl>

  constructor(
    @InjectRepository(RoleModel)
    private readonly roleRepository: Repository<RoleModel>,
  ) {
    this.accessControlPromise = this.roleRepository.find().then(
      (roles: RoleModel[]) =>
        new AccessControl(
          roles.reduce(
            (grants, { role, permissions }): Grant[] => [
              ...grants,
              ...permissions.map(permission => ({
                role,
                attributes: ['*'],
                ...permission,
              })),
            ],
            [],
          ),
        ),
    )
  }

  use(req, res, next: () => void): void {
    this.accessControlPromise.then(accessControl => {
      if (!accessControl.getRoles().length) {
        throw new RolesNotDeclaredError()
      }
      req.accessControl = accessControl
      next()
    })
  }
}
