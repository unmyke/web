import { InterfaceType, Field } from 'type-graphql'
import { CommandError, CommandErrorClass } from '../../errors'

@InterfaceType()
export abstract class ProblemInterface {
  public static readonly Error?: CommandErrorClass<CommandError>

  @Field()
  message: string
}

export type ProblemClass<TProblem extends ProblemInterface> = (new (
  ...args: any[]
) => TProblem) & {
  Error?: CommandErrorClass<CommandError>
}
