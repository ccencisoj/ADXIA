import { Result } from "./common/Result";
import { ValueObject } from "./common/ValueObject";

interface DateTimeProps {
  value: string;
}

export class DateTime extends ValueObject<DateTimeProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: DateTimeProps) {
    super(props);
  }

  public static create = (value: string): Result<DateTime> => {
    const dateTime = new DateTime({value});

    return Result.ok<DateTime>(dateTime);
  }

  public static current = (): string => { 
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }
}
