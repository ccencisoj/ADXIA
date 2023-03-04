export class DomainEvent {
  public readonly name: string;
  public readonly aggregateId: string;
  public readonly dateTimeOccurred: Date;

  public constructor(name: string, aggregateId: string) {
    this.name = name;
    this.aggregateId = aggregateId;
    this.dateTimeOccurred = new Date();
  }
}
