import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  DeleteOrderDTO, 
  DeleteOrderUseCase
} from "../../application";

interface DeleteOrderControllerDeps {
  deleteOrderUseCase: DeleteOrderUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class DeleteOrderController {
  public readonly route = "/order";

  protected readonly deleteOrderUseCase: DeleteOrderUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    deleteOrderUseCase,
    controllerErrorHandler
  }: DeleteOrderControllerDeps) {
    this.deleteOrderUseCase = deleteOrderUseCase;
    this.controllerErrorHandler = controllerErrorHandler;
  }

  public execute = async (req: HttpRequest, res: HttpReponse): Promise<void> => {
    try {

      const employeeTokenOrError = await getEmployeeToken(req);

      if(employeeTokenOrError.isFailure) {
        throw new EmployeeTokenException(employeeTokenOrError.getError() as string);
      }

      const reqData = {
        orderId: req.query.orderId,
        employeeToken: employeeTokenOrError.getValue()
      } as DeleteOrderDTO;

      await this.deleteOrderUseCase.execute(reqData);

      res.json({deleted: true});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
