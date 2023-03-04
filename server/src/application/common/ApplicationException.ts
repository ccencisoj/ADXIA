export class ApplicationException extends Error {
  public readonly name: string;
  public readonly code: number;
  public readonly message: string;

  public constructor(name: string, code: number, message: string) {
    super(message);
    this.name = name;
    this.code = code;
    this.message = message;
  }
}
