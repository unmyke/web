import { ClassType } from 'type-graphql'

import { Resource } from '../../dto'
import { MutationPayload } from './MutationPayload'
import { getCrudMutationName } from './getCrudMutationName'

export const CreateMutationPayload = <ResourceType extends Resource, GqlType>(
  GqlType: ClassType<GqlType>,
  ProblemsGqlUnion,
) =>
  MutationPayload<ResourceType, GqlType>(
    GqlType,
    ProblemsGqlUnion,
    getCrudMutationName('create', GqlType),
  )
