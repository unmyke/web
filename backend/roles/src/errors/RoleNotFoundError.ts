import { CommandError, CommandErrorDecorator } from '@backend/common'

const ROLE_NOT_FOUND = 'Role not found'
type ROLE_NOT_FOUND = typeof ROLE_NOT_FOUND

@CommandErrorDecorator(ROLE_NOT_FOUND)
export class RoleNotFoundError extends CommandError {}
