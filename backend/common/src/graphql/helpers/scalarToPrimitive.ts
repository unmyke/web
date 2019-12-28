import { BasePrimitive, CustomPrimitive } from '../../dto'
import { ScalarInterface } from '../scalars'

export const scalarToPrimitive = <
  CP extends CustomPrimitive<BasePrimitive, string>
>({
  value,
}: ScalarInterface<CP>): CP => value
