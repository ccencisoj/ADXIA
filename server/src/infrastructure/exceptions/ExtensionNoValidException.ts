import { ApplicationException } from "../../application";

export class ExtensionNoValidException extends ApplicationException {
  public constructor(extensionName: string) {
    super("ExtensionNoValidException", 400, `.${extensionName} no valid`);
  }
}