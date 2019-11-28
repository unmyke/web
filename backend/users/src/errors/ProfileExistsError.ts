import { CommandError, CommandErrorDecorator } from '@backend/common'

const PROFILE_EXISTS = 'Profile already exists'
type PROFILE_EXISTS = typeof PROFILE_EXISTS

@CommandErrorDecorator(PROFILE_EXISTS)
export class ProfileExistsError extends CommandError {}
