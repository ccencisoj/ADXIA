import { UpdateProductDTO } from './UpdateProductDTO';
import { ProductException } from '../../exceptions/ProductException';
import { ValidationException } from '../../exceptions/ValidationException';
import { IProductRepository } from "../../repositories/IProductRepository";
import { IEmployeeTokenService } from '../../services/IEmployeeTokenService';
import { ProductNoFoundException } from '../../exceptions/ProductNoFoundException';
import { EmployeeCredentialsException } from '../../exceptions/EmployeeCredentialsException';
import { EmployeeActionNoAllowedException } from '../../exceptions/EmployeeActionNoAllowedException';
import { 
  Product, 
  Result, 
  DomainEvents, 
  ProductBrand, 
  ProductName, 
  ProductPrice, 
  ProductQuantity,
  UpdatedProductEvent, 
  EmployeeType
} from '../../../domain';

type Response = Promise<void>;

interface UpdateProductUseCaseDeps {
  productRepository: IProductRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class UpdateProductUseCase {
  protected readonly productRepository: IProductRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    productRepository, 
    employeeTokenService
  }: UpdateProductUseCaseDeps) {
    this.productRepository = productRepository;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: UpdateProductDTO): Response  => {
    const decodedEmployeeOrError = this.employeeTokenService.decode(req.employeeToken);

    if(decodedEmployeeOrError.isFailure) {
      throw new EmployeeCredentialsException(decodedEmployeeOrError.getError() as string);
    }

    const decodedEmployee = decodedEmployeeOrError.getValue();

    if(!(decodedEmployee.type === EmployeeType.ADMIN)) {
      throw new EmployeeActionNoAllowedException();
    }

    const product = await this.productRepository.findOne({id: req.productId});
    const productFound = !!product;

    if(!productFound) {
      throw new ProductNoFoundException();
    }

    const nameOrError = ProductName.create(req.name || product.name);
    const brandOrError = ProductBrand.create(req.brand || product.brand);
    const avaliableQuantityOrError = ProductQuantity.create(req.avaliableQuantity || product.avaliableQuantity);
    const priceOrError = ProductPrice.create(req.price || product.price);
    const combinedResult = Result.combine([
      nameOrError,
      brandOrError,
      avaliableQuantityOrError,
      priceOrError
    ]);

    if(combinedResult.isFailure) {
      throw new ValidationException(combinedResult.getError() as string);
    }

    const updatedProductOrError = Product.create({
      name: nameOrError.getValue(),
      brand: brandOrError.getValue(),
      avaliableQuantity: avaliableQuantityOrError.getValue(),
      price: priceOrError.getValue(),
      imageURL: req.imageURL,
      description: req.description,
      grammage: req.grammage
    }, product.id);

    if(updatedProductOrError.isFailure) {
      throw new ProductException(updatedProductOrError.getError() as string);
    }

    const updatedProduct = updatedProductOrError.getValue();

    await this.productRepository.save(updatedProduct);

    updatedProduct.addDomainEvent(new UpdatedProductEvent(updatedProduct));

    DomainEvents.dispatchEvents(updatedProduct);
  } 
}
