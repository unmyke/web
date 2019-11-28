import { ProfileNotFoundError } from './ProfileNotFoundError'
import { UserNotFoundError } from '@backend/common'

export type DeleteProfileErrors = UserNotFoundError | ProfileNotFoundError
