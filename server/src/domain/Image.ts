import { Entity } from "./common/Entity";
import { Result } from "./common/Result";

interface ImageProps {
  path: string;
}

export class Image extends Entity<ImageProps> {

  public get id(): string {
    return this._id;
  }

  public get path(): string {
    return this.props.path;
  }

  private constructor(props: ImageProps, id?: string) {
    super(props, id);
  }

  public static create = (props: ImageProps, id?: string): Result<Image> => {
    const image = new Image(props, id);

    return Result.ok<Image>(image);
  }
}
