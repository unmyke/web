// tslint:disable: max-classes-per-file
import { upperFirst } from 'lodash'
import { Resolver, ResolveProperty } from '@nestjs/graphql'
import { ClassType, ObjectType, Field, Root } from 'type-graphql'

import { Status } from '../enums'
import { UuidGqlScalar } from '../scalars'
import { ProblemInterface } from '../interfaces'
import { uuidToScalar } from '../helpers'
import { SuccessMutationPayload, FailMutationPayload } from '../types'

export const MutationPayload = <ResourceType, ResourceGqlType>(
  GqlType: ClassType<ResourceGqlType>,
  ProblemsGqlUnion,
  mutationName: string,
): any => {
  const isSuccess = (
    payload:
      | SuccessMutationPayload<ResourceType>
      | FailMutationPayload<ProblemInterface>,
  ): payload is SuccessMutationPayload<ResourceType> =>
    (payload as SuccessMutationPayload<ResourceType>).status === Status.SUCCESS

  @ObjectType(`${upperFirst(mutationName)}Payload`)
  class MutationPayloadGqlType {
    @Field({ nullable: true })
    recordId?: UuidGqlScalar

    @Field(type => GqlType, { nullable: true })
    record?: ResourceGqlType

    @Field(type => Status)
    status: Status

    @Field(type => [ProblemsGqlUnion], { nullable: true })
    errors?: Array<typeof ProblemsGqlUnion>
  }

  @Resolver(returns => MutationPayloadGqlType)
  class MutationPayloadResolver {
    @ResolveProperty(type => UuidGqlScalar, {
      name: 'recordId',
      nullable: true,
    })
    getRecordId(
      @Root()
      payload:
        | SuccessMutationPayload<ResourceType>
        | FailMutationPayload<ProblemInterface>,
    ): UuidGqlScalar | null {
      if (!isSuccess(payload)) {
        return null
      }

      const { recordId } = payload
      return uuidToScalar(recordId)
    }

    @ResolveProperty(type => GqlType, {
      name: 'record',
      nullable: true,
    })
    getRecord(
      @Root()
      payload:
        | SuccessMutationPayload<ResourceType>
        | FailMutationPayload<ProblemInterface>,
    ): ResourceType | null {
      if (!isSuccess(payload)) {
        return null
      }

      const { record } = payload
      return record
    }

    @ResolveProperty(status => [ProblemsGqlUnion], {
      name: 'errors',
      nullable: true,
    })
    getErrors(
      @Root()
      payload:
        | SuccessMutationPayload<ResourceType>
        | FailMutationPayload<ProblemInterface>,
    ): ProblemInterface[] | null {
      if (isSuccess(payload)) {
        return null
      }

      const { errors } = payload
      return errors
    }
  }

  return {
    MutationPayloadGqlType,
    MutationPayloadResolver,
  }
}
