/**
 * The term Use Case is used to describe one of the potential ways that our software can be used.
 * @see [Better Software Design with Application Layer Use Cases](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-use-cases/)
 */
export abstract class Usecase<Request, Reply> {
  abstract execute(request: Request): Promise<Reply>
}
