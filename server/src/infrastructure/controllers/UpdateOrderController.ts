import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { UpdateOrderDTO, UpdateOrderUseCase } from "../../application";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler"
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";

interface UpdateOrderControllerDeps {
  updateOrderUseCase: UpdateOrderUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class UpdateOrderController {
  public readonly route = "/order";

  protected readonly updateOrderUseCase: UpdateOrderUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    updateOrderUseCase,
    controllerErrorHandler
  }: UpdateOrderControllerDeps) {
    this.updateOrderUseCase = updateOrderUseCase;
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
        clientId: req.body.clientId,
        products: req.body.products,
        deliveryState: req.body.deliveryState,
        employeeToken: employeeTokenOrError.getValue()
      } as UpdateOrderDTO;

      await this.updateOrderUseCase.execute(reqData);

      res.json({updated: true});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
