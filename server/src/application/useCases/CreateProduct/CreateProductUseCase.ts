import { CreateProductDTO } from "./CreateProductDTO";
import { ProductException } from "../../exceptions/ProductException";
import { IProductRepository } from "../../repositories/IProductRepository";
import { ValidationException } from "../../exceptions/ValidationException";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { ProductNameAlreadyInUseException } from "../../exceptions/ProductNameAlreadyInUseException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";
import { 
  Result,
  Product, 
  ProductName, 
  ProductPrice, 
  ProductBrand, 
  ProductQuantity,
  DomainEvents,
  EmployeeType
} from "../../../domain";

type Response = Promise<Product>;

interface CreateProductUseCaseDeps {
  productRepository: IProductRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class CreateProductUseCase {
  protected readonly productRepository: IProductRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    productRepository,
    employeeTokenService
  }: CreateProductUseCaseDeps) {
    this.productRepository = productRepository;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: CreateProductDTO): Response => {
    const decodedEmployeeOrError = this.employeeTokenService.decode(req.employeeToken);

    if(decodedEmployeeOrError.isFailure) {
      throw new EmployeeCredentialsException(decodedEmployeeOrError.getError() as string);
    }

    const decodedEmployee = decodedEmployeeOrError.getValue();

    if(!(decodedEmployee.type === EmployeeType.ADMIN )) {
      throw new EmployeeActionNoAllowedException();
    }

    const product = await this.productRepository.findOne({name: req.name});
    const productFound = !!product;

    if(productFound) {
      throw new ProductNameAlreadyInUseException(product);
    }

    const nameOrError = ProductName.create(req.name);
    const brandOrError = ProductBrand.create(req.brand);
    const avaliableQuantityOrError = ProductQuantity.create(req.avaliableQuantity);
    const priceOrError = ProductPrice.create(req.price);
    const combinedResult = Result.combine([
      nameOrError,
      brandOrError,
      avaliableQuantityOrError,
      priceOrError
    ]);

    if(combinedResult.isFailure) {
      throw new ValidationException(combinedResult.getError() as string);
    }

    const newProductOrError = Product.create({
      name: nameOrError.getValue(),
      brand: brandOrError.getValue(),
      avaliableQuantity: avaliableQuantityOrError.getValue(),
      price: priceOrError.getValue(),
      imageURL: req.imageURL,
      description: req.description,
      grammage: req.grammage
    });

    if(newProductOrError.isFailure) {
      throw new ProductException(newProductOrError.getError() as string);
    } 

    const newProduct = newProductOrError.getValue();

    await this.productRepository.save(newProduct);

    DomainEvents.dispatchEvents(newProduct);

    return newProduct;
  }
}
