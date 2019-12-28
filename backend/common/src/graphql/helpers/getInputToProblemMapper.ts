import { ProblemInterface, ProblemClass } from '../interfaces'

export type InputToProblem<TProblem extends ProblemInterface, TInput> = (
  input: TInput,
) => Omit<TProblem, 'message'>

export type InputToProblemMapper<
  TProblem extends ProblemInterface,
  TProblemClass extends ProblemClass<TProblem>,
  TInput,
  TInputToProblem extends InputToProblem<TProblem, TInput>
> = {
  Problem: TProblemClass
  inputToProblem: TInputToProblem
}

export const getInputToProblemMapper = <
  TProblem extends ProblemInterface,
  TProblemClass extends ProblemClass<TProblem>,
  TInput,
  TInputToProblem extends InputToProblem<TProblem, TInput>
>(
  Problem: TProblemClass,
  inputToProblem: TInputToProblem,
): InputToProblemMapper<TProblem, TProblemClass, TInput, TInputToProblem> => ({
  Problem,
  inputToProblem,
})
