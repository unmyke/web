import { registerEnumType } from 'type-graphql'

export enum Status {
  SUCCESS = 'Success',
  FAIL = 'Fail',
}

registerEnumType(Status, {
  name: 'STATUS',
  description: 'Status of mutation',
})
