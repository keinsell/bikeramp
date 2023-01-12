import { nanoid } from 'nanoid'

/**
 * Entities are pretty much the bread and butter of domain modeling.
 *
 * They are the objects that represent the data that is being manipulated by the application.
 *
 * @version 1.0.1
 * @author Jakub "keinsell" Olan <keinsell@protonmail.com>
 * @see [Understanding Domain Entities](https://khalilstemmler.com/articles/typescript-domain-driven-design/entities/)
 * @link https://github.com/keinsell/neuronek/blob/9c48ddb0be0eb4500eea98a10a12d2b899fcaaa7/packages/common/src/domain/entity/index.ts
 */
export class Entity<T = any> {
  /** Automatically generated (or imported) id of specific entity. Used to reference right object in persistence layer. */
  public readonly id: string | number | any
  protected readonly properties: T

  constructor(properties: T, id?: string | number | any) {
    this.properties = properties
    this.id = id ?? nanoid()
  }
}