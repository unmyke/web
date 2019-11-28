import { CommandError } from './CommandError'
import { CommandErrorDecorator } from './CommandErrorDecorator'

const USER_NOT_FOUND = 'User not found'
type USER_NOT_FOUND = typeof USER_NOT_FOUND

@CommandErrorDecorator(USER_NOT_FOUND)
export class UserNotFoundError extends CommandError {}
