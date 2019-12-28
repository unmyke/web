import { BasePrimitive, CustomPrimitive } from '../../dto'
import { ScalarInterface, ScalarClass } from '../scalars'

export const primitiveToScalar = <
  CP extends CustomPrimitive<BasePrimitive, string>
>(
  Scalar: ScalarClass<CP>,
): ((value: CP) => ScalarInterface<CP>) => (value: CP): ScalarInterface<CP> =>
  new Scalar(value)
