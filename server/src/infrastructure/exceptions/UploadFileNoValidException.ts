import { ApplicationException } from "../../application";

export class UploadFileNoValidException extends ApplicationException {
  public constructor() {
    super("UploadFileNoValidException", 400, "Upload file no valid");
  }
}