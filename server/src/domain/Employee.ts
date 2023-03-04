import { DateTime } from "./DateTime";
import { Result } from "./common/Result";
import { PersonName } from "./PersonName";
import { PersonEmail } from "./PersonEmail";
import { PersonSurname } from "./PersonSurname";
import { EmployeeType } from "./EmployeeType";
import { PersonDocument } from "./PersonDocument";
import { AggregateRoot } from "./common/AggregateRoot";
import { CreatedEmployeeEvent } from "./events/CreatedEmployeeEvent";

interface EmployeeProps {
  name: PersonName;
  surname: PersonSurname;
  email: PersonEmail;
  nroDocument: PersonDocument;
  birthDate: DateTime;
  imageURL: string;
  type: EmployeeType;
  accessCode: string;
  phone: string;
}

export class Employee extends AggregateRoot<EmployeeProps> {
  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name.value;
  }

  public get surname(): string {
    return this.props.surname.value;
  }

  public get email(): string {
    return this.props.email.value;
  }

  public get nroDocument(): string {
    return this.props.nroDocument.value;
  }

  public get birthDate(): string {
    return this.props.birthDate.value;
  }

  public get imageURL(): string {
    return this.props.imageURL;
  }

  public get type(): string {
    return this.props.type.value;
  }

  public get accessCode(): string {
    return this.props.accessCode;
  }

  public get phone(): string {
    return this.props.phone;
  }

  private constructor(props: EmployeeProps, id?: string) {
    super(props, id);
  }

  public static create = (props: EmployeeProps, id?: string): Result<Employee> => {
    const employee = new Employee(props, id);
    
    // Si el id es null o undefined entonces el empleado es nuevo
    const isNewEmployee = !!id;

    if(isNewEmployee) {
      employee.addDomainEvent(new CreatedEmployeeEvent(employee));
    }

    return Result.ok<Employee>(employee);
  }
}
