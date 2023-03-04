import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { ProductMapper } from "../mappers/ProductMapper";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  GetProductByIdDTO, 
  GetProductByIdUseCase
} from "../../application";

interface GetProductByIdControllerDeps {
  getProductByIdUseCase: GetProductByIdUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class GetProductByIdController {
  public readonly route = "/product";

  protected readonly getProductByIdUseCase: GetProductByIdUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    getProductByIdUseCase,
    controllerErrorHandler
  }: GetProductByIdControllerDeps) {
    this.getProductByIdUseCase = getProductByIdUseCase;
    this.controllerErrorHandler = controllerErrorHandler;
  }

  public execute = async (req: HttpRequest, res: HttpReponse): Promise<void> => {
    try {
      const employeeTokenOrError = await getEmployeeToken(req);

      if(employeeTokenOrError.isFailure) {
        throw new EmployeeTokenException(employeeTokenOrError.getError() as string);
      }

      const reqData = {
        productId: req.query.productId,
        employeeToken: employeeTokenOrError.getValue()
      } as GetProductByIdDTO;

      const product = await this.getProductByIdUseCase.execute(reqData);

      const productJSON = ProductMapper.toJSON(product);

      res.json({product: productJSON});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
