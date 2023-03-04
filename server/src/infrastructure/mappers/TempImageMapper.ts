import { Image } from '../../domain';

type TempImageRaw = {
  id: string;
  path: string;
}

export class TempImageMapper {
  public static toDomain = (raw: TempImageRaw): Image => {
    const imageOrError = Image.create({path: raw.path}, raw.id);
    const image = imageOrError.getValue();
    return image;
  }

  public static toJSON = (image: Image): any => {
    return {
      id: image.id
    }
  }

  public static toPersistence = (image: Image): any => {
    return {
      id: image.id,
      path: image.path
    }
  }
}
