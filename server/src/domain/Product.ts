import { Result } from "./common/Result";
import { ProductName } from "./ProductName";
import { ProductBrand } from "./ProductBrand";
import { ProductPrice } from "./ProductPrice";
import { ProductQuantity } from "./ProductQuantity";
import { AggregateRoot } from "./common/AggregateRoot";
import { CreatedProductEvent } from "./events/CreatedProductEvent";

interface ProductProps {
  name: ProductName;
  brand: ProductBrand;
  avaliableQuantity: ProductQuantity;
  price: ProductPrice;
  imageURL: string;
  description: string;
  grammage: string;
}

export class Product extends AggregateRoot<ProductProps> {
  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name.value;
  }

  public get brand(): string {
    return this.props.brand.value;
  }

  public get avaliableQuantity(): number {
    return this.props.avaliableQuantity.value;
  }

  public get price(): number {
    return this.props.price.value;
  }
  
  public get imageURL(): string {
    return this.props.imageURL;
  }

  public get description(): string {
    return this.props.description;
  }

  public get grammage(): string {
    return this.props.grammage;
  }

  private constructor(props: ProductProps, id?: string) {
    super(props, id);
  }

  public static create = (props: ProductProps, id?: string)=> {
    const product = new Product(props, id);

    // Es un nuevo producto si el id es null o undefined
    const isNewProduct = !!id;

    if(isNewProduct) {
      product.addDomainEvent(new CreatedProductEvent(product));
    }

    return Result.ok<Product>(product);
  }
}
