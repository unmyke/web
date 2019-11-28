import { CommandError } from './CommandError'
import { CommandErrorDecorator } from './CommandErrorDecorator'

const USER_EXISTS = 'User already exists'
type USER_EXISTS = typeof USER_EXISTS

@CommandErrorDecorator(USER_EXISTS)
export class UserExistsError extends CommandError {}
