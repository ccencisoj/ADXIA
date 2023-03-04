import { DomainEvent } from './DomainEvent';
import { AggregateRoot } from "./AggregateRoot";

type Handler = (event: DomainEvent)=> void; 

export class DomainEvents {
  public static handlers: Handler[] = [];
  
  public static register = (handler: Handler)=> {
    this.handlers.push(handler);
  }

  public static dispatchEvents = (aggregate: AggregateRoot<any>)=> {
    aggregate.domainEvents.forEach((event)=> this.dispatch(event));
  }

  public static dispatch = (event: DomainEvent)=> {
    this.handlers.forEach((handler)=> handler(event));
  }
}
