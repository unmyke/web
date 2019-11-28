import { CommandError, COMMAND_ERROR } from './CommandError'

export const CommandErrorDecorator = (errMsg: string) => {
  type ErrMsg = typeof errMsg

  return function errorClassDecorator<
    T extends new (...args: any[]) => CommandError
  >(constructor: T) {
    return class extends constructor {
      message: ErrMsg = errMsg
      errorType: COMMAND_ERROR = COMMAND_ERROR
    }
  }
}
