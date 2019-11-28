import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role as RoleModel } from './entities'

@Module({
  imports: [TypeOrmModule.forFeature([RoleModel])],
})
export class RolesModule {}

export { RoleModel }
export { RoleMigrations } from './migrations'
export * from './errors'
