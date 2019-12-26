import { Observable } from 'rxjs'
import { filter, map, first } from 'rxjs/operators'

import { EventBus, CommandBus } from '@nestjs/cqrs'
import { EventInterface, FailCommandEventInterface } from '../events'
import { CommandInterface } from '../commands'

import {
  ProblemInterface,
  SuccessMutationPayload,
  FailMutationPayload,
  mapProblemToMutationPayload,
  ValidationProblemGqlType,
} from '../../graphql'

import { CommandError as BaseCommandError } from '../../errors'
import { transformAndValidate, ClassType } from 'class-transformer-validator'
import { ValidationError } from 'class-validator'
import { ValidationFailedEvent } from '../events'

export type ResolverClassOptions = {
  eventBus: EventBus
  commandBus: CommandBus
}

export type EventToPayload<Resource, Event extends EventInterface> = (
  event: Event,
) => SuccessMutationPayload<Resource>
export type ErrorsHandler<
  CommandError extends Error,
  Input,
  Problem extends ProblemInterface
> = (error: CommandError, input: Input) => Problem

export type ResolverOptions<
  Resource extends object,
  Input extends object,
  Command extends CommandInterface,
  SuccessEvent extends EventInterface,
  CommandError extends BaseCommandError,
  Problem extends ProblemInterface
> = {
  InputCtor: ClassType<Input>
  input: Input
  command: Command
  eventToPayload: (event: SuccessEvent) => SuccessMutationPayload<Resource>
  errorsToProblem: (error: CommandError | Error, input: Input) => Problem
}

export type ResolverObservable<
  Resource,
  Problem extends ProblemInterface
> = Observable<SuccessMutationPayload<Resource> | FailMutationPayload<Problem>>

export type ResolverObservableHandler = <
  Resource extends object,
  Input extends object,
  Command extends CommandInterface,
  SuccessEvent extends EventInterface,
  CommandError extends BaseCommandError,
  Problem extends ProblemInterface
>(
  resolverOpts: ResolverOptions<
    Resource,
    Input,
    Command,
    SuccessEvent,
    CommandError,
    Problem
  >,
) => ResolverObservable<Resource, Problem>

const isValidationFailedEvent = (
  event: EventInterface,
): event is ValidationFailedEvent => {
  return Boolean(
    (event as ValidationFailedEvent).errors &&
      Array.isArray((event as ValidationFailedEvent).errors),
  )
}

export const getResolverObservable = ({
  eventBus,
  commandBus,
}: ResolverClassOptions): ResolverObservableHandler => <
  Resource extends object,
  Input extends object,
  Command extends CommandInterface,
  SuccessEvent extends EventInterface,
  FailEvent extends FailCommandEventInterface,
  CommandError extends BaseCommandError,
  Problem extends ProblemInterface
>({
  InputCtor,
  input,
  command,
  eventToPayload,
  errorsToProblem,
}: ResolverOptions<
  Resource,
  Input,
  Command,
  SuccessEvent,
  CommandError,
  Problem
>): ResolverObservable<Resource, Problem> => {
  transformAndValidate(InputCtor, input).then(
    () => {
      commandBus.execute(command)
    },
    (errors: ValidationError[]) => {
      eventBus.publish(new ValidationFailedEvent(command, errors))
    },
  )

  const isFailEvent = (event: EventInterface): event is FailEvent => {
    return (event as FailEvent).error instanceof Error
  }

  return eventBus.pipe(
    filter((event: EventInterface): boolean => {
      return event.command.id === command.id
    }),
    map((event: SuccessEvent | FailEvent | ValidationFailedEvent):
      | SuccessMutationPayload<Resource>
      | FailMutationPayload<Problem> => {
      if (isFailEvent(event)) {
        const { error } = event
        return mapProblemToMutationPayload([errorsToProblem(error, input)])
      }
      if (isValidationFailedEvent(event)) {
        const { errors } = event
        return mapProblemToMutationPayload([
          new ValidationProblemGqlType(errors),
        ])
      }

      return eventToPayload(event)
    }),
    first(),
  )
}
