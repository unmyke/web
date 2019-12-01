import { createParamDecorator } from '@nestjs/common'

import { UserContext } from '../contexts'

export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.user as UserContext | null,
)
