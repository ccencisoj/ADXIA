import { Result } from "./common/Result";
import { ValueObject } from "./common/ValueObject";

interface EmployeeTypeProps {
  value: string;
}

export class EmployeeType extends ValueObject<EmployeeTypeProps> {
  public static ADMIN = "ADMIN";
  public static VENDOR = "VENDOR";
  public static DELIVERER = "DELIVERER";

  public get value(): string {
    return this.props.value;
  }

  private constructor(props: EmployeeTypeProps) {
    super(props);
  }

  public static create = (value: string): Result<EmployeeType> => {

    if(!([EmployeeType.ADMIN, EmployeeType.VENDOR, EmployeeType.DELIVERER].includes(value))) {
      return Result.fail<EmployeeType>("The type must be ADMIN, VENDOR or DELIVERER");
    }

    const employeeType = new EmployeeType({value});

    return Result.ok<EmployeeType>(employeeType);
  }
}
