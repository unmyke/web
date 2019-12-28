// tslint:disable: max-classes-per-file
import { ResourceList, User } from '@backend/common'

import { ProfileGqlType } from './Profile'

export const {
  ListGqlType: ProfileListGqlType,
  ListResolver: ProfileListResolver,
} = ResourceList<User, ProfileGqlType>(ProfileGqlType)
export type ProfileListGqlType = InstanceType<typeof ProfileListGqlType>
