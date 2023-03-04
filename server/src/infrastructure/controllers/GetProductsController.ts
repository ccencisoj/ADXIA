import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { ProductMapper } from "../mappers/ProductMapper";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  GetProductsDTO, 
  GetProductsUseCase
} from "../../application";

interface GetProductsControllerDeps {
  getProductsUseCase: GetProductsUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class GetProductsController {
  public readonly route = "/products";

  protected readonly getProductsUseCase: GetProductsUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    getProductsUseCase,
    controllerErrorHandler
  }: GetProductsControllerDeps) {
    this.getProductsUseCase = getProductsUseCase;
    this.controllerErrorHandler = controllerErrorHandler;
  }

  public execute = async (req: HttpRequest, res: HttpReponse): Promise<void> => {
    try {
      const employeeTokenOrError = await getEmployeeToken(req);

      if(employeeTokenOrError.isFailure) {
        throw new EmployeeTokenException(employeeTokenOrError.getError() as string);
      }

      const reqData = {
        skip: Number(req.query.skip),
        limit: Number(req.query.limit),
        searchValue: req.query.search,
        employeeToken: employeeTokenOrError.getValue()
      } as GetProductsDTO;

      const products = await this.getProductsUseCase.execute(reqData);
      
      const productJSON = products.map((product)=> ProductMapper.toJSON(product));

      res.json({products: productJSON});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
