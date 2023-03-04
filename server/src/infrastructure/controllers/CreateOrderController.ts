import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { OrderMapper } from "../mappers/OrderMapper";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  CreateOrderDTO, 
  CreateOrderUseCase
} from "../../application";

interface CreateOrderControllerDeps {
  createOrderUseCase: CreateOrderUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class CreateOrderController {
  public readonly route = "/order";

  protected readonly createOrderUseCase: CreateOrderUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    createOrderUseCase,
    controllerErrorHandler
  }: CreateOrderControllerDeps) {
    this.createOrderUseCase = createOrderUseCase;
    this.controllerErrorHandler = controllerErrorHandler;
  }

  public execute = async (req: HttpRequest, res: HttpReponse): Promise<void> => {
    try {

      const employeeTokenOrError = await getEmployeeToken(req);

      if(employeeTokenOrError.isFailure) {
        throw new EmployeeTokenException(employeeTokenOrError.getError() as string);
      }

      const reqData = {
        clientId: req.body.clientId,
        products: req.body.products,
        employeeToken: employeeTokenOrError.getValue()
      } as CreateOrderDTO;

      const order = await this.createOrderUseCase.execute(reqData);
      
      const orderJSON = OrderMapper.toJSON(order);

      res.json({order: orderJSON});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
