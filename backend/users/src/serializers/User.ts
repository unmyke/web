import { Injectable } from '@nestjs/common'

import { User, Profile, Role, Uuid, Email } from '@backend/common'
import { RoleSerializer } from '@backend/roles'

import { User as UserModel } from '../entities'
import { ProfileSerializer } from './Profile'

@Injectable()
export class UserSerializer {
  constructor(
    private readonly roleSerializer: RoleSerializer,
    private readonly profileSerializer: ProfileSerializer,
  ) {}

  serialize(userModel: UserModel): User {
    const {
      id,
      email,
      password,
      profile: profileModel,
      role: roleModel,
      lastLoginAt,
    } = userModel

    return {
      id: id as Uuid,
      email: email as Email,
      password,
      ...(profileModel
        ? { profile: this.profileSerializer.serialize(profileModel) as Profile }
        : {}),
      role: this.roleSerializer.serialize(roleModel) as Role,
      lastLoginAt,
    }
  }
}
