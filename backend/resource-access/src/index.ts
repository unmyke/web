import { Module } from '@nestjs/common'
import { RolesModule } from '@backend/roles'
import { ResourceGuard } from './ResourceGuard'

@Module({
  imports: [RolesModule],
  providers: [ResourceGuard],
})
export class ResourceAccessModule {}
export { ResourceGuard }
