import { Client } from "../Client";
import { DomainEvent } from "../common/DomainEvent";

export class DeletedClientEvent extends DomainEvent {
  public constructor(client: Client) {
    super("DeleteClientEvent", client.id);
  }
}
