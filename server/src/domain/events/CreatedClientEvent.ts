import { Client } from "../Client";
import { DomainEvent } from "../common/DomainEvent";

export class CreatedClientEvent extends DomainEvent {
  public constructor(client: Client) {
    super("CreatedClientEvent", client.id);
  }
}
