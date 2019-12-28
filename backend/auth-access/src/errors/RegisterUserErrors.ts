import { PasswordMismatchError } from './PasswordMismatchError'
import { UserExistsError } from '@backend/common'

export type RegisterUserErrors = UserExistsError | PasswordMismatchError
