import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'

import { findOrCreate } from '@backend/common'

import { Role } from '../../entities'
import { userRole, supportRole } from './seeds'

const defaultRolesSeeds = [userRole, supportRole]

export class SeedDefaultRoles1569897839738 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<any> {
    const roleRepo = getRepository(Role)
    const findOrCreateRole = findOrCreate(roleRepo)

    return findOrCreateRole(defaultRolesSeeds, ['name'])
  }

  public async down(_: QueryRunner): Promise<any> {
    const roleRepo = getRepository(Role)
    return roleRepo.delete(userRole)
  }
}
