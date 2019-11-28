import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetUserQuery } from '../impl'

import { UserService } from '../../UserService'
import { User } from '@backend/common'

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userService: UserService) {}

  execute({ id }: GetUserQuery): Promise<User> {
    return this.userService.getUserById(id)
  }
}
