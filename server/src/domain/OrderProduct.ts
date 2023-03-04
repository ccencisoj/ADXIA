import { Result } from "./common/Result";
import { ProductBrand } from "./ProductBrand";
import { ProductName } from "./ProductName";
import { ProductPrice } from "./ProductPrice";
import { ProductQuantity } from "./ProductQuantity";
import { AggregateRoot } from "./common/AggregateRoot";

interface OrderProductProps {
  orderId: string;
  productId: string;
  name: ProductName;
  brand: ProductBrand;
  quantity: ProductQuantity;
  price: ProductPrice;
  imageURL: string;
  description: string;
  grammage: string;
}

export class OrderProduct extends AggregateRoot<OrderProductProps> {
  public get id(): string {
    return this._id;
  }

  public get orderId(): string {
    return this.props.orderId;
  }

  public get productId(): string {
    return this.props.productId;
  }

  public get name(): string {
    return this.props.name.value;
  }

  public get brand(): string {
    return this.props.brand.value;
  }

  public get quantity(): number {
    return this.props.quantity.value;
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

  private constructor(props: OrderProductProps, id?: string) {
    super(props, id);
  }

  public static create = (props: OrderProductProps, id?: string): Result<OrderProduct> => {
    const orderProduct = new OrderProduct(props, id);

    return Result.ok<OrderProduct>(orderProduct);
  }
}
