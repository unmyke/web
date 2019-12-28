import { plainToClass } from 'class-transformer'
import { CommandError } from '../../errors'
import { ProblemInterface, ProblemClass } from '../interfaces'
import { ServerProblemGqlType } from '../types'
import { InputToProblem, InputToProblemMapper } from './getInputToProblemMapper'

export const getErrorToProblemMapper = <
  TProblem extends ProblemInterface,
  TProblemClass extends ProblemClass<TProblem>,
  TInput
>(
  inputToProblemMappers: Array<
    InputToProblemMapper<
      TProblem,
      TProblemClass,
      TInput,
      InputToProblem<TProblem, TInput>
    >
  >,
): ((error: CommandError | Error, input: TInput) => ProblemInterface) => (
  error: CommandError | Error,
  input: TInput,
): ProblemInterface => {
  const inputToProblemMapper = inputToProblemMappers.find(
    ({ Problem: CurrentProblem }): boolean =>
      CurrentProblem.Error !== undefined &&
      (error as CommandError) instanceof CurrentProblem.Error,
  )

  if (!inputToProblemMapper) {
    return plainToClass(ServerProblemGqlType, error)
  }
  const { Problem, inputToProblem } = inputToProblemMapper
  const plainObj = inputToProblem(input)
  return plainToClass(Problem, plainObj)
}
