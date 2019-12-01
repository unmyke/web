import { EmailGqlScalar, EmailScalarResolver } from './Email'
import { UuidGqlScalar, UuidScalarResolver } from './Uuid'
export * from './ScalarInterface'

export { EmailGqlScalar, UuidGqlScalar }
export const ScalarResolvers = [EmailScalarResolver, UuidScalarResolver]
