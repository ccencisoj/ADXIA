import { Employee } from "../Employee";
import { DomainEvent } from "../common/DomainEvent";

export class DeletedEmployeeEvent extends DomainEvent {
  public constructor(employee: Employee) {
    super("DeleteEmployeeEvent", employee.id);
  }
}
