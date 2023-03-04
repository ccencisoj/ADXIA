import Joi from 'joi';
import { Result } from "./common/Result";
import { ValueObject } from "./common/ValueObject";

const ProductBrandValidator = Joi.string().min(1).max(32);

interface ProductBrandProps {
  value: string;
}

export class ProductBrand extends ValueObject<ProductBrandProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: ProductBrandProps) {
    super(props);
  }

  public static create = (value: string): Result<ProductBrand> => {
    const validationResult = ProductBrandValidator.validate(value);

    if(validationResult.error) {
      return Result.fail<ProductBrand>(validationResult.error.message);
    }

    const productBrand = new ProductBrand({value});

    return Result.ok<ProductBrand>(productBrand);
  }
}
