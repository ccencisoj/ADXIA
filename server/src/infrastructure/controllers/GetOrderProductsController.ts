import { HttpRequest } from '../http/HttpRequest';
import { HttpReponse } from '../http/HttpResponse';
import { OrderProductMapper } from '../mappers/OrderProductMapper';
import { getEmployeeToken } from '../helpers/getEmployeeToken';
import { EmployeeTokenException } from '../exceptions/EmployeeTokenException';
import { ControllerErrorHandler } from '../errorHandlers/ControllerErrorHandler';
import { GetOrderProductsDTO, GetOrderProductsUseCase } from '../../application';

interface GetOrderProductsControllerDeps {
  getOrderProductsUseCase: GetOrderProductsUseCase;
  controllerErrorHandler: ControllerErrorHandler
}

export class GetOrderProductsController {
  public readonly route = "/order/products";

  protected readonly getOrderProductsUseCase: GetOrderProductsUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    getOrderProductsUseCase, 
    controllerErrorHandler
  }: GetOrderProductsControllerDeps) {
    this.getOrderProductsUseCase = getOrderProductsUseCase;
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
        skip: Number(req.query.skip),
        limit: Number(req.query.limit),
        employeeToken: employeeTokenOrError.getValue()
      } as GetOrderProductsDTO;

      const orderProducts = await this.getOrderProductsUseCase.execute(reqData);

      const orderProductsJSON = orderProducts.map((orderProduct)=> {
        return OrderProductMapper.toJSON(orderProduct);
      });

      res.json({products: orderProductsJSON});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
