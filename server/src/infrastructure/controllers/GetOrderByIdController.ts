import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { OrderMapper } from "../mappers/OrderMapper";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  GetOrderByIdDTO, 
  GetOrderByIdUseCase
} from "../../application";

interface GetOrderByIdControllerDeps {
  getOrderByIdUseCase: GetOrderByIdUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class GetOrderByIdController {
  public readonly route = "/order";

  protected readonly getOrderByIdUseCase: GetOrderByIdUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    getOrderByIdUseCase,
    controllerErrorHandler
  }: GetOrderByIdControllerDeps) {
    this.getOrderByIdUseCase = getOrderByIdUseCase;
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
      } as GetOrderByIdDTO;

      const order = await this.getOrderByIdUseCase.execute(reqData);

      const orderJSON = OrderMapper.toJSON(order);

      res.json({order: orderJSON});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
