import { EmployeeType, Image } from "../../../domain";
import { IImageService } from '../../services/IImageService';
import { GetTempImageByIdDTO } from "./GetTempImageByIdDTO";
import { ImageNoFoundException } from "../../exceptions/ImageNoFoundException";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";

type Response = Promise<Image>;

interface GetTempImageByIdUseCaseDeps {
  imageService: IImageService;
  employeeTokenService: IEmployeeTokenService;
}

export class GetTempImageByIdUseCase {
  protected readonly imageService: IImageService;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    imageService,
    employeeTokenService
  }: GetTempImageByIdUseCaseDeps) {
    this.imageService = imageService;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: GetTempImageByIdDTO): Response => {
    const decodedEmployeeOrError = this.employeeTokenService.decode(req.employeeToken);

    if(decodedEmployeeOrError.isFailure) {
      throw new EmployeeCredentialsException(decodedEmployeeOrError.getError() as string);
    }

    const decodedEmployee = decodedEmployeeOrError.getValue();

    if(!(decodedEmployee.type === EmployeeType.ADMIN || 
      decodedEmployee.type === EmployeeType.VENDOR ||
      decodedEmployee.type === EmployeeType.DELIVERER)) {
      throw new EmployeeActionNoAllowedException();
    }

    const image = await this.imageService.getTempImageById(req.imageId);
    const imageFound = !!image;

    if(!imageFound) {
      throw new ImageNoFoundException();
    }

    return image;
  }
}
