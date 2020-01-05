import { upperFirst } from 'lodash'
import { ClassType } from 'type-graphql'

export const getCrudMutationName = <ResourceGqlType>(
  crudName: string,
  GqlType: ClassType<ResourceGqlType>,
) =>
  `${upperFirst(crudName.toLowerCase())}${GqlType.name.replace(
    /(.*)GqlType/,
    '$1',
  )}`
