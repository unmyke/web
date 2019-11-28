import { Uuid, BaseCommand } from '@backend/common'

export class CreateProfileCommand extends BaseCommand {
  constructor(
    public readonly userId: Uuid,
    public readonly firstName: string,
    public readonly lastName: string,
  ) {
    super()
  }
}
