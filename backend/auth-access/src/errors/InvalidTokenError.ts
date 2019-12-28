import { CommandError, CommandErrorDecorator } from '@backend/common'

const INVALID_TOKEN = 'Invalid token'
type INVALID_TOKEN = typeof INVALID_TOKEN

@CommandErrorDecorator(INVALID_TOKEN)
export class InvalidTokenError extends CommandError {}
