import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role as RoleModel } from './entities'

export * from './enums'

@Module({
  imports: [TypeOrmModule.forFeature([RoleModel])],
})
export class RolesModule {}

export { RoleModel }
export * from './errors'
