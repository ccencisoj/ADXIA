import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { OrderMapper } from "../mappers/OrderMapper";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  GetOrdersDTO, 
  GetOrdersUseCase
} from "../../application";

interface GetOrdersControllerDeps {
  getOrdersUseCase: GetOrdersUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class GetOrdersController {
  public readonly route = "/orders";

  protected readonly getOrdersUseCase: GetOrdersUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    getOrdersUseCase,
    controllerErrorHandler
  }: GetOrdersControllerDeps) {
    this.getOrdersUseCase = getOrdersUseCase;
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
        deliveryState: req.query.deliveryState,
        employeeToken: employeeTokenOrError.getValue()
      } as GetOrdersDTO;

      const orders = await this.getOrdersUseCase.execute(reqData);
      
      const ordersJSON = orders.map((order)=> OrderMapper.toJSON(order));

      res.json({orders: ordersJSON});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
