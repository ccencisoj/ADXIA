import { Client } from "../Client";
import { DomainEvent } from "../common/DomainEvent";

export class UpdatedClientEvent extends DomainEvent {
  public constructor(client: Client) {
    super("UpdatedClientEvent", client.id);
  }
}
