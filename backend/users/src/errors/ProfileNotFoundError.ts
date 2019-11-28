import { CommandError, CommandErrorDecorator } from '@backend/common'

const PROFILE_NOT_FOUND = 'Profile not found'
type PROFILE_NOT_FOUND = typeof PROFILE_NOT_FOUND

@CommandErrorDecorator(PROFILE_NOT_FOUND)
export class ProfileNotFoundError extends CommandError {}
