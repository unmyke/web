import { User } from '@backend/common'

export class SendSupportMailCommand {
  constructor(public readonly user: User) {}
}
