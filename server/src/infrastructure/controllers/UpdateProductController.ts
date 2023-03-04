import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  UpdateProductDTO, 
  UpdateProductUseCase
} from "../../application";

interface UpdateProductControllerDeps {
  updateProductUseCase: UpdateProductUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class UpdateProductController {
  public readonly route = "/product";

  protected readonly updateProductUseCase: UpdateProductUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    updateProductUseCase,
    controllerErrorHandler
  }: UpdateProductControllerDeps) {
    this.updateProductUseCase = updateProductUseCase;
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
        name: req.body.name,
        brand: req.body.brand,
        avaliableQuantity: req.body.avaliableQuantity,
        price: req.body.price,
        imageURL: req.body.imageURL,
        employeeToken: employeeTokenOrError.getValue(),
        description: req.body.description,
        grammage: req.body.grammage
      } as UpdateProductDTO;

      await this.updateProductUseCase.execute(reqData);

      res.json({updated: true});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
