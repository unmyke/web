// tslint:disable: max-classes-per-file
import { ResolveProperty, Resolver } from '@nestjs/graphql'
import { ClassType, Root, ObjectType, Field, Int } from 'type-graphql'
import pluralize from 'pluralize'

export const ResourceList = <ResourceType, ResourceGqlType>(
  GqlType: ClassType<ResourceGqlType>,
): any => {
  const resourceName = GqlType.name.replace(/^(.*)GqlType$/, '$1')
  const pluralResourceName = pluralize(resourceName)
  const resourceListName = `${resourceName}List`

  @ObjectType(resourceListName, {
    description: `List of ${pluralResourceName.toLowerCase()}`,
  })
  class ResourceListGqlType {
    @Field(type => [GqlType])
    rows: ResourceGqlType[]

    @Field(type => Int)
    count: number
  }

  @Resolver(returns => ResourceListGqlType)
  class ResourceListResolver {
    @ResolveProperty(type => [GqlType], { name: 'rows' })
    getRows(@Root() rows: ResourceType[] = []): ResourceType[] {
      return rows
    }

    @ResolveProperty(type => Int, { name: 'count' })
    getRowsCount(@Root() rows: ResourceType[] = []): number {
      return rows.length
    }
  }

  return {
    ListGqlType: ResourceListGqlType,
    ListResolver: ResourceListResolver,
  }
}
