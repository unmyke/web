import { AuthResolvers } from './AuthResolvers'
import { UserJwtTokenGqlScalar } from './schema'

export const Resolvers = [AuthResolvers, UserJwtTokenGqlScalar]
