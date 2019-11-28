import { ProfileExistsError } from './ProfileExistsError'
import { UserNotFoundError } from '@backend/common'

export type UpdateProfileErrors = UserNotFoundError | ProfileExistsError
