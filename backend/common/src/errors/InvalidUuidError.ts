import { CommandError } from './CommandError'
import { CommandErrorDecorator } from './CommandErrorDecorator'

const INVALID_UUID = 'Invalid uuid'
type INVALID_UUID = typeof INVALID_UUID

@CommandErrorDecorator(INVALID_UUID)
export class InvalidUuidError extends CommandError {}
