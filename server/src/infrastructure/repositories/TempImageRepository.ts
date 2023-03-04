import { Model } from "mongoose";
import { Image } from "../../domain";
import { TempImageMapper } from "../mappers/TempImageMapper";

export class TempImageRepository {
  private readonly model: Model<any>;

  public constructor(model: Model<any>) {
    this.model = model;
  } 
  
  public save = async (image: Image): Promise<void> => {
    const imageSaved = !!await this.getImageById(image.id);
    const repoImage = TempImageMapper.toPersistence(image);

    if(imageSaved) {
      await this.model.updateOne({id: repoImage.id}, repoImage);
    }else {
      await this.model.create(repoImage);      
    }
  }

  public getImageById = async (imageId: string): Promise<Image> => {
    const repoImage = await this.model.findOne({id: imageId});
    const image = repoImage ? TempImageMapper.toDomain(repoImage) : null;
    return image;
  }
}
