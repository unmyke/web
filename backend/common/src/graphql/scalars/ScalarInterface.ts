import { BasePrimitive, CustomPrimitive } from '../../dto'

export interface ScalarInterface<
  CP extends CustomPrimitive<BasePrimitive, string>
> {
  value: CP
}

export type ScalarClass<
  CP extends CustomPrimitive<BasePrimitive, string>
> = new (value: CP) => ScalarInterface<CP>
