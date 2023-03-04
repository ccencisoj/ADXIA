import { ApplicationException } from '../common/ApplicationException';

export class UnexpectedException extends ApplicationException {
  public readonly error: any;
  
  public constructor(error?: any) {
    super("UnexpectedException", 500, "Occurred a unexpected error");
    this.error = error;
  }
}
