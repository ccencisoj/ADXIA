import Joi from 'joi';
import { Result } from "./common/Result";
import { ValueObject } from "./common/ValueObject";

const ProductNameValidator = Joi.string().min(1).max(32);

interface ProductNameProps {
  value: string;
}

export class ProductName extends ValueObject<ProductNameProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: ProductNameProps) {
    super(props);
  }

  public static create = (value: string): Result<ProductName> => {
    const validationResult = ProductNameValidator.validate(value);

    if(validationResult.error) {
      return Result.fail<ProductName>(validationResult.error.message);
    }

    const productName = new ProductName({value});

    return Result.ok<ProductName>(productName);
  }
}
