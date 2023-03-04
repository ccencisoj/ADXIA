import { EmployeeType, Product } from "../../../domain";
import { GetProductByIdDTO } from "./GetProductByIdDTO";
import { IProductRepository } from "../../repositories/IProductRepository";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { ProductNoFoundException } from "../../exceptions/ProductNoFoundException";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";

type Response = Promise<Product>;

interface GetProductByIdUseCaseDeps {
  productRepository: IProductRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class GetProductByIdUseCase {
  protected readonly productRepository: IProductRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    productRepository,
    employeeTokenService
  }: GetProductByIdUseCaseDeps) {
    this.productRepository = productRepository;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: GetProductByIdDTO): Response => {
    const decodedEmployeeOrError = this.employeeTokenService.decode(req.employeeToken);

    if(decodedEmployeeOrError.isFailure) {
      throw new EmployeeCredentialsException(decodedEmployeeOrError.getError() as string);
    }

    const decodedEmployee = decodedEmployeeOrError.getValue();

    if(!(decodedEmployee.type === EmployeeType.ADMIN ||
      decodedEmployee.type === EmployeeType.VENDOR ||
      decodedEmployee.type === EmployeeType.DELIVERER)) {
      throw new EmployeeActionNoAllowedException();
    }

    const product = await this.productRepository.findOne({id: req.productId});
    const productFound = !!product;

    if(!productFound) {
      throw new ProductNoFoundException();
    }

    return product;
  }
}