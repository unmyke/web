import { CommandError, CommandErrorDecorator } from '@backend/common'

const PASSWORD_MISMATCH = 'Passwords mismatch'
type PASSWORD_MISMATCH = typeof PASSWORD_MISMATCH

@CommandErrorDecorator(PASSWORD_MISMATCH)
export class PasswordMismatchError extends CommandError {}
