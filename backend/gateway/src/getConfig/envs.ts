export const PRODUCTION = 'production'
export const DEVELOPMENT = 'development'
type PRODUCTION = typeof PRODUCTION
type DEVELOPMENT = typeof DEVELOPMENT

export type Env = PRODUCTION | DEVELOPMENT
