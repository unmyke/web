import { CommandError, CommandErrorDecorator } from '@backend/common'

const ROLES_NOT_DECLARED = 'Role not found'
type ROLES_NOT_DECLARED = typeof ROLES_NOT_DECLARED

@CommandErrorDecorator(ROLES_NOT_DECLARED)
export class RolesNotDeclaredError extends CommandError {}
