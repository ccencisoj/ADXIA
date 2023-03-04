import { ApplicationException } from "../../application";

export class FileSizeExceededException extends ApplicationException {
  public constructor(maxSize: number) {
    super("FileSizeExceededException", 400, `File size exceeded the ${maxSize} bytes`);
  }
}
