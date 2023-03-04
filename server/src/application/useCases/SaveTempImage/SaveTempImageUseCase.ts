import { EmployeeType, Image } from "../../../domain";
import { SaveTempImageDTO } from "./SaveTempImageDTO";
import { IImageService } from '../../services/IImageService';
import { ImageException } from "../../exceptions/ImageException";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";

type Response = Promise<Image>;

interface SaveTempImageUseCaseDeps {
  imageService: IImageService;
  employeeTokenService: IEmployeeTokenService;
}

export class SaveTempImageUseCase {
  protected readonly imageService: IImageService;
  protected readonly employeeTokenService: IEmployeeTokenService;
  
  public constructor({
    imageService,
    employeeTokenService
  }: SaveTempImageUseCaseDeps) {
    this.imageService = imageService;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: SaveTempImageDTO): Response => {
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

    const imageOrError = Image.create({path: req.path});

    if(imageOrError.isFailure) {
      throw new ImageException(imageOrError.getError() as string);
    }

    const image = imageOrError.getValue();

    await this.imageService.saveTempImage(image);

    return image;
  }
}
