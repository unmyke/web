import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'

import { findOneOrCreate, ROLE_SUPPORT } from '@backend/common'

import { RoleModel } from '@backend/roles'
import { User, Profile } from '../../entities'
import {
  adminUser as adminUserSeed,
  adminUserProfile as adminUserProfileSeed,
} from './seeds'

import { UserExistsError } from '@backend/common'
import { RoleNotFoundError } from '@backend/roles'

export class SeedAdmin1569897971527 implements MigrationInterface {
  public up(queryRunner: QueryRunner): Promise<any> {
    const userRepo = getRepository(User)
    const profileRepo = getRepository(Profile)
    const roleRepo = getRepository(RoleModel)

    const findOneOrCreateProfile = findOneOrCreate(profileRepo)
    const findOneOrCreateAdminProfile = findOneOrCreateProfile(
      adminUserProfileSeed,
    )

    return userRepo
      .findOne({ where: { email: adminUserSeed.email } })
      .then((admin: User) => {
        if (admin) {
          throw new UserExistsError()
        }

        return Promise.all([
          roleRepo.findOne({ role: ROLE_SUPPORT }),
          findOneOrCreateAdminProfile,
        ])
      })
      .then(([supportRole, adminUserProfile]) => {
        if (!supportRole) {
          throw new RoleNotFoundError()
        }
        const adminUser = {
          ...adminUserSeed,
          profile: adminUserProfile,
          role: supportRole,
        }

        return userRepo.save(adminUser)
      })
  }

  public down(_: QueryRunner): Promise<any> {
    const userRepo = getRepository(User)
    const profileRepo = getRepository(Profile)

    return Promise.all([
      profileRepo.delete(adminUserProfileSeed),
      userRepo.delete(adminUserSeed),
    ])
  }
}
