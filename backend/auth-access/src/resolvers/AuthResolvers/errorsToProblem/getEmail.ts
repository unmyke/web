import { Email } from '@backend/common'

export const getEmail = <Input extends { email: Email }>({
  email,
}: Input): { email: Email } => ({
  email,
})
