import { ResourceList, User } from '@backend/common'

import { UserGqlType } from './User'

export const {
  ListGqlType: UserListGqlType,
  ListResolver: UserListResolver,
} = ResourceList<User, UserGqlType>(UserGqlType)
export type UserListGqlType = InstanceType<typeof UserListGqlType>
