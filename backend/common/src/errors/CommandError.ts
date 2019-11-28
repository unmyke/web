export const COMMAND_ERROR = 'Command Error'
export type COMMAND_ERROR = typeof COMMAND_ERROR

export abstract class CommandError extends Error {
  public readonly errorType: COMMAND_ERROR = COMMAND_ERROR
}

export type CommandErrorClass<CE extends CommandError> = new (
  ...args: any[]
) => CE
