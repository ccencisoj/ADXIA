import { Employee } from "../Employee";
import { DomainEvent } from "../common/DomainEvent";

export class UpdatedEmployeeEvent extends DomainEvent {
  public constructor(employee: Employee) {
    super("UpdatedEmployeeEvent", employee.id);
  }
}
