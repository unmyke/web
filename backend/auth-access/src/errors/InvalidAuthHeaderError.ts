import { CommandError, CommandErrorDecorator } from '@backend/common'

const INVALID_AUTH_HEADER = 'Invalid authorization header'
type INVALID_AUTH_HEADER = typeof INVALID_AUTH_HEADER

@CommandErrorDecorator(INVALID_AUTH_HEADER)
export class InvalidAuthHeaderError extends CommandError {}
