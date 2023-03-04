import { Image } from "../../domain/Image";

export interface IImageService {
  saveTempImage(tempImage: Image): Promise<void>;
  getTempImageById(imageId: string): Promise<Image>;
}
