import { BasePrimitive } from './BasePrimitive'

export type CustomPrimitive<T extends BasePrimitive, Tag extends string> = T &
  Tag
