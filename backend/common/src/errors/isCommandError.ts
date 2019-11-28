import { CommandError, COMMAND_ERROR } from './CommandError'

export const isCommandError = (
  error: CommandError | Error,
): error is CommandError => (error as CommandError).errorType === COMMAND_ERROR
