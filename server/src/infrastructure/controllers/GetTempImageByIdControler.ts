import { HttpRequest } from "../http/HttpRequest";
import { HttpReponse } from "../http/HttpResponse";
import { getEmployeeToken } from "../helpers/getEmployeeToken";
import { EmployeeTokenException } from "../exceptions/EmployeeTokenException";
import { ControllerErrorHandler } from "../errorHandlers/ControllerErrorHandler";
import { GetTempImageByIdDTO, GetTempImageByIdUseCase } from "../../application";

interface GetTempImageByIdControllerDeps {
  getTempImageByIdUseCase: GetTempImageByIdUseCase;
  controllerErrorHandler: ControllerErrorHandler;
}

export class GetTempImageByIdController {
  public readonly route = "/tempImage/:imageId";

  protected readonly getTempImageByIdUseCase: GetTempImageByIdUseCase;
  protected readonly controllerErrorHandler: ControllerErrorHandler;

  public constructor({
    getTempImageByIdUseCase,
    controllerErrorHandler
  }: GetTempImageByIdControllerDeps) {
    this.getTempImageByIdUseCase = getTempImageByIdUseCase;
    this.controllerErrorHandler = controllerErrorHandler;
  }

  public execute = async (req: HttpRequest, res: HttpReponse): Promise<void> => {    
    try {
      const employeeTokenOrError = await getEmployeeToken(req);

      if(employeeTokenOrError.isFailure) {
        throw new EmployeeTokenException(employeeTokenOrError.getError() as string);
      }

      const reqData = { 
        imageId: req.params.imageId,
        employeeToken: employeeTokenOrError.getValue()
      } as GetTempImageByIdDTO;

      const image = await this.getTempImageByIdUseCase.execute(reqData);

      // No muestra imagen con jpg
      // res.setHeader("Content-Type", "image/jpg");
      
      res.setHeader("Content-Type", "image/jpeg");

      res.sendFile(image.path);

    }catch(error) {
      this.controllerErrorHandler.execute(req, res, error);
    }
  }
}
