import { Uuid } from '@backend/common'

export class GetUserQuery {
  constructor(public readonly id: Uuid) {}
}
