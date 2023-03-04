import { Image } from "../../domain";
import { IImageService } from "../../application";
import { TempImageRepository } from "../repositories/TempImageRepository";

interface ImageServiceDeps {
  tempImageRepository: TempImageRepository;
}

export class ImageService implements IImageService {
  protected readonly tempImageRepository: TempImageRepository;

  public constructor({tempImageRepository}: ImageServiceDeps) {
    this.tempImageRepository = tempImageRepository;
  }

  public saveTempImage = async (tempImage: Image): Promise<void> => {
    await this.tempImageRepository.save(tempImage);
  }
  
  public getTempImageById = async (imageId: string): Promise<Image> => {
    const image = await this.tempImageRepository.getImageById(imageId);

    return image;
  }
}
