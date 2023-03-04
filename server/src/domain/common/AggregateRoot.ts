import { Entity } from '../common/Entity';
import { DomainEvent } from './DomainEvent';

export class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent[] = [];

  public get domainEvents() {
    return this._domainEvents;
  }

  public constructor(props: T, id?: string) {
    super(props, id);
  }

  public addDomainEvent = (event: DomainEvent)=> {
    this._domainEvents.push(event);
  }
}
