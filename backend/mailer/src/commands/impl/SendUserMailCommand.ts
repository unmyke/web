import { User } from '@backend/common'

export class SendUserMailCommand {
  constructor(public readonly user: User) {}
}
