import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  DeleteProductDTO, 
  DeleteProductUseCase
} from "../../application";

interface DeleteProductControllerDeps {
  deleteProductUseCase: DeleteProductUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class DeleteProductController {
  public readonly route = "/product";

  protected readonly deleteProductUseCase: DeleteProductUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    deleteProductUseCase,
    controllerErrorHandler
  }: DeleteProductControllerDeps) {
    this.deleteProductUseCase = deleteProductUseCase;
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
      } as DeleteProductDTO;

      await this.deleteProductUseCase.execute(reqData);

      res.json({deleted: true});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
