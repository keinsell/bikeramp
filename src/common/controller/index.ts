export abstract class ControllerExecutor<T = unknown> {
  protected abstract executeImplementation(...arguments_: unknown[]): Promise<T>
}
