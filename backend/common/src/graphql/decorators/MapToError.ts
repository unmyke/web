import { CommandError, CommandErrorClass } from '../../errors'
import { ProblemInterface, ProblemClass } from '../interfaces'

export const MapToError = <ErrorClass extends CommandErrorClass<CommandError>>(
  Error: ErrorClass,
) => <
  Problem extends ProblemInterface,
  TargetClass extends ProblemClass<Problem>
>(
  Target: TargetClass,
) => {
  Target.Error = Error
  return Target
}
