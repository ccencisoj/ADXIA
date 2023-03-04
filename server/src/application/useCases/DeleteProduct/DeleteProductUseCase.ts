import { DeleteProductDTO } from "./DeleteProductDTO";
import { IProductRepository } from "../../repositories/IProductRepository";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { DeletedProductEvent, DomainEvents, EmployeeType } from "../../../domain";
import { ProductNoFoundException } from "../../exceptions/ProductNoFoundException";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";

type Response = Promise<void>;

interface DeleteProductUseCaseDeps {
  productRepository: IProductRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class DeleteProductUseCase {
  protected readonly productRepository: IProductRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    productRepository,
    employeeTokenService
  }: DeleteProductUseCaseDeps) {
    this.productRepository = productRepository;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: DeleteProductDTO): Response => {
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

    await this.productRepository.delete(product);

    product.addDomainEvent(new DeletedProductEvent(product));

    DomainEvents.dispatchEvents(product);
  }
}
