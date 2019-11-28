import { Uuid, BaseCommand } from '@backend/common'

export class UpdateProfileCommand extends BaseCommand {
  constructor(
    public readonly userId: Uuid,
    public readonly firstName?: string,
    public readonly lastName?: string,
  ) {
    super()
  }
}
