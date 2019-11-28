import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetUsersQuery } from '../impl'

import { User } from '@backend/common'
import { UserService } from '../../UserService'

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly userService: UserService) {}

  execute(_: GetUsersQuery): Promise<User[]> {
    return this.userService.getUsers()
  }
}
