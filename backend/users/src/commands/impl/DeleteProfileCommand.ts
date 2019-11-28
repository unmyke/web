import { Uuid, BaseCommand } from '@backend/common'

export class DeleteProfileCommand extends BaseCommand {
  constructor(public readonly userId: Uuid) {
    super()
  }
}
