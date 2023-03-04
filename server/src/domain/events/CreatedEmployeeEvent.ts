import { Employee } from "../Employee";
import { DomainEvent } from "../common/DomainEvent";

export class CreatedEmployeeEvent extends DomainEvent {
  public constructor(employee: Employee) {
    super("CreatedEmployeeEvent", employee.id);
  }
}
