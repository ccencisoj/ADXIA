import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { ProductMapper } from "../mappers/ProductMapper";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import {
  CreateProductDTO, 
  CreateProductUseCase
} from "../../application";

interface CreateProductControllerDeps {
  createProductUseCase: CreateProductUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class CreateProductController {
  public readonly route = "/product";

  protected readonly createProductUseCase: CreateProductUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    createProductUseCase,
    controllerErrorHandler
  }: CreateProductControllerDeps) {
    this.createProductUseCase = createProductUseCase;
    this.controllerErrorHandler = controllerErrorHandler;
  }

  public execute = async (req: HttpRequest, res: HttpReponse): Promise<void> => {
    try {
      const employeeTokenOrError = await getEmployeeToken(req);

      if(employeeTokenOrError.isFailure) {
        throw new EmployeeTokenException(employeeTokenOrError.getError() as string);
      }

      const reqData = {
        name: req.body.name,
        brand: req.body.brand,
        avaliableQuantity: Number(req.body.avaliableQuantity),
        price: Number(req.body.price),
        imageURL: req.body.imageURL,
        employeeToken: employeeTokenOrError.getValue(),
        description: req.body.description,
        grammage: req.body.grammage
      } as CreateProductDTO;

      const product = await this.createProductUseCase.execute(reqData);
  
      const productJSON = ProductMapper.toJSON(product);
  
      res.json({product: productJSON});

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
