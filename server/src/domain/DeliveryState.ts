import { Result } from "./common/Result";
import { ValueObject } from "./common/ValueObject";

interface DeliveryStateProps {
  value: string;
}

export class DeliveryState extends ValueObject<DeliveryStateProps> {
  public static DELIVERED = "DELIVERED";
  public static NO_DELIVERED = "NO_DELIVERED";

  public get value(): string {
    return this.props.value;
  }

  private constructor(props: DeliveryStateProps) {
    super(props);
  }

  public static create = (value: string): Result<DeliveryState> => {

    if(!([DeliveryState.DELIVERED, DeliveryState.NO_DELIVERED].includes(value))) {
      return Result.fail<DeliveryState>("The delivery state must be DELIVERED or NO_DELIVERED");
    }

    const deliveryState = new DeliveryState({value});

    return Result.ok<DeliveryState>(deliveryState);
  }
}
