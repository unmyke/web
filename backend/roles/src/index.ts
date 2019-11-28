import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role as RoleModel } from './entities'
import { RoleSerializer } from './serializers'

@Module({
  imports: [TypeOrmModule.forFeature([RoleModel])],
  providers: [RoleSerializer],
  exports: [TypeOrmModule, RoleSerializer],
})
export class RolesModule {}

export { RoleModel, RoleSerializer }
export { RoleMigrations } from './migrations'
export * from './errors'
