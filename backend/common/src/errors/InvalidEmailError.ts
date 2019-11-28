import { CommandError } from './CommandError'
import { CommandErrorDecorator } from './CommandErrorDecorator'

const INVALID_EMAIL = 'Invalid email'
type INVALID_EMAIL = typeof INVALID_EMAIL

@CommandErrorDecorator(INVALID_EMAIL)
export class InvalidEmailError extends CommandError {}
