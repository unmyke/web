import { PasswordMismatchError } from './PasswordMismatchError'
import { UserNotFoundError } from '@backend/common'

export type LoginUserErrors = UserNotFoundError | PasswordMismatchError
