import { UserContext, CustomPrimitive } from '@backend/common'

export type Сredentials = {
  email: string
  password: string
}

export type Token = CustomPrimitive<string, 'Token'>
export type EmailError = {
  email: string
}
export type PasswordError = {
  password: string
}
export type EmailErrorResponse = {
  errors: EmailError
}
export type PasswordErrorResponse = {
  errors: PasswordError
}

export type ErrorResponse = EmailErrorResponse | PasswordErrorResponse
export type LoginTokensResponse = {
  accessToken: UserContext
}
export type LoginResponse = LoginTokensResponse | ErrorResponse

export type LoginTokens = {
  accessToken: UserContext
}
