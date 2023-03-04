import { Image } from '../../domain';

type ImageRaw = {
  id: string;
  path: string;
}

export class ImageMapper {
  public static toDomain = (raw: ImageRaw): Image => {
    const imageOrError = Image.create({path: raw.path}, raw.id);
    const image = imageOrError.getValue();
    return image;
  }

  public static toJSON = (image: Image): any => {
    return {
      id: image.id,
      path: image.path
    }
  }

  public static toPersistence = (image: Image): any => {
    return {
      id: image.id,
      path: image.path
    }
  }
}
