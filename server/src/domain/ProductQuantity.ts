import Joi from 'joi';
import { Result } from "./common/Result";
import { ValueObject } from "./common/ValueObject";

const ProductQuantityValidator = Joi.number();

interface ProductQuantityProps {
  value: number;
}

export class ProductQuantity extends ValueObject<ProductQuantityProps> {
  public get value(): number {
    return this.props.value;
  }

  private constructor(props: ProductQuantityProps) {
    super(props);
  }

  public static create = (value: number): Result<ProductQuantity> => {
    const validationResult = ProductQuantityValidator.validate(value);

    if(validationResult.error) {
      return Result.fail<ProductQuantity>(validationResult.error.message);
    }

    const productQuantity = new ProductQuantity({value});

    return Result.ok<ProductQuantity>(productQuantity);
  }
}
