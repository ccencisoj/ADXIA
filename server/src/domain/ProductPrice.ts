import Joi from 'joi';
import { Result } from "./common/Result";
import { ValueObject } from "./common/ValueObject";

const ProductPriceValidator = Joi.number();

interface ProductPriceProps {
  value: number;
}

export class ProductPrice extends ValueObject<ProductPriceProps> {
  public get value(): number {
    return this.props.value;
  }

  private constructor(props: ProductPriceProps) {
    super(props);
  }

  public static create = (value: number): Result<ProductPrice> => {
    const validationResult = ProductPriceValidator.validate(value);

    if(validationResult.error) {
      return Result.fail<ProductPrice>(validationResult.error.message);
    }

    const productPrice = new ProductPrice({value});

    return Result.ok<ProductPrice>(productPrice);
  }
}
