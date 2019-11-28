import { Injectable } from '@nestjs/common'
import { Role } from '@backend/common'
import { Role as RoleModel } from '../entities'

@Injectable()
export class RoleSerializer {
  serialize(roleModel: RoleModel): Role {
    const { id, name, role, permissions } = roleModel
    return { id, name, role, permissions }
  }
}
